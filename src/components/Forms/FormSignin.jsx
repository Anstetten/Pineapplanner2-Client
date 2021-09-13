import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import apiHandler from "../../api/apiHandler";
import { withUser } from "../Auth/withUser";
import StyledButton from "../Base/StyledButton/StyledButton";
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import "./FormSignup.css"
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


class FormSignin extends Component {
  state = {
    email: "",
    password: "",
  };

  handleChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;

    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    apiHandler
      .signin(this.state)
      .then((data) => {
        this.props.context.setUser(data);
      })
      .catch((error) => {
        console.log(error);
        // Display error message here, if you set the state
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
            <AccountCircleIcon />
          </Avatar>
        <Typography color="primary" component="h1" variant="h4">
          Sign in
        </Typography>
        <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
        <Grid container spacing = {1} justifyContent="center" >
          <Grid item xs={12}>
            <TextField
                  name="email" 
                  fullWidth
                  id="email"
                  label="E-mail address*"
                  autofocus
                  value={this.state.email}
                  type="email"
                  />
          </Grid>
          <Grid item xs={12}>
            <TextField
                  name="password" 
                  fullWidth
                  id="password"
                  label="Password*"
                  autofocus
                  value={this.state.password}
                  type="password"
                  />
          </Grid>

        </Grid>
          <StyledButton
            id="signupButton"
            color="primary"
            variant="contained"
            size="small"
            type="submit"
            label="Submit"
            >Submit</StyledButton>
        </form>
        </main>
      </Container>
    );
  }
}

export default withRouter(withUser(FormSignin));
