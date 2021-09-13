import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { withUser } from "../Auth/withUser";
import apiHandler from "../../api/apiHandler";
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import "./FormSignup.css"
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import StyledButton from "../Base/StyledButton/StyledButton";


class FormSignup extends Component {
  state = {
    email: "",
    password: "",
    firstName:"",
    lastName:"",
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
        <main className="signupDiv"> 
          <Avatar className='avatar'>
            <LockOutlinedIcon />
          </Avatar>
          <Typography color="primary" component="h1" variant="h4">
            Sign up
          </Typography>
          <form onSubmit={this.handleSubmit}>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} sm={6} justifyContent="center">
                <TextField
                  name="firstName" 
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autofocus
                  value={this.state.firstName}
                  type="firstName"
                  onChange={this.handleChange}/>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="lastName" 
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  value={this.state.lastName}
                  type="lastName"
                  onChange={this.handleChange}
                  />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="email" 
                  fullWidth
                  id="email"
                  label="E-mail*"
                  value={this.state.email}
                  type="email"
                  onChange={this.handleChange}
                  />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="password" 
                  fullWidth
                  id="password"
                  label="Password*"
                  value={this.state.password}
                  type="password"
                  onChange={this.handleChange}
                  />
              </Grid>
            </Grid>
            <StyledButton
                  id="signupButton"
                  color="primary"
                  variant="contained"
                  size="small"
                  type="submit"
                  label="Submit">
                  Create Account
            </StyledButton>
          </form>
        </main>
      </Container>
    );
  }
}

export default withRouter(withUser(FormSignup));
