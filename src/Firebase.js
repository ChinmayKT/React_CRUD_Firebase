import firebase from 'firebase';

const firebaseConfig ={
    apiKey: "AIzaSyClFFgeFViDsSlOwxx4DxYPqvAUK1tHcB8",
    authDomain: "cer-crud.firebaseapp.com",
    databaseURL: "https://cer-crud-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "cer-crud",
    storageBucket: "cer-crud.appspot.com",
    messagingSenderId: "296775635468",
    appId: "1:296775635468:web:a416d09c55b6b63a8b5429"

}

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;