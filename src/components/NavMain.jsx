import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import { withUser } from "../components/Auth/withUser";
import apiHandler from "../api/apiHandler";
import pineLogo from "../Images/pineapple.png"
import "./NavMain.css";
import Logo from "./Base/Logo/Logo";
import {FaBars} from 'react-icons/fa'
import DesktopNavItem from "./Base/DesktopNavItem/DesktopNavItem";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SendIcon from '@material-ui/icons/Send';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import EventIcon from '@material-ui/icons/Event';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

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
      <ul className={!props.click ? "navItems" : "navItems hidden"}>
      <div className="navLeft">

        <NavLink className='desktItem' to="/recipes">
        <DesktopNavItem text="Recipes">
          <RestaurantIcon/>
        </DesktopNavItem>
        </NavLink>
    	  {context.isLoggedIn &&(

        <NavLink className='desktItem' to="/planner">
        <DesktopNavItem text="Meal Planner">
          <EventIcon/>
        </DesktopNavItem>
        </NavLink>
        )}
      </div>
        {context.isLoggedIn &&(
          <div className="navRight">
          <NavLink className='desktItem' to="/profile">
          <DesktopNavItem text="Profile">
            <AccountBoxIcon/>
          </DesktopNavItem>
          </NavLink>
          <div className="desktItem" onClick={handleLogout}>
          <DesktopNavItem  text="Logout">
            <ExitToAppIcon/>
          </DesktopNavItem>
          </div>
        </div>

        )}
        {!context.isLoggedIn &&(
          <div className="navRight">
          <NavLink className='desktItem' to="/signin">
          <DesktopNavItem text="Sign in">
            <AccountBoxIcon/>
          </DesktopNavItem>
          </NavLink>
  
          <NavLink className='desktItem' to="/signup">
          <DesktopNavItem text="Sign Up">
            <VpnKeyIcon/>
          </DesktopNavItem>
          </NavLink>
        </div>

        )}

      </ul>

      <div className="bars" onClick={props.handleClick}>
      <FaBars className='barLogo' />
      </div>
      <ul className={props.click ? "nav-list mobile" : "nav-list"}>
        <ListItem button onClick={props.closeMobile}>
            <ListItemIcon>
              <RestaurantIcon />
            </ListItemIcon>
            <NavLink to="/recipes">
            <ListItemText primary="Recipes" />
            </NavLink>
          </ListItem>

          {context.isLoggedIn &&(
            <ListItem button onClick={props.closeMobile}>
              <ListItemIcon>
                <EventIcon />
              </ListItemIcon>
              <NavLink to="/planner">
              <ListItemText primary="Meal Planner" />
              </NavLink>
          </ListItem>
          ) }

        {context.isLoggedIn && (
          <React.Fragment>
            <ListItem button onClick={props.closeMobile}>
              <ListItemIcon>
                <AccountBoxIcon />
              </ListItemIcon>
              <NavLink to="/profile">
              <ListItemText primary="Profile" />
              </NavLink>
          </ListItem>
          <ListItem button onClick={()=>{props.closeMobile();handleLogout()}}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
          </ListItem>
          </React.Fragment>
        )}
        {!context.isLoggedIn && (
          <React.Fragment>
            <ListItem button onClick={props.closeMobile}>
              <ListItemIcon>
                <AccountBoxIcon />
              </ListItemIcon>
              <NavLink to="/signin">
              <ListItemText primary="Log in" />
              </NavLink>
            </ListItem>

            <ListItem classes={{button:"test"}} button onClick={props.closeMobile}>
              <ListItemIcon>
                <VpnKeyIcon />
              </ListItemIcon>
              <NavLink to="/signup">
              <ListItemText primary="Sign up" />
              </NavLink>
            </ListItem>

          </React.Fragment>
        )}
      </ul>
    </nav>
  );
};

export default withUser(NavMain);
