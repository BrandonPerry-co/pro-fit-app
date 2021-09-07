import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '30ch',
      display: 'flex',
      flexDirection: 'column',
      padding: '10px 0', 
      margin: '20px 0',
    },
    '.MuiButton-containedSecondary': {
      color: '#fff',
      backgroundColor: '#c92e00'
    }
  },
}))

export default function Login(props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [loginStatus, setLoginStatus] = useState(false);

  Axios.defaults.withCredentials = true;

  const login = () => {
    Axios.post("http://localhost:4001/login", {
      username: username,
      password: password,
      loginStatus: loginStatus
    }).then((response) => {
      if (!response.data.auth){
        setLoginStatus(false);
      } else {
        localStorage.setItem("token",response.data.token)
        setLoginStatus(true);
      }
    });
  };

  const userAuthenticated = () => {
    Axios.get("http://localhost:4001/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }).then((response)=> {
      console.log(response);
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:4001/login").then((response) => {
      if (response.data.loggedIn === true) {
        setLoginStatus(response.data.user[0].username);
      }
    })
  }, [])
  
    const classes = useStyles();
    return (
        <form id="form" className={classes.root} noValidate autoComplete="off">
        <div>
        <TextField id="standard-basic" label="Username"
        onChange={(e) => {
          setUsername(e.target.value);
      }} 
      />
        <TextField
          id="standard-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          onChange={(e) => {
            setPassword(e.target.value);
        }} 
        />
          <Button type="submit" variant="contained" color="secondary"
          onClick={login}
          >Login</Button>
           </div>
           <div>
             {/* {loginStatus && (

             )} */}
           </div>
       </form>
    )
}
