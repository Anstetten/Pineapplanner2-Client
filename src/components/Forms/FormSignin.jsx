import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import apiHandler from "../../api/apiHandler";
import { withUser } from "../Auth/withUser";
import StyledButton from "../Base/StyledButton/StyledButton";
import Container from '@material-ui/core/Container';


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
      <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
        <h2>Signin</h2>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" />
        <StyledButton
          color="primary"
          variant="contained"
          size="small"
          type="submit"
          label="Submit"
          >Submit</StyledButton>
      </form>
      </Container>
    );
  }
}

export default withRouter(withUser(FormSignin));
