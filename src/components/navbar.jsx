import { Fragment, useEffect, useRef, useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
const Nav = ({signOut}) => {


  
  return (
    <Fragment>
      <div className="navbarContainer">
      <Button
               
                className="navButton"
                variant="contained"
                color="primary"
              >
            Profile
              </Button>
              <Button
               
                className="navButton"
                variant="contained"
                color="primary"
                onClick={()=>signOut()}
              >
                Disconnect
              </Button>
      
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
