import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import { Link } from "react-router-dom";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  "@global": {
    "*::-webkit-scrollbar": {
      width: "0.4em",
    },
    "*::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px #1b262c",
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: "#1b262c",
      outline: "1px solid slategrey",
    },
  },
  root: {
    display: "flex",
    backgroundColor: "#112d4e",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: "#2b2e4a",
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: "#2b2e4a",
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
    backgroundColor: "#2b2e4a",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
    backgroundColor: "#384259",
    heigth: "100%",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: "8px",
    height: "86vh",
    width: "100%",
  },
  inputArea: {
    backgroundColor: "#f7fbfc",
    margin: 0,
    paddingLeft: "20x",
    borderRadius: "40px",
    height: "57px",
  },
}));

let socket;

function Chat({ location }) {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const ENDPOINT = "localhost:8000";

  //💨💨 handleing connection
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    //1️⃣✅when someone join the connection
    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });

    return () => {
      //2️⃣❎when someone left the connection
      socket.emit("disconnect");
      socket.off();
    };
  }, [ENDPOINT, location.search]);
  //
  //
  //
  //💨💨 handleing messages
  useEffect(() => {
    //📌 listen message from backend
    socket.on("message", (message) => {
      // this message = playlaod ({ user: "admin", text: `${user.name}, has joined !` })
      setMessages([...messages, message]);
      //this setMessages = adding every new messages from admin/bot or any users
    });

    //📌 listen usersdata from backend
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, [messages]);
  //
  //
  //
  //3️⃣💌  hangleing send message
  const sendMessage = (e) => {
    // 📌 this sending chat message to backend for emming to everyone
    e.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => {
        setMessage("");
      });
    }
  };
  //
  //
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Paper style={{ backgroundColor: "#2d4059" }}>
      <Box className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              {room}
            </Typography>
            <Link
              to="/home"
              style={{
                textDecoration: "none",
                display: "flex",
                justifyContent: "flex-end",
                flexGrow: 1,
                marginRight: "20px",
                color: "white",
              }}
            >
              <ExitToAppIcon />
            </Link>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            {users &&
              users.map((user, index) => (
                <ListItem button key={user}>
                  <ListItemIcon>
                    <Avatar alt="Remy Sharp" src={user.profilePhoto} />
                  </ListItemIcon>
                  <ListItemText primary={user.username} />
                </ListItem>
              ))}
          </List>
          <Divider />
        </Drawer>

        <main className={classes.content}>
          <div className={classes.container}>
            <Messages messages={messages} name={name} />
          </div>
          <div className={classes.inputArea}>
            <Input
              message={message}
              setMessage={setMessage}
              sendMessage={sendMessage}
            />
          </div>
        </main>
      </Box>
    </Paper>
  );
}

export default Chat;
