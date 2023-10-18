import app from "../lib/config";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const db = getFirestore(app);
export default async function getData(collection: string, id: string) {
  const docRef = doc(db, collection, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    console.log(data);
    return data;
  } else {
    return null;
  }
}
