import React, {useState, useEffect} from 'react'
import {Button} from '@material-ui/core'

import {db, auth} from './firebase'
import './App.css'

import Header from './components/Header/Header'
import Post from './components/Post/Post'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'

// @TODO: HANDLE ERROR DISPLAY IN SNACKBAR

function App() {
  const [posts, setPosts] = useState([]);
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [loginData, setLoginData] = useState([]);
  const [signupData, setSignupData] = useState([]);
  const [user, setUser] = useState(null);
  // const [snackbarOpen, setSnackbarOpen] = useState(null);
  // const [snackbarmessage, setSnackbarmessage] = useState(null);

  useEffect(() => {
    const sub = auth.onAuthStateChanged(authUser => {
      if(authUser) {
        setUser(authUser)
        console.log(authUser)
      } else {
        setUser(null)
      }
    })

    return () => sub()
  }, [signupData])

  useEffect(() => {
    db.collection('posts').onSnapshot(snap => {
      setPosts(snap.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })))
    })
  }, [])

  useEffect(() => {
    const email = loginData[0];
    const password = loginData[1];

    if (email && password) {
      auth.signInWithEmailAndPassword(email, password)
        .catch(error => {
          alert(error.message)
          // setSnackbarOpen(true)
          // setSnackbarmessage(error.message)
          }
        )
        .finally(() => setLoginOpen(false))
    }
  }, [loginData])


  useEffect(() => {
    const username = signupData[0];
    const email = signupData[1];
    const password = signupData[2];

    if (email && password) {
      auth.createUserWithEmailAndPassword(email, password)
        .then(user => user.user.updateProfile({
          displayName: username
        }))
        .catch(error => {
          alert(error.message)
          // setSnackbarOpen(true)
          // setSnackbarmessage(error.message)
          }
        )
        .finally(() => setSignupOpen(false))
    }
  }, [signupData])


  return (
    <div className='app'>
      {user ? (
        <Button onClick={() => auth.signOut()}>Logout</Button>
      ) : (
        <div className="app__login__btns">
          <Button onClick={() => setLoginOpen(true)}>Login</Button>
          <Button onClick={() => setSignupOpen(true)}>Signup</Button>
        </div>
      )}

      <Login 
        open={loginOpen}
        handleClose={() => {
          setLoginData([])
          setLoginOpen(false)
        }}
        handleLogin={setLoginData}
      />

      <Signup 
        open={signupOpen}
        handleClose={() => {
          setSignupData([])
          setSignupOpen(false)
        }}
        handleSignup={setSignupData}
      />

      <Header/>
      {
        posts.map(({post, id}) => (
          <Post 
          key={id}
          imageUrl={post.imageUrl}
          caption={post.caption}
          username={post.username}
        />
        ))
      }

      {/* <Snackbar open={snackbarOpen} message={snackbarmessage}/> */}
    </div>
  );
}

export default App;
