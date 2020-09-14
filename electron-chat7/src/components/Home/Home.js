import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../../App";

import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "#2b2e4a",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    zIndex: -1,
    backgroundColor: "#2b2e4a",
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    padding: theme.spacing(3),
    backgroundColor: "#384259",
  },
  enterRoom: {
    backgroundColor: "#384259",
  },
}));

export default function Home() {
  const [user, setUser] = useContext(UserContext);
  const [room, setRoom] = useState("");
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Divider />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            <ListItem>
              <Typography>recent</Typography>
            </ListItem>
          </List>
          <Divider />
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        <Typography
          component="h1"
          variant="h1"
          align="center"
          gutterBottom
          style={{ color: "#dbe2ef" }}
        >
          A Very Simple Chat Application
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          Developed by : sizarcorpse
        </Typography>
        <FormControl fullWidth inputProps={{ className: classes.enterRoom }}>
          <TextField
            inputProps={{ className: classes.enterRoom }}
            variant="outlined"
            margin="normal"
            required
            id="room"
            value={room}
            label="Enter A Room Name"
            name="room"
            autoFocus
            onChange={(event) => setRoom(event.target.value)}
          />
        </FormControl>
        <Link
          onClick={(e) => (!user.username || !room ? e.preventDefault() : null)}
          to={`/chat?name=${user.username}&room=${room}`}
          style={{ textDecoration: "none" }}
        >
          <Button variant="outlined" color="primary" fullWidth>
            Join
          </Button>
        </Link>
      </main>
    </div>
  );
}
