import React, {useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import fire from '../../fire';
import Cookies from 'js-cookie';
import './Login.scss';

function Login() {

  const [, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState ('');
  const [emailError, setEmailError] = useState ('');
  const [passwordError, setPasswordError] = useState('');
  const [hasAccount, setHasAccount] = useState(false);

  const clearInput = () => {
    setEmail('');
    setPassword('');
  }

  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
  }

  const authorizeListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        clearInput();
      } else {
        setUser('')
      }
    });
  };

  useEffect(() => {
   authorizeListener();
  },[]);

//   fire.auth().setPersistence(fire.auth.Auth.Persistence.NONE);

    const history = useHistory();

    const handleSignUp = (e) => {
        e.preventDefault()
        clearErrors();
            fire
            .auth()
            .createUserWithEmailAndPassword(email,password)
            .then(({ user }) => {
                return user.getIdToken().then((idToken) => {
                    return fetch('/sessionLogin', {
                        method: 'POST',
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                            "CSRF-Token": Cookies.get("XSRF-TOKEN"),
                        },
                        body: JSON.stringify({ idToken })
                    })
                })
            })
        .then(() => {
            history.push('/home');
          })
          .catch((err) => {
            switch (err.code) {
              case "auth/email-already-in-use":
              case "auth/invalid-email":
                setEmailError(err.message);
                break;
              case "auth/weak-password":
                setPasswordError(err.message);
                break;
            }
          });
    }

    const handleLogin = (e) => {
        e.preventDefault()
        clearErrors();
            fire
            .auth()
            .signInWithEmailAndPassword(email,password)
            .then(({ user }) => {
                return user.getIdToken().then((idToken) => {
                    return fetch('/sessionLogin', {
                        method: 'POST',
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                            "CSRF-Token": Cookies.get("XSRF-TOKEN"),
                        },
                        body: JSON.stringify({ idToken })
                    })
                })
            })
        .then(() => {
            history.push('/home');
          })
          .catch((err) => {
            switch(err.code) {
              case "auth/invalid-email":
              case "auth/user-disabled":
              case "auth/user-not-found":
                setEmailError(err.message);
                break;
              case "auth/wrong-password":
                setPasswordError(err.message);
                break;
            }
          });
    }
    return (
        <section className="login">
            <div className="login__container">
            <h1 className="login__header">earth or mars</h1>
            {!hasAccount ? (
                <form className="login__sign-in">
                    <label className="login__label">username</label>
                    <input className="login__input" type="text" autoFocus required value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    <p className="login__email-error">{emailError}</p>
                    <label className="login__label">password</label>
                    <input className="login__input" type="password" required value={password}onChange={(e) => setPassword(e.target.value)}></input>
                    <p className="login__password-error">{passwordError}</p>
                    <div className="login__button-div">
                <button className="login__button" onClick={handleLogin}>sign in</button>
                </div>
                <div className="login__signup-container">
                             <p className="login__sign-up">don't have an account?<span onClick={() => setHasAccount(!hasAccount)}>sign up</span></p>
                         </div>
                </form>
            ) : (
            <form className="login__sign-up">
                <label className="login__label">username(email)</label>
                <input className="login__input" type="text" autoFocus required value={email} onChange={(e) => setEmail(e.target.value)} ></input>
                <p className="login__email-error">{emailError}</p>
                <label className="login__label-2">password</label>
                <input className="login__input" type="password" required value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <p className="login__password-error">{passwordError}</p>
                <div className="login__button-div">
                <button className="login__button" onClick={handleSignUp}>sign up</button>
                </div>
                <div className="login__signup-container">
                                <p className="login__sign-in">have an account?<span onClick={() => setHasAccount(!hasAccount)}>sign in</span></p>
                            </div>
            </form>
             )}
            </div>
        </section>
    )
}

export default Login;
