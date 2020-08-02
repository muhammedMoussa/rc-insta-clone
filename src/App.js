import React, {useState, useEffect} from 'react'

import {db, auth} from './firebase'

import Header from './components/Header/Header'
import Post from './components/Post/Post'
import './App.css'


function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection('posts').onSnapshot(snap => {
      setPosts(snap.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })))
    })
  }, [])

  return (
    <div className='app'>
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
