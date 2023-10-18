import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { EmailAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId,
  storageBucket: process.env.storageBucket,
};

let app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
// const analytics = getAnalytics(app);
const provider = new EmailAuthProvider();
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export default app;
export { provider, auth, db, storage };
