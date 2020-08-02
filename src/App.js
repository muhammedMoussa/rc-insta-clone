import React, {useState, useEffect} from 'react'
import {Button} from '@material-ui/core'

import {db} from './firebase'
import './App.css'

import Header from './components/Header/Header'
import Post from './components/Post/Post'
import Login from './components/Login/Login'

function App() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [loginData, setLoginData] = useState([]);


  useEffect(() => {
    db.collection('posts').onSnapshot(snap => {
      setPosts(snap.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })))
    })
  }, [])

  useEffect(() => {
    if(loginData[0] &&  loginData[1]) {
      alert(`email: ${loginData[0]}, \n pass: ${loginData[1]}`)
    }
  }, [loginData])


  return (
    <div className='app'>
      <Button type="button" onClick={() => setOpen(true)}>
        Login
      </Button>

      <Login 
        open={open}
        handleClose={() => {
          setLoginData([])
          setOpen(false)
        }}
        handleLogin={setLoginData}
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
    </div>
  );
}

export default App;
