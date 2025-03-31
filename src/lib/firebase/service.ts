import { getFirestore, getDocs, collection } from 'firebase/firestore';
import app from './init';

const firestore = getFirestore(app);

export async function getData(collectionName: string) {
  try {
    const snapshot = await getDocs(collection(firestore, collectionName));
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return data;
  } catch (error) {
    console.error(`Error fetching data from collection "${collectionName}":`, error);
    throw error; // Lempar error agar bisa ditangani di tempat lain
  }
}