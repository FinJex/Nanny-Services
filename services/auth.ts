import { RegisterRequest } from "@/types/auth";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/api/firebase";

export async function registerUser({ email, password, userName }: RegisterRequest) {
const auth = await getAuth();
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    const update = await updateProfile(user, { displayName: userName })
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
  }