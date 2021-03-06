import React, { useState, useContext, useEffect } from 'react';
import Avatar from '../node_modules1/@material-ui/core/Avatar';
import Button from '../node_modules1/@material-ui/core/Button';
import CssBaseline from '../node_modules1/@material-ui/core/CssBaseline';
import TextField from '../node_modules1/@material-ui/core/TextField';
import FormControlLabel from '../node_modules1/@material-ui/core/FormControlLabel';
import Checkbox from '../node_modules1/@material-ui/core/Checkbox';
import Link from '../node_modules1/@material-ui/core/Link';
import Grid from '../node_modules1/@material-ui/core/Grid';
import Box from '../node_modules1/@material-ui/core/Box';
import LockOutlinedIcon from '../node_modules1/@material-ui/icons/LockOutlined';
import Typography from '../node_modules1/@material-ui/core/Typography';
import { makeStyles } from '../node_modules1/@material-ui/core/styles';
import Container from '../node_modules1/@material-ui/core/Container';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { userContext } from '../node_modules1/views/Logincontext'
import homeimg from '../image/elearning.jpg'
import AdminLayout from '../node_modules1/layouts/Admin'
import SignupPage from "../node_modules1/views/signup";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Userdetails, setuserdetails] = useState(0);
  const [status, setstatus] = useState(false);
  const { setUser,user } = useContext(userContext)

  localStorage.setItem("parentValueKey",Math.random())
  useEffect(() => {
    setUser(Userdetails)
  }, [Userdetails])


  function validateForm() {
    return email.length > 0 && password.length > 0;
  }
  function handleevent(event) {
    event.preventDefault();
    setuserdetails(2)
  }

  function handleSubmit(event) {
    event.preventDefault();
    const newUser = {
      Useremail: email,
      Userpassword: password
    }

    fetch('/users/login', {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(Userdetails => setuserdetails({ Userdetails }))
      .catch(error => console.error('Error:', error))
      .then(Userdetails => localStorage.setItem("parentValueKey",{Userdetails}))
      .then(setstatus("Invalid Login Id Or Password"))
      

  }
  console.log(user)
  if (Userdetails === 2) {
    return (
      <Router>
        <Switch>
         <Route path="/admin/SignupPage" component={SignupPage} />
          <Redirect to="/admin/SignupPage" />
        </Switch>
      </Router>
    )
  }
  
  else if (Userdetails !== 0) {
    let obj = Userdetails;
    let keys = Object.keys(obj);
    let lat = obj[keys[0]];
    //adding data to user context
    // 
    console.log(localStorage.getItem("parentValueKey"))
    //if (String(lat.UserAdmin) === 'N') {
    // setmenuroute (route.filter(function (entry) { return entry.display === "user" || entry.display === "both" }))
    return (
      <Router>
        <Switch>
          <Route path="/admin" render={props => (<AdminLayout {...props} menuroute={lat.UserAdmin} />)} />
          <Redirect to="/admin/home" />
        </Switch>
      </Router>
    )

    //}
    //   else if (String(lat.UserAdmin) === 'Y') {
    //     return <Redirect to={{
    //       pathname: '/admin/AdminPage'
    //       // ,state: { Name: lat }
    //         //   this.state.menuroute = route.filter(function (entry) { return entry.display === "admin" || entry.display === "both" });

    //   }}
    // />
    //   }
  }
  else {
    return (
      <div style={{ backgroundImage: `url(${homeimg})` }}>
        <Container component="main" maxWidth="xs" style={{ background: "#cce6ff" }}>
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
        </Typography>
       <div style={{ color: 'red' }}> {status}</div>
            <form onSubmit={handleSubmit} className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={e => setEmail(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={e => setPassword(e.target.value)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={!validateForm()}
              >
                Sign In
          </Button>
               </form>
               <Grid container>
                {/* <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
              </Link>
                </Grid> */}
                <Grid item>
                <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleevent}
              >
               Don't have an account? Sign Up
          </Button>
                  {/* <Link href="/admin/signup/" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link> */}
                </Grid>
              </Grid>
           
          </div>
          <Box mt={8}>
            <Copyright />
          </Box>
        </Container>
      </div>

    );
  }
}