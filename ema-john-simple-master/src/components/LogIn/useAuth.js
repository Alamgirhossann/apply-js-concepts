import React from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import { useState, createContext } from "react";
import { useContext } from 'react';
import { useEffect } from 'react';
import {Route, Redirect} from 'react-router-dom';
import { firebaseConfig } from '../../firebase.config';




const AuthContext = createContext();

export const AuthContextProvider = (props) =>{
    const auth =  Auth();
    return <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);
const getUser = user =>{
    const {displayName, email, photoURL} = user;
    return {name: displayName, email, photo: photoURL};

}

export const PrivateRoute = ({ children, ...rest }) => {
    const auth =  useAuth();
    return (
      <Route
        {...rest}
        render={({ location }) =>
          auth.user ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }
const Auth = () => {
    const [user, setUser] = useState(null)

    const signInWithGoogle = () =>{
        const provider = new firebase.auth.GoogleAuthProvider();
        return firebase.auth().signInWithPopup(provider)
        .then(response =>{
           const signedIn = getUser(response.user)
            setUser(signedIn);
            return response.user;
        })
        .catch(error => {
            console.log(error);
            setUser(null);
            return error.message;
        })
    }
    const signOut = () =>{
        return firebase.auth().signOut().then(function() {
            setUser(null)
            return true;
            }).catch(function(error) {
                console.log(error);
                return false;
            });
    }
    useEffect(() =>{
        firebase.auth().onAuthStateChanged(function(usr) {
            if (usr) {
                const currentUser = getUser(usr);
              setUser(currentUser);
            } else {
              // No user is signed in.
            }
          });
    }, [])

    
    return {
        user,
        signInWithGoogle,
        signOut
    }
}


export default Auth;