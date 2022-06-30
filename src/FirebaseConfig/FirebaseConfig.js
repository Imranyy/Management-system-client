
import { initializeApp } from "firebase/app";
import{getStorage,ref,getDownloadURL,uploadBytesResumable} from "firebase/storage";
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAk_mBGAyX_iEcBJiWiGg3bfSCIJ2_ydUc",
  authDomain: "fir-site-bb2a5.firebaseapp.com",
  projectId: "fir-site-bb2a5",
  storageBucket: "fir-site-bb2a5.appspot.com",
  messagingSenderId: "869027154677",
  appId: "1:869027154677:web:1b0cbb66015c543b5053bc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const projectStorage=getStorage(app);


export{ projectStorage,ref,getDownloadURL,uploadBytesResumable};