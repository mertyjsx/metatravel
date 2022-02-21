import { Fragment, useEffect, useRef, useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
const Nav = ({signOut,user,signIn}) => {


  
  return (
    <Fragment>
      <div className="space-between navbarContainer">
      <Link to="/" className="left center">
     
<img style={{width:30,margin:10}} src={"/logo.png"} alt="logo"></img>
<span style={{color:"#1976d2"}}> META</span>TRAVEL
         
              </Link>
          {user? <div className="center">
        <Link to="/profile">
      <div
               
                className="navButtonOutline"
                variant="contained"
                color="primary"
              >
<AccountCircleIcon className="mr-1"></AccountCircleIcon>
            Profile
              </div>
              </Link>
              <div
               
                className="navButton"
                variant="contained"
                color="primary"
                onClick={()=>signOut()}
              >
                Disconnect
              </div>
              </div>:
               <div className="center">
               
                     <div
                      
                       className="navButton"
                       variant="contained"
                       color="primary"
                       onClick={()=>signIn()}
                     >
                       Connect to Near
                     </div>
                     </div>}
      </div>
    </Fragment>
  );
};

export default Nav;

/**
 *     {wallet?.isSignedIn()&&<Button  variant="contained" color="primary">
    disconnect wallet
    </Button>}
 */
