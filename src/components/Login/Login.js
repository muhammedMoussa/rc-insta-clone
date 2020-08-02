import React, {useState} from 'react'
import {Modal, makeStyles, Button, Input} from '@material-ui/core'

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
  
function Login({open, handleClose, handleLogin, disabled}) {
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

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
                <form>
                    <img 
                        className="app__header__img"
                        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                        load="lazy"
                        alt="logo"
                    />
                    <Input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)}></Input>
                    <Input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)}></Input>
                    <Button disabled={disabled} variant="contained" color="primary" onClick={() => handleLogin([email, password])}>Login</Button>  
                </form>
            </div>
      </Modal>
    )
}

export default Login
