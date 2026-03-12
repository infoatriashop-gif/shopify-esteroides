import { initializeApp, getApps, cert, applicationDefault } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

function initFirebase() {
  if (getApps().length > 0) return getApps()[0];

  // In Firebase App Hosting, Application Default Credentials are available automatically
  // For local dev, set GOOGLE_APPLICATION_CREDENTIALS or FIREBASE_SERVICE_ACCOUNT_KEY
  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (serviceAccountJson) {
    try {
      const serviceAccount = JSON.parse(serviceAccountJson);
      return initializeApp({ credential: cert(serviceAccount) });
    } catch {
      // Fall through to applicationDefault
    }
  }

  return initializeApp({ credential: applicationDefault() });
}

let _db: FirebaseFirestore.Firestore | null = null;

export function getFirestoreDb(): FirebaseFirestore.Firestore {
  if (!_db) {
    initFirebase();
    _db = getFirestore();
  }
  return _db;
}

export function hasFirestore(): boolean {
  try {
    getFirestoreDb();
    return true;
  } catch {
    return false;
  }
}
