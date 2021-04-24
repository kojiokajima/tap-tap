import firebase from 'firebase/app'
import "firebase/auth"

const firebaseConfig = {
  apiKey=process.env.REACT_APP_apiKey,
  uthDomain=process.env.REACT_APP_authDomain,
  projectId=process.env.REACT_APP_projectId,
  storageBucket=process.env.REACT_APP_storageBucket,
  messagingSenderId=process.env.REACT_APP_messagingSenderId,
  appId=process.env.REACT_APP_appId,
  measurementId=process.env.REACT_APP_measurementId,
}

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const provider = new firebase.auth.GoogleAuthProvider()

export default firebase