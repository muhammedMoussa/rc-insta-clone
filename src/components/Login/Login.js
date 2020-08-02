import React, { useState, useEffect } from 'react'
import { Modal, makeStyles, Button, Input } from '@material-ui/core'


function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}
  
const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
}));
  
function Login({open, handleClose, handleLogin}) {
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [email, setEmail] = useState('me@hi.com')
    const [password, setPassword] = useState('pass')

    return (
        <Modal
            open={open}
            onClose={() => {
                setEmail('');
                setPassword('');
                handleClose()
            }}
        >
            <div style={modalStyle} className={classes.paper}>
            <Input required type="text" value={email} onChange={e => setEmail(e.target.value)}></Input>
            <Input required type="password" value={password} onChange={e => setPassword(e.target.value)}></Input>
            <Button type="submit" onClick={() => handleLogin([email, password])  }>
                Login
            </Button>  
            </div>
      </Modal>
    )
}

export default Login
