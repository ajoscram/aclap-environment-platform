import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { environment } from './environment';
import { UserRecord } from 'firebase-functions/lib/providers/auth';

admin.initializeApp();

//Debug 
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

export const cleanupAuthDebug = functions.https.onRequest(async (req, res) => {
   try{
      const administrator: UserRecord = await admin.auth().getUserByEmail(environment.test_users.administrator.email);
      await admin.auth().deleteUser(administrator.uid);

      const educator: UserRecord = await admin.auth().getUserByEmail(environment.test_users.educator.email);
      await admin.auth().deleteUser(educator.uid);

      const broken: UserRecord = await admin.auth().getUserByEmail(environment.test_users.broken.email);
      await admin.auth().deleteUser(broken.uid);
   } catch(error){
      console.log('Error deleting debug users: ' + error);
   }
   res.end();
});

//Account Creation

//Implementation deletion
export const onImplementationDeletion = functions.firestore
   .document('modules/{moduleId}')
   .onDelete(async (change, context) => {
      //admin.firestore().collectionGroup()
   });