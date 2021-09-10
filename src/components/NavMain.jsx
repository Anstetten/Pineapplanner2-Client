import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import { withUser } from "../components/Auth/withUser";
import apiHandler from "../api/apiHandler";
import pineLogo from "../Images/pineapple.png"
import "./NavMain.css";
import {FaBars} from 'react-icons/fa'


const NavMain = (props) => {
  const { context } = props;
  const [click, setClick] = useState(false);
  const handleClick = ()=> setClick(!click);
  const closeMobileMenu = ()=> setClick(false);



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
      <NavLink onClick={closeMobileMenu} className="logoWrapper" exact to="/">
        <img id="smallLogo" src={pineLogo} alt="logo"/>
        <h3 className="logo">PineaPlanner</h3>
      </NavLink>
      <FaBars className='bars' onClick={handleClick}/>
      <ul className={click ? "nav-list mobile" : "nav-list"}>
        <div className="navLeft">
          <li onClick={closeMobileMenu}>
            <NavLink  to="/recipes">Recipes</NavLink>
          </li>
          {context.isLoggedIn &&(
                          <li onClick={closeMobileMenu}>
                          <NavLink  to="/planner">Meal Planner</NavLink>
                          </li>
          ) }
        </div>

        {context.isLoggedIn && (
          <React.Fragment>

            <div className="navRight">
            <li onClick={closeMobileMenu}>
              <NavLink to="/profile">
                {context.user && context.user.email}
              </NavLink>
            </li>
            <li  onClick={closeMobileMenu}>
              <p onClick={handleLogout}>Logout</p>
            </li>
            </div>
          </React.Fragment>
        )}
        {!context.isLoggedIn && (
          <React.Fragment>
            <div className="navRight">
            <li  onClick={closeMobileMenu}>
              <NavLink to="/signin">Log in</NavLink>
            </li>
            <li  onClick={closeMobileMenu}>
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
