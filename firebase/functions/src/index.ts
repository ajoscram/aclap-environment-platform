import * as functions from 'firebase-functions';
//import * as admin from 'firebase-admin';

export const onModuleDelete = functions.firestore
   .document('modules/{moduleId}')
   .onDelete(async (change, context) => {
      //admin.firestore().collectionGroup()
   });