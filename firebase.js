const firebaseConfig = {
 apiKey: "AIzaSyC2A5_XA4rLA8UA61aOPekdcTAo7wWYGzo",
  authDomain: "gradex-dd959.firebaseapp.com",
  projectId: "gradex-dd959",
  storageBucket: "gradex-dd959.firebasestorage.app",
  messagingSenderId: "113939811428",
  appId: "1:113939811428:web:1c60a528f9cd8c51646371"
};

firebase.initializeApp(firebaseConfig);

window.auth = firebase.auth();
window.db = firebase.firestore();
