import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import {Input} from '@material-ui/core'

import {db, storage, serverTimestamp} from '../../firebase'
import RcInstaCloneBackdrop from '../Backdrop/RcInstaCloneBackdrop'

import './Uploader.css'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
}));

function Uploader({username}) {
    const classes = useStyles();
    const [caption, setCaption] = useState('')
    const [image, setImage] = useState('')
    const [backdropOpen, setBackdropOpen] = useState(false)

    const handleChange = (e) => {
        setImage(e?.target?.files[0])
    };

    const handleUpload = () => {
        // @TODO: HANDLE NICE UI MESSAGES   
        if(!image || !caption) {  
            alert('Please make sure you added image and caption.')
            return;
        }

        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                // @TODO: HANDLE PROGRESS
                // const progress = Math.random((snapshot.bytesTransferred/snapshot.totalBytes)*100)
                setBackdropOpen(true)
                
            },
            error => {
                // @TODO: HANDLE ERROR
                console.error(error)
                alert(error.message)
            },
            () => {
                storage
                    .ref('images')
                    .child(image?.name)
                    .getDownloadURL()
                    .then(url => {
                        db.collection('posts').add({
                           timestamp: serverTimestamp,
                           caption: caption,
                           imageUrl: url,
                           username 
                        })
                    })
                    setCaption('')
                    setBackdropOpen(false)
            }
        )
    }

    
    return (
    <div className={classes.root} className="uploader">
        <RcInstaCloneBackdrop open={backdropOpen}  />
        <label htmlFor="icon-button-file">
            <IconButton color="primary" aria-label="upload picture" component="span">
                <PhotoCamera />
            </IconButton>
        </label>
        <Input 
            className="uploader__caption"
            type="text" 
            placeholder="Caption" 
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
        ></Input>

        <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            multiple
            type="file"
        />

        <input accept="image/*" className={classes.input} id="icon-button-file" type="file" onChange={handleChange}/>
        <Button className="uploader__submit" variant="contained" color="primary" onClick={handleUpload}>
            Upload
        </Button>
    </div>
    );
}

export default Uploader
