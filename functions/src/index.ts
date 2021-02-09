import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as passwords from './wrappers/passwords';
import * as mail from './wrappers/mail';
import { environment } from './environment';
import { UserRecord } from 'firebase-functions/lib/providers/auth';
import { Educator, EducatorRequestState, EducatorRequest, Administrator, PasswordReset } from './models';

admin.initializeApp();

//Password auto-generation, needed when users forget their passwords
export const resetPassword = functions.firestore
   .document(`${environment.collections.password_resets}/{resetId}`)
   .onCreate( async (doc, context) => {
      const reset: PasswordReset = doc.data() as PasswordReset;
      try{
         //resetting the password
         const user: UserRecord = await admin.auth().getUserByEmail(reset.email);
         const password: string = passwords.generate();
         await admin.auth().updateUser(user.uid, {
            password: password,
         });
         await mail.resetPassword(reset.email, password);
         
         //deleting the request
         await admin.firestore()
            .collection(environment.collections.password_resets)
            .doc(context.params.resetId)
            .delete();
         
      } catch(error) {
         console.error('Error while changing user password and sending email: ', reset.email, '\n', error);
      }
   });

//Educator account creation
export const onRequestAccepted = functions.firestore
   .document(`${environment.collections.requests}/{requestId}`)
   .onUpdate(async (change, context) => {
      const before: EducatorRequest = change.before.data() as EducatorRequest;
      const request: EducatorRequest = change.after.data() as EducatorRequest;
      if(before.state === EducatorRequestState.PENDING &&
         request.state === EducatorRequestState.APPROVED){
         
         //adding user to authentication
         const password: string = passwords.generate();
         const user: UserRecord = await admin.auth().createUser({
            email: request.email,
            password: password,
         });
         await admin.auth().setCustomUserClaims(user.uid, environment.claims.educator);
         
         //adding user to firestore
         const educator: Educator = {
            id: user.uid,
            imageUrl: environment.defaults.user_image_url,
            name: request.name,
            lastname: request.lastname,
            email: request.email,
            phone: request.phone,
            address: request.address,
            birthday: request.birthday,
            organization: request.organization,
            joined: new Date(),
         }
         await admin.firestore()
            .collection(environment.collections.users)
            .doc(user.uid)
            .set(educator);

         //send email to the user
         try{
            await mail.welcome(educator, password);
         }catch(error){
            //this could be handled by notifying the administrator via an email that it failed.
            //For now a console.log() will do
            console.error('Error while sending welcome email to new educator: ', educator.email, '\n', error);
         }
      }
   });

async function createAdministratorAccount(email: string, password: string, name: string, lastname: string): Promise<void>{
   const user: UserRecord = await admin.auth().createUser({
      email: email,
      password: password,
   });
   await admin.auth().setCustomUserClaims(user.uid, environment.claims.administrator);
   const administrator: Administrator = {
      id: user.uid,
      imageUrl: environment.defaults.user_image_url,
      name: name,
      lastname: lastname,
      email: email,
   }
   await admin.firestore()
      .collection(environment.collections.users)
      .doc(user.uid)
      .set(administrator);
}

//This endpoint is needed for a base administrator account
//If they ever implement adding custom claims from the firebase console remove this function.
export const setupAdministratorAccounts = functions.https.onRequest(async(req, res)=>{
   for(const user of environment.administrator_users){
      try{
         await createAdministratorAccount(user.email, user.password, user.name, user.lastname);
      } catch(error){/*don't really care about this function failing, since it's just setup*/}
   }
   res.end();
});

//Test user creation, needed for app unit tests
export const setupAuthDebug = functions.https.onRequest(async (req, res) => {
   try{
      const administrator: UserRecord = await admin.auth().createUser({
         email: environment.test_users.administrator.email,
         password: environment.test_users.administrator.password,
      });
      await admin.auth().setCustomUserClaims(administrator.uid, environment.claims.administrator);
      
      const educator: UserRecord = await admin.auth().createUser({
         email: environment.test_users.educator.email,
         password: environment.test_users.educator.password,
      });
      await admin.auth().setCustomUserClaims(educator.uid, environment.claims.educator);

      await admin.auth().createUser({
         email: environment.test_users.broken.email,
         password: environment.test_users.broken.password,
      });
   } catch(error){ }
   res.end();
});