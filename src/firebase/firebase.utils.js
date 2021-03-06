import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDyfCRb3IECyXdGCxUiAcYdSDAGK5mLISM",
    authDomain: "crwn-db-949f2.firebaseapp.com",
    databaseURL: "https://crwn-db-949f2.firebaseio.com",
    projectId: "crwn-db-949f2",
    storageBucket: "crwn-db-949f2.appspot.com",
    messagingSenderId: "164520233317",
    appId: "1:164520233317:web:ae744d448a33546c27b98c",
    measurementId: "G-92HJDWZ8DK"

}


export const createUserProfileDocument = async (userAuth, additionalData) => {
if(!userAuth) return;

const userRef = firestore.doc(`users/${userAuth.uid}`);
const snapShot = await userRef.get();

if(!snapShot.exists){
    const {displayName,email} = userAuth;
    const createdAt = new Date();

    try{
        await userRef.set({
            displayName,
            email,
            createdAt,
            ...additionalData
        })
    }catch(error){
        console.log("Error Creating User", error.message);
    }
}
return userRef;
}

export const addCollectionAndDocuments = async(collectionKey , objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef,obj);

    });
    return await batch.commit();

};

export const convertCollectionSnapshotToMap = collectionsSnapshot => {
    const transormedCollection = collectionsSnapshot.docs.map(doc => {
        const {title, items} = doc.data();

        return{
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        }
    });

   
   return transormedCollection.reduce((accumulator,collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {} );
} ;


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({
    'prompt': 'select_account'
  });


  export const signInWithGoogle = () => auth.signInWithPopup(provider);
  export default firebase;