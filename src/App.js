import React, {useState, useEffect} from 'react'
import {Button} from '@material-ui/core'
import InstagramEmbed from 'react-instagram-embed';

import {db, auth} from './firebase'
import './App.css'

import Header from './components/Header/Header'
import Post from './components/Post/Post'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import Uploader from './components/Uploader/Uploader'
import RcInstaCloneBackdrop from './components/Backdrop/RcInstaCloneBackdrop'

// @TODO: HANDLE ERROR DISPLAY IN SNACKBAR

function App() {
  const [posts, setPosts] = useState([]);
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [loginData, setLoginData] = useState([]);
  const [signupData, setSignupData] = useState([]);
  const [user, setUser] = useState(null);
  const [backdropOpen, setBackdropOpen] = useState(false)
  const [loginDisabled, setLoginDisabled] = useState(false)
  const [signupDisabled, setSignupDisabled] = useState(false)

  
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
      setBackdropOpen(true)
      setLoginDisabled(true)
      auth.signInWithEmailAndPassword(email, password)
        .catch(error => {
          alert(error.message)
          // setSnackbarOpen(true)
          // setSnackbarmessage(error.message)
          }
        )
        .finally(() => {
          setBackdropOpen(false)
          setLoginDisabled(false)
          setLoginOpen(false)
        })
    }
  }, [loginData])


  useEffect(() => {
    const username = signupData[0];
    const email = signupData[1];
    const password = signupData[2];

    if (email && password) {
      setBackdropOpen(true)
      setSignupDisabled(true)
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
        .finally(() => {
          setBackdropOpen(false)
          setSignupOpen(false)
          setSignupDisabled(false)
        })
    }
  }, [signupData])


  return (
    <div className='app'>
      <Login 
        open={loginOpen}
        disabled={loginDisabled}
        handleClose={() => {
          setLoginData([])
          setLoginOpen(false)
        }}
        handleLogin={setLoginData}
      />

      <Signup 
        open={signupOpen}
        disabled={signupDisabled}
        handleClose={() => {
          setSignupData([])
          setSignupOpen(false)
        }}
        handleSignup={setSignupData}
      />

      <Header>
        {user ? (
          <Button onClick={() => auth.signOut()}>Logout</Button>
        ) : (
          <div className="app__login__btns">
            <Button onClick={() => setLoginOpen(true)}>Login</Button>
            <Button onClick={() => setSignupOpen(true)}>Signup</Button>
          </div>
        )}
      </Header>

      <div className="app__posts">
        <div className="app_postsLeft">
          {
            posts.map(({post, id}) => (
              <Post 
                postId={id}
                key={id}
                imageUrl={post.imageUrl}
                caption={post.caption}
                username={post.username}
                loggedUser={user?.displayName}
              />
            ))
          }
        </div>
        
        <div className="app_postsRight">
          <InstagramEmbed
            url='https://www.instagram.com/p/B_rihKpnkow/'
            maxWidth={320}
            hideCaption={false}
            containerTagName='div'
            protocol=''
            injectScript
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={() => {}}
          />  
        </div>
      </div>

      {user ? (
        <Uploader username={user.displayName}/>
      ) : (
        <h3>You need to login first for uploading posts.</h3>
      )}

      {/* <Snackbar open={snackbarOpen} message={snackbarmessage}/> */}
      <RcInstaCloneBackdrop open={backdropOpen}  />
    </div>
  );
}

export default App;
