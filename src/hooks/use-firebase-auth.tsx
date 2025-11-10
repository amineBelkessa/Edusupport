import { auth, db } from "@/config/firebase-config";
import { UserDocument, UserInterface } from "@/types/user";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState<UserInterface | null>(null);
  const [authUserIsLoading, setAuthUserIsLoading] = useState<boolean>(true);

  const reloadAuthUserData = () => {
    if (auth.currentUser) {
      auth.currentUser.reload().then(() => {
        authStateChanged(auth.currentUser);
      });
    }
  }

  const formatAuthUser = (user: UserInterface) => ({
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    emailVerified: user.emailVerified,
    phoneNumber: user.phoneNumber,
    photoURL: user.photoURL,
    Message: user.Message,
    comments:user.comments,
  });

  const getUserDocument = async (user: UserInterface) => {
    if (auth.currentUser) {
      const documentRef = doc(db, "users", auth.currentUser.uid);
      const compactUser = user;
      onSnapshot(documentRef, (doc) => {
        if (doc.exists()) {
          compactUser.userDocument = doc.data() as UserDocument;
          setAuthUser(compactUser);
        }
        setAuthUserIsLoading(false);
      });
    }
  };

  const authStateChanged = async (authState: UserInterface | null) => {
    if (!authState) {
      setAuthUser(null);
      setAuthUserIsLoading(false);
      return;
    }

    setAuthUserIsLoading(true);
    const formattedUser = formatAuthUser(authState);
    await getUserDocument(formattedUser);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    authUser,
    authUserIsLoading,
    reloadAuthUserData,
  };
}
