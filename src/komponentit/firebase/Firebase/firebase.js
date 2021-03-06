import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

  const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  };

  class Firebase {
    constructor() {
        app.initializeApp(config);  

        this.auth = app.auth();
        this.db = app.database();
    }
    
    // *** Auth API ***

    // Luo uusi
    doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

    // Kirjaudu sisään
    doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

    // Kirjaudu ulos
    doSignOut = () => this.auth.signOut();

    // Resetoi salasana
    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    // Vaihda salasana
    doPasswordUpdate = password =>
      this.auth.currentUser.updatePassword(password);

    // *** User API ***

    // Yksi käyttäjä
    user = uid => this.db.ref(`users/${uid}`);

    // Kaikki käyttäjät
    users = () => this.db.ref('users');

    // Testihommia:
    naytaEmail = () => {
      // console.log(this.auth.currentUser.email);
      return this.auth.currentUser.email;
    };

}

  export default Firebase;