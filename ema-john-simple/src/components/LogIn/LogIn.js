import React, { useState } from "react";
import './LogIn.css';
import firebase from "firebase/app";
import "firebase/auth";
import { useContext } from "react";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router-dom";


// firebase.initializeApp(firebaseConfig);

function LogIn() {
    const [newUser, setNewUser] = useState(false)
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: '',
        error: '',
        success: false,

    })

    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };


    const provider = new firebase.auth.GoogleAuthProvider();
    const handleSignIn = () => {

        firebase.auth().signInWithPopup(provider)
            .then(res => {
                console.log(res);
                const { displayName, photoURL, email } = res.user;
                const SignedInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL

                }
                userIdToken();
                setUser(SignedInUser)
                setLoggedInUser(SignedInUser)
                history.replace(from);
            })
            .catch(err => {
                console.log(err);

            })
    }


    const userIdToken = () =>{
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
           sessionStorage.setItem('token', idToken)
          }).catch(function(error) {
            // Handle error
          });
    }

    const handleSignOUt = () => {
        firebase.auth().signOut()
            .then(res => {
                const SignedOutUser = {
                    isSignedIn: false,
                    name: '',
                    email: '',
                    photo: ''
                }
                setUser(SignedOutUser)
            })
            .catch(err => console.log(err))
    }

    const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUser = { ...user }
                    newUser.error = '';
                    newUser.success = true;
                    setUser(newUser)
                    upDateUserName(user.name)
                })
                .catch((error) => {
                    const newUser = { ...user }
                    newUser.error = error.message;
                    newUser.success = false;
                    setUser(newUser)
                });
        }
        e.preventDefault()

        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUser = { ...user }
                    newUser.error = '';
                    newUser.success = true;
                    setUser(newUser)
                    setLoggedInUser(newUser)
                    history.replace(from);
                    console.log('signed in info', res.user);
                })
                .catch((error) => {
                    const newUser = { ...user }
                    newUser.error = error.message;
                    newUser.success = false;
                    setUser(newUser)
                });
        }
    }



    const upDateUserName = name => {
        const user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name,

        }).then(function () {
            console.log('user name updated ');
        }).catch(function (error) {
            // An error happened.
        });
    }

    const handleBlur = (e) => {
        let isFormValid = true;
        if (e.target.name === 'email') {
            isFormValid = /\S+@\S+\.\S+/.test(e.target.value)

        }
        if (e.target.name === 'password') {
            const isPssawordValid = e.target.value.length >= 6
            const passwordHasNumber = /\d{1}/.test(e.target.value)
            isFormValid = (passwordHasNumber && isPssawordValid);
        }
        if (isFormValid) {
            const newUserInfo = { ...user }
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo)
        }
    }

   

    return (
        <div className='App'>
            { user.isSignedIn ?
                <button onClick={handleSignOUt}>Sign Out</button> :
                <button onClick={handleSignIn}>Sign In</button>
            }
            {
                user.isSignedIn && <div>
                    <p>Welcome {user.name}</p>
                    <p>Email: {user.email} </p>
                    <img src={user.photo} alt="" />
                </div>
            }
            <h1>Our own authentication</h1>
            <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
            <label htmlFor='newUser'>New User Sign Up</label>
            <form onSubmit={handleSubmit}>

                {newUser && <input onBlur={handleBlur} type="text" name='name' placeholder='name' />}
                <br />
                <input onBlur={handleBlur} name='email' type="text" placeholder='Your Email' required />
                <br />
                <input onBlur={handleBlur} name='password' type="password" placeholder="Your password" required />
                <br />
                <input type="submit" />
            </form>
            <p style={{ color: 'red' }}>{user.error}</p>
            {
                user.success && <p style={{ color: 'green' }}>Successfully {newUser ? 'create' : 'logged in'} acount </p>
            }
        </div>
    );
}

export default LogIn;
