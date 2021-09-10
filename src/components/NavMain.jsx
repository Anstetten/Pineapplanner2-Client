import React from "react";
import { NavLink } from "react-router-dom";
import { withUser } from "../components/Auth/withUser";
import apiHandler from "../api/apiHandler";
import pineLogo from "../Images/pineapple.png"
import "./NavMain.css";
import {FaBars} from 'react-icons/fa'

const NavMain = (props) => {
  const { context } = props;



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
      <NavLink className="logoWrapper" exact to="/">
        <img id="smallLogo" src={pineLogo} alt="logo"/>
        <h3 className="logo">PineaPlanner</h3>
      </NavLink>
      <FaBars className='bars'/>
      <ul className="nav-list">
        <div className="navLeft">
          <li>
            <NavLink  to="/recipes">Recipes</NavLink>
          </li>
          {context.isLoggedIn &&(
                          <li>
                          <NavLink  to="/planner">Meal Planner</NavLink>
                          </li>
          ) }
        </div>

        {context.isLoggedIn && (
          <React.Fragment>

            <div className="navRight">
            <li>
              <NavLink to="/profile">
                {context.user && context.user.email}
              </NavLink>
            </li>
            <li>
              <p onClick={handleLogout}>Logout</p>
            </li>
            </div>
          </React.Fragment>
        )}
        {!context.isLoggedIn && (
          <React.Fragment>
            <div className="navRight">
            <li>
              <NavLink to="/signin">Log in</NavLink>
            </li>
            <li>
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
