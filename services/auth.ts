import { RegisterRequest, LoginRequest } from "@/types/auth";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, User, signOut } from "firebase/auth";
import { auth } from "@/lib/api/firebase";

export async function registerUser({ email, password, userName }: RegisterRequest):Promise<User> {
const createUser = await createUserWithEmailAndPassword( auth, email, password);
const user = createUser.user;
await updateProfile(user, { displayName: userName });
return user;
  }

export async function loginUser({ email, password}: LoginRequest):Promise<User> {
const loginUser = await signInWithEmailAndPassword(auth, email, password);
const user = loginUser.user;
return user;
  }


export async function logoutUser ():Promise<void> {
 await signOut(auth);
}