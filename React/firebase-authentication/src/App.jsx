import { useState } from 'react'
import './App.css'
import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebase.config';
import { getAuth, signInWithPopup,signInWithEmailAndPassword, GoogleAuthProvider, signOut, createUserWithEmailAndPassword } from "firebase/auth";

const app = initializeApp(firebaseConfig);

function App() {
  const[signup, setSignup] = useState(false)
  const [user, setUser] = useState({
    isSigned : false,
    name : '',
    email : '',
    password : '',
    success : false,
    photo : ''
  })
  const provider = new GoogleAuthProvider();
  
  // Google sign-in function
  const signin = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user);
        const {displayName, photoURL, email} = result.user;
        const signedInUser = {
          isSigned : true,
          name : displayName,
          email : email,
          photo : photoURL
        }
        setUser(signedInUser);
      })
      .catch(error => {
        console.error("Error during Google sign-in:", error);
      });
  }
  
  // Google sign-out function
  const signout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      console.log('Signed out successfully');
      setUser({
        isSigned: false,
        name: '',
        email: '',
        photo: ''
      });
    });
  }
  
  // Handle input changes
  const handleBlur = (e) => {
    console.log(e.target.name, e.target.value);
    let isValid = true; 
    
    if (e.target.name === 'email') {
      isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value); // Basic email validation
    } 
    
    if (e.target.name === 'password') {
      isValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(e.target.value); // Strong password validation
    }

    if (isValid) {
      const newUser = { ...user };
      newUser[e.target.name] = e.target.value;
      setUser(newUser);
    }
  }
  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents form from reloading the page

    if (user.email && user.password) {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, user.email, user.password)
        .then((userCredential) => {
          console.log(userCredential);
          const newUser = { ...user };
          newUser.success = true;
          setUser(newUser); 
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error(`Error [${errorCode}]: ${errorMessage}`);
        });
    }
    if (!signup && user.email && user.password) {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, user.email, user.password)
        .then((userCredential) => {
          const user = userCredential.user;
          const newUser = { ...user };
          newUser.success = true;
          setUser(newUser); 
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    }
  }

  return (
    <>
      <div>
        {
          !user.isSigned && <button onClick={signin}>Sign in with Google</button>
        }
        {
          user.isSigned &&  
            <div>
              <h1>Welcome, {user.name}</h1>
              <button onClick={signout}>Sign out</button>
            </div> 
        }
        {
        /* 
        <h1>Email: {user.email}</h1>
        <h1>Password: {user.password}</h1> 
        */
        }
        <br /><br />
        <input type="checkbox" name="check-signup" onChange={() => setSignup(!signup)}/>
        <label htmlFor="sign-up">Sign up</label>
        <form onSubmit={handleSubmit}>
          {
            signup && <div>
            <input type="text" name="name" onBlur={handleBlur} placeholder='First name' required />
            <br />
            <input type="text" name="name" onBlur={handleBlur} placeholder='Last name' required />
            <br />
            </div>
          }
          <input type="text" name="email" onBlur={handleBlur} placeholder='Email' required />
          <br />
          <input type="password" name="password" onBlur={handleBlur} placeholder='Password' required />
          <br />
          {signup && <input type="password" name="re-password" onBlur={handleBlur} placeholder='Re-type password' required />}
          <br />
          <input type="submit" value="Register" />
        </form>
        {user.success && <h3> User {signup ? 'signed-up' : 'logged-in' } successfully</h3>}
        {/*  */}
      </div> 
    </>
  )
}

export default App;
