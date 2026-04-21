import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { 
  getFirestore, 
  collection, 
  getDocs, 
  addDoc, 
  query, 
  orderBy, 
  serverTimestamp,
  doc,
  getDocFromServer
} from "firebase/firestore";
import firebaseConfig from "../../firebase-applet-config.json";

const app = initializeApp(firebaseConfig);
// Use the custom database ID if available
export const db = getFirestore(app, (firebaseConfig as any).firestoreDatabaseId || "(default)");
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const handleLogin = async () => {
  try {
    await signInWithPopup(auth, googleProvider);
  } catch (error) {
    console.error("Login failed:", error);
  }
};

export const handleLogout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

// Validate connection on boot
async function testConnection() {
  try {
    // Attempting to read a non-existent doc to test connectivity
    await getDocFromServer(doc(db, 'system', 'connection_test'));
  } catch (error: any) {
    if (error.message?.includes('offline')) {
      console.error("Firebase is offline. Check configuration.");
    }
  }
}
testConnection();

export interface ProjectData {
  id?: string;
  title: string;
  type: string;
  image: string;
  description?: string;
  link?: string;
  createdAt?: any;
}

export const getProjects = async (): Promise<ProjectData[]> => {
  const projectsCol = collection(db, "projects");
  const projectsQuery = query(projectsCol, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(projectsQuery);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as ProjectData[];
};

export const addProject = async (data: Omit<ProjectData, 'id' | 'createdAt'>) => {
  const projectsCol = collection(db, "projects");
  return await addDoc(projectsCol, {
    ...data,
    createdAt: serverTimestamp()
  });
};
