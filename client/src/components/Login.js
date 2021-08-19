import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
      display: 'flex',
      flexDirection: 'column',
      padding: '10px 0', 
      marginTop: '20px',
    },
  },
}))

export default function Login(props) {
    const classes = useStyles();
    return (
        <form id="form" className={classes.root} noValidate autoComplete="off" method="POST" action="/signin">
        <div>
        <TextField id="standard-basic" label="Username" />
        <TextField
          id="standard-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
        />{props.isRegistered === true ? 
        <TextField
            id="standard-password-input"
            label="Confirm Password"
            type="password"
            autoComplete="current-password"
          /> 
          : null} 
          <Button type="submit" variant="contained" color="primary">{props.isRegistered ? 'Login' : 'Register'}</Button>
           </div>
       </form>
    )
}
