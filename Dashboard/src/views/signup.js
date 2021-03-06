import React, { useState, useEffect }  from 'react';
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
import axios from "../node_modules1/axios";
import homeimg from '../image/elearning.jpg'
import Select from "react-select";
import { Redirect } from 'react-router-dom'
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [course, setcourse] = useState("");
  const [Admin, setAdmin] = useState("N");
  const [returndata, setreturndata] = useState(0);
  const [selectedOption, setselectedOption] = useState(false);
  const [data, setData] = useState({label: "Loading ...", value: ""});
  const [loading, setLoading] = React.useState(true);
  const [status, setstatus] = useState(false);

  function validateForm() {
    return email.length > 0 && password.length > 0 && course.length > 0 && firstName.length > 0 && lastName.length > 0;
  }
  
  function handleChange(event) {
    var id =event.value;
    setselectedOption({ id });
    setcourse(id);
    console.log(event.value)
   };
  useEffect(() => {
    axios
        .get("/users/coursedetails")
        .then(result => setData(result.data.map((data) => { return { value: data._id, label: data.Usercourse } })))
        setLoading(false);
}, []);


  function handleSubmit(event) {
    event.preventDefault();
    var tempDate = new Date();
    var date = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate() +' '+ tempDate.getHours()+':'+ tempDate.getMinutes()+':'+ tempDate.getSeconds();
  
    const newUser={
      Fname:firstName,
      LName:lastName,
      Useremail:email,
      Userpassword:password,
      UserAdmin: Admin,
      UserCourseID: course,
      Inserted_date:date
    }
  
    
  fetch('/users', {
    method: 'POST',
    body: JSON.stringify(newUser),
    headers: {
        'Content-Type': 'application/json'
    }
  }).then(res => res.json())
      .then(returndata => setreturndata({ returndata }))
      .catch(error => console.error('Error:', error))
      .then(setstatus("SignUp Sucessfully"))

    event.target.reset();
   
    
}

  return (
    <div style={{backgroundImage: `url(${homeimg})`}}>
 
 <Container component="main" maxWidth="xs" style={{background:"#cce6ff"}}>
      <CssBaseline />
      <div>{returndata.id}</div>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up 
        </Typography>
       <div style={{ color: 'red' }}> {status}</div>
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={e => setfirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={e => setlastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={e => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={e => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              {/* <TextField
                variant="outlined"
                required
                fullWidth
                name="course"
                label="Course"
                type="course"
                id="course"
                autoComplete="current-course"
                onChange={e => setcourse(e.target.value)}
              /> */}
              <Select disabled={loading} value={selectedOption} classname ="form-control input-sm" options={data}  onChange={handleChange}  />
           
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="Y" color="primary" />}
                label="Admin"
                onChange={e => setAdmin(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!validateForm()}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signin/" variant="body2" >
                 Do have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  </div>
  )
}
