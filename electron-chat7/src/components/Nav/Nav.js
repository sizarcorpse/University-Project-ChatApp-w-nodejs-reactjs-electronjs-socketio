import React, { useContext, useState } from "react";

import { Link } from "react-router-dom";

import { UserContext } from "../../App";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    zIndex: +100,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar(props) {
  const classes = useStyles();
  const [user, setUser] = useContext(UserContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOut = async () => {
    await fetch("http://localhost:8000/api/user/logout", {
      method: "POST",
      credentials: "include", // Needed to include the cookie
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${user.accesstoken}`,
      },
    });
    setAnchorEl(null);
    setUser({});
    props.history.push("/login");
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="static" style={{ backgroundColor: "#2b2e4a" }}>
        <Toolbar>
          <Box className={classes.title}>
            <Link
              to={"/Home"}
              style={{ textDecoration: "none", color: "white" }}
            >
              <Typography variant="h6" className={classes.title}>
                Home
              </Typography>
            </Link>
          </Box>

          {user.isAuthenticated === true ? (
            <Box>
              <Link>
                <Avatar
                  alt="Remy Sharp"
                  aria-controls="fade-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                  src={user.profilePhoto}
                />

                <Menu
                  id="fade-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={open}
                  onClose={handleClose}
                  TransitionComponent={Fade}
                  style={{ top: "50px" }}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                  <MenuItem onClick={logOut}>Logout</MenuItem>
                </Menu>
              </Link>
            </Box>
          ) : (
            <Box className={classes.box}>
              <Link
                to={"/login"}
                style={{ textDecoration: "none", color: "white" }}
              >
                <Button color="inherit">Login</Button>
              </Link>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
