import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as passwords from './wrappers/passwords';
import * as mail from './wrappers/mail';
import { environment } from './environment';
import { UserRecord } from 'firebase-functions/lib/providers/auth';
import { Educator, EducatorRequestState, EducatorRequest, Administrator } from './models';

admin.initializeApp();

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

//This endpoint is needed for a base administrator account
//If they ever implement adding custom claims from the firebase console remove this function.
export const setupDevAccount = functions.https.onRequest(async(req, res)=>{
   try{
      const user: UserRecord = await admin.auth().createUser({
         email: environment.dev_user.email,
         password: environment.dev_user.password,
      });
      await admin.auth().setCustomUserClaims(user.uid, environment.claims.administrator);
      const dev: Administrator = {
         id: user.uid,
         imageUrl: environment.defaults.user_image_url,
         name: 'Educa-ACLAP',
         lastname: 'Developers',
         email: environment.dev_user.email,
      }
      await admin.firestore()
      .collection(environment.collections.users)
      .doc(user.uid)
      .set(dev);
   } catch(error){/*don't really care about this function failing, since it's just setup*/}
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