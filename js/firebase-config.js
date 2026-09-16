// ===== B+Designs - Firebase Configuration =====
// Initialize Firebase using compat JS SDK for browser environment

const firebaseConfig = {
  apiKey: "AIzaSyDC-TxLluwCVS8e7N9Am_RnAzN-08ASwiE",
  authDomain: "bplusdesign-bc41c.firebaseapp.com",
  projectId: "bplusdesign-bc41c",
  storageBucket: "bplusdesign-bc41c.firebasestorage.app",
  messagingSenderId: "624253672457",
  appId: "1:624253672457:web:0202eff056d95806752cd8",
  measurementId: "G-JWBH7LKSST"
};

// Initialize Firebase App
if (typeof firebase !== 'undefined') {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  window.auth = firebase.auth();
  window.db = firebase.firestore ? firebase.firestore() : null;
  console.log("Firebase initialized successfully for project:", firebaseConfig.projectId);
} else {
  console.warn("Firebase SDK script tags not loaded prior to firebase-config.js");
}
