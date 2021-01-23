import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as passwords from './modules/passwords';
import * as mail from './modules/mail';
import { environment } from './environment';
import { UserRecord } from 'firebase-functions/lib/providers/auth';
import { Educator, EducatorRequestState, EducatorRequest } from './models';

admin.initializeApp();

//Test user creation, needed for app unit tests
export const setupAuthDebug = functions.https.onRequest(async (req, res) => {
   try{
      const administrator: UserRecord = await admin.auth().createUser({
         email: environment.test_users.administrator.email,
         password: environment.test_users.administrator.password
      });
      await admin.auth().setCustomUserClaims(administrator.uid, environment.claims.administrator);
      
      const educator: UserRecord = await admin.auth().createUser({
         email: environment.test_users.educator.email,
         password: environment.test_users.educator.password
      });
      await admin.auth().setCustomUserClaims(educator.uid, environment.claims.educator);

      await admin.auth().createUser({
         email: environment.test_users.broken.email,
         password: environment.test_users.broken.password
      });
   } catch(error){
      console.log('Error creating debug users: ' + error);
   }
   res.end();
});

//Educator account creation
export const onRequestAccepted = functions.firestore
   .document(`${environment.collections.requests}/{requestId}`)
   .onUpdate(async (change, context) => {
      const request: EducatorRequest = change.after.data() as EducatorRequest;
      if(request.state == EducatorRequestState.APPROVED){
         
         //adding user to authentication
         const password: string = passwords.generate();
         const user: UserRecord = await admin.auth().createUser({
            email: request.email,
            password: password
         });
         await admin.auth().setCustomUserClaims(user.uid, environment.claims.educator);
         
         //adding user to firestore
         const document: FirebaseFirestore.DocumentReference = admin.firestore()
            .collection(environment.collections.users)
            .doc();
         const educator: Educator = {
            id: document.id,
            imageUrl: environment.defaults.user_image_url,
            name: request.name,
            lastname: request.lastname,
            email: request.email,
            phone: request.phone,
            address: request.address,
            birthday: request.birthday,
            organization: request.organization,
            joined: new Date()
         }
         await document.set(educator);

         //send email to the user
         await mail.welcome(educator, password);
      }
   });