import app from "../lib/config";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";

const db = getFirestore(app);

export default async function deleteData(collection: string, id: string) {
  let result = null;
  let error = null;

  try {
    const docRef = doc(db, collection, id);
    result = await deleteDoc(docRef);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
