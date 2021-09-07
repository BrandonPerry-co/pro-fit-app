import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Axios from 'axios'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
      display: 'flex',
      flexDirection: 'column',
      padding: '10px 0', 
      margin: '20px 0',
    },
  },
}))

export default function Register(props) {
    const [usernameReg, setUsernameReg] = useState('')
    const [passwordReg, setPasswordReg] = useState('') 
    const classes = useStyles();

    Axios.defaults.withCredentials = true;    

const register = () => {
    Axios.post('http://localhost:4001/register', {username: usernameReg, password: passwordReg
}).then((response)=> {
    console.log(response);
});
};
    return (
        <form id="form" className={classes.root} noValidate autoComplete="off">
        <div>
        <TextField id="standard-basic" label="Username" 
        onChange={(e) => {
            setUsernameReg(e.target.value);
        }} 
        />
        <TextField
          id="standard-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          onChange={(e) => {
            setPasswordReg(e.target.value);
        }} 
        />
          <Button type="submit" variant="contained" color="secondary"
          onClick={register}
          >Register</Button>
           </div>
       </form>
    )
}
