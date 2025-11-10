import { Timestamp } from "firebase/firestore";

export interface UserInterface {
  uid: string;
  email: string | null;
  displayName: string | null;
  emailVerified: boolean;
  phoneNumber: string | null;
  photoURL: string | null;
  userDocument?: UserDocument;
  Message?: string;
  comments?:string;
}

export interface UserDocument {
  uid: string;
  email: string;
  how_did_her: string;
  creation_date: Timestamp;
  onboardingIsCompleted: boolean;
  displayName: string;
  expertise: string;
  biography: string;
  photoURL: string | null;
  Message: string;
  comments?:string;
}

export interface Post {
  id: string;
  userId: string;
  authorName: string;
  authorPhoto: string;
  text: string;
  timestamp: Timestamp;
}

export interface Comment {
  id: string;
  userId: string;
  authorName: string;
  authorPhoto: string;
  text: string;
  timestamp: Timestamp;
}
