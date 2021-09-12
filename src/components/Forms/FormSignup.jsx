import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { withUser } from "../Auth/withUser";
import apiHandler from "../../api/apiHandler";
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import "./FormSignup.css"
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: "1 rem",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin:"1 rem",
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: "1 rem",
  },
  submit: {
    margin: "1 rem",
  },
}));

class FormSignup extends Component {
  state = {
    email: "",
    password: "",
  };

  handleChange = (event) => {
    const value = event.target.value;
    const key = event.target.name;

    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    apiHandler
      .signup(this.state)
      .then(() => {
        this.props.history.push("/signin");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    if (this.props.context.user) {
      return <Redirect to="/" />;
    }

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline/>
        <div className="signupDiv"> 
          <Avatar className='avatar'>
            <LockOutlinedIcon/>
          </Avatar>
          <Typography color="primary" component="h4" variant="h4">
            Sign up
          </Typography>
          <form onSubmit={this.handleSubmit}>
            <Grid container spacing={2} justifyContent="center" justifyContent="center">
              <Grid item xs={12} sm={6}  justifyContent="center" justifyContent="center">
                <TextField
                  name="firstName" 
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autofocus/>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="lastName" 
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  />
              </Grid>

            </Grid>
            <label htmlFor="email">Email</label>
            <input
              onChange={this.handleChange}
              value={this.state.email}
              type="email"
              id="email"
              name="email"
              />
            <label htmlFor="password">Password</label>
            <input
              onChange={this.handleChange}
              value={this.state.password}
              type="password"
              id="password"
              name="password"
              />
            <button>Submit</button>
          </form>
        </div>
      </Container>
    );
  }
}

export default withRouter(withUser(FormSignup));
