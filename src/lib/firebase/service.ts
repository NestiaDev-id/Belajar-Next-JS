import {
  getFirestore,
  getDocs,
  collection,
  query,
  where,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import app from "./init";
import bcrypt from "bcrypt";

const firestore = getFirestore(app);

export async function getData(collectionName: string) {
  try {
    const snapshot = await getDocs(collection(firestore, collectionName));
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return data;
  } catch (error) {
    console.error(
      `Error fetching data from collection "${collectionName}":`,
      error
    );
    throw error; // Lempar error agar bisa ditangani di tempat lain
  }
}

export async function getDataById(collectionName: string, id: string) {
  try {
    const snapshot = await getDocs(collection(firestore, collectionName));
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return data.find((item) => item.id === id);
  } catch (error) {
    console.error(
      `Error fetching data from collection "${collectionName}":`,
      error
    );
    throw error; // Lempar error agar bisa ditangani di tempat lain
  }
}

export async function signUp(
  userData: {
    email: string;
    fullname: string;
    password: string;
    role?: string;
  },
  callback: (response: { status: boolean; message: string }) => void
) {
  try {
    // Query untuk memeriksa apakah email sudah ada
    const q = query(
      collection(firestore, "users"),
      where("email", "==", userData.email)
    );
    const snapshot = await getDocs(q);

    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    if (data.length > 0) {
      // Jika email sudah ada
      callback({ status: false, message: "Email already exists" });
    } else {
      // Hash password
      userData.password = await bcrypt.hash(userData.password, 10);
      userData.role = "member";

      // Tambahkan data pengguna ke Firestore
      await addDoc(collection(firestore, "users"), userData);
      callback({ status: true, message: "Register Successfully" });
    }
  } catch (error) {
    console.error("Error signing up:", error);
    callback({ status: false, message: "Register Failed" });
  }
}

export async function signIn(userData: { email: string }) {
  try {
    const q = query(
      collection(firestore, "users"),
      where("email", "==", userData.email)
    );
    const snapshot = await getDocs(q);

    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    if (data.length > 0) {
      return data[0];
    } else {
      return null;
    }
  } catch (error) {}
}

export async function signWithGoogle(userData: any) {
  try {
    // Query untuk memeriksa apakah email sudah ada
    const q = query(
      collection(firestore, "users"),
      where("email", "==", userData.email)
    );
    const snapshot = await getDocs(q);

    const data: any = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (data.length > 0) {
      userData.role = data[0].role;
      // Jika email sudah ada, perbarui data pengguna
      await updateDoc(doc(firestore, "users", data[0].id), userData);
      return {
        status: true,
        message: "User updated successfully",
        data: userData,
      };
    } else {
      // Jika email belum ada, tambahkan data pengguna baru
      userData.role = "member";
      await addDoc(collection(firestore, "users"), userData);
      return {
        status: true,
        message: "User registered successfully",
        data: userData,
      };
    }
  } catch (error) {
    console.error("Error in signWithGoogle:", error);
    return { status: false, message: "An error occurred during registration" };
  }
}
