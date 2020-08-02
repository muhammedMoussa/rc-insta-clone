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
  
function Signup({open, handleClose, handleSignup}) {
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [username, setUsername] = useState('')
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
                    <Input type="text" value={username} onChange={e => setUsername(e.target.value)}></Input>
                    <Input type="text" value={email} onChange={e => setEmail(e.target.value)}></Input>
                    <Input type="password" value={password} onChange={e => setPassword(e.target.value)}></Input>
                    <Button onClick={(e) => handleSignup([username, email, password])}>
                        Signup
                    </Button>  
                </form>
            </div>
      </Modal>
    )
}

export default Signup
