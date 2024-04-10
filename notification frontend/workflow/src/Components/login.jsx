// Login.js
import React,{useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Button, CssBaseline, TextField, Grid, Typography, Container, Box } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { styled } from '@mui/system';
import axios from "axios";

const PaperStyled = styled('div')({
  marginTop: 50,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
});

const AvatarStyled = styled(Avatar)({
  margin: '8px',
  backgroundColor: '#f50057',
});

const TypographyStyled = styled(Typography)({
  marginBottom: '8px',
});

const FormStyled = styled('form')({
  width: '100%',
  marginTop: '8px',
});

const TextFieldStyled = styled(TextField)({
  '& label.Mui-focused': {
    color: '#2196f3',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#2196f3',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#ced4da',
    },
    '&:hover fieldset': {
      borderColor: '#2196f3',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#2196f3',
    },
  },
});

const ButtonStyled = styled(Button)({
  margin: '24px 0px 16px',
});

const LinkStyled = styled(Link)({
  textDecoration: 'none',
  color: '#2196f3',
  '&:hover': {
    textDecoration: 'underline',
  },
});


const Login = () => {
  const navigate= useNavigate();
  const [UserData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [message,setMessage] = useState("");
  //console.log(UserData);
  const handleChange = (e) => {
   
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  
  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/"); // Redirect to home page if logged in
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8090/user/login",
        UserData
      );
      console.log(response);
      //console.log(response.data.message)
      setMessage(response.data.message);
    //  console.log(response.data.username);
      if(response.data.logged){
      localStorage.setItem("username", JSON.stringify(response.data.username));
      localStorage.setItem("userid", JSON.stringify(response.data.userId));
      localStorage.setItem("token", JSON.stringify(response.data.token));
    //   dispatch(setUser(response.data))
    //   alert("Login successful");
    //   console.log(param.pathname)
    // //  if(param.pathname==="/Signup")
       navigate("/");
      
    //   setrefresh(!refresh);
     }  
      else{
        setMessage("wrong credentials")
      }
    } catch (error) {
      console.log(error);
      setMessage("login failed");
      //alert("Login failed");
    }
  };

  
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <PaperStyled>
        <AvatarStyled>
          <LockOutlinedIcon />
        </AvatarStyled>
        <TypographyStyled component="h1" variant="h5">
          Sign in
        </TypographyStyled>
        <FormStyled noValidate onSubmit={handleSubmit}>
          <TextFieldStyled
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
          />
          <TextFieldStyled
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
          <ButtonStyled
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Sign In
          </ButtonStyled>
          <Grid container justifyContent="flex-end">
            <Grid item>
              {/* <LinkStyled to="#" variant="body2"> */}
                Forgot password?
              {/* </LinkStyled> */}
            </Grid>
          </Grid>
          <Box mt={5}>
            <Typography variant="body2" color="textSecondary" align="center">
              {"Don't have an account? "}
              {/* <LinkStyled to="#" variant="body2"> */}
                Sign Up
              {/* </LinkStyled> */}
            </Typography>
          </Box>
        </FormStyled>
        <Typography>{message}</Typography>
      </PaperStyled>
    </Container>
  );
};

export default Login;
