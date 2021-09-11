import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import { withUser } from "../components/Auth/withUser";
import apiHandler from "../api/apiHandler";
import pineLogo from "../Images/pineapple.png"
import "./NavMain.css";
import Logo from "./Base/Logo/Logo";
import {FaBars} from 'react-icons/fa'


const NavMain = (props) => {
  const { context } = props;
  console.log(props)
  function handleLogout() {
    apiHandler
      .logout()
      .then(() => {
        context.removeUser();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <nav className="NavMain">
      <NavLink onClick={props.closeMobile} className="logoWrapper" exact to="/">
        <img id="smallLogo" src={pineLogo} alt="logo"/>
        <Logo size="small"/>
      </NavLink>
      <div className="bars" onClick={props.handleClick}>
      <FaBars className='barLogo' />
      </div>
      <ul className={props.click ? "nav-list mobile" : "nav-list"}>
        <div className="navLeft">
          <li onClick={props.closeMobile}>
            <NavLink  to="/recipes">Recipes</NavLink>
          </li>
          {context.isLoggedIn &&(
                          <li onClick={props.closeMobile}>
                          <NavLink  to="/planner">Meal Planner</NavLink>
                          </li>
          ) }
        </div>

        {context.isLoggedIn && (
          <React.Fragment>

            <div className="navRight">
            <li onClick={props.closeMobile}>
              <NavLink to="/profile">
                {context.user && context.user.email}
              </NavLink>
            </li>
            <li  onClick={props.closeMobile}>
              <p onClick={handleLogout}>Logout</p>
            </li>
            </div>
          </React.Fragment>
        )}
        {!context.isLoggedIn && (
          <React.Fragment>
            <div className="navRight">
            <li  onClick={props.closeMobile}>
              <NavLink to="/signin">Log in</NavLink>
            </li>
            <li  onClick={props.closeMobile}>
              <NavLink to="/signup">Create account</NavLink>
            </li>
            </div>
          </React.Fragment>
        )}
      </ul>
    </nav>
  );
};

export default withUser(NavMain);
