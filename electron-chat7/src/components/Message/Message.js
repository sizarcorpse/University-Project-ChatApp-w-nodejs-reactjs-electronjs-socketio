import React, { useContext } from "react";
import ReactEmoji from "react-emoji";
import { UserContext } from "../../App";
import "./Message.css";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  mc: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "3px",
    margin: 0,
  },
  mb: {
    borderRadius: "20px",
    padding: "5px",
    color: "black",
    display: "flex",
    maxWidth: "80%",
    background: " #e5e5e5",
  },
  mt: {
    width: "100%",
    letterSpacing: 0,
    fontSize: "1.1em",
    wordWrap: "break-word",
    display: "flex",
    alignItems: "center",
    paddingLeft: "10px",
    marginRight: "20px",
  },
  mc2: {
    display: "flex",
    justifyContent: "flex-start",
    padding: "3px",
    margin: 0,
  },
  mc3: {
    display: "flex",
    justifyContent: "flex-center",
    padding: "3px",
    margin: 0,
  },
}));

const Message = ({ message: { ruser, text, profilePhoto }, name }) => {
  const [user, setUser] = useContext(UserContext);

  const classes = useStyles();

  let isSentByCurrentUser = false;
  if (user.username === ruser) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <Box className={classes.mc}>
      <Box className={classes.mb}>
        <Typography className={classes.mt}>
          {ReactEmoji.emojify(text)}
        </Typography>
        {profilePhoto && (
          <Avatar
            style={{ justifyContent: "center" }}
            alt="Remy Sharp"
            src={profilePhoto}
          />
        )}
      </Box>
    </Box>
  ) : (
    <Box className={classes.mc2}>
      <Box className={classes.mb}>
        {profilePhoto && (
          <Avatar
            style={{ justifyContent: "center" }}
            alt="Remy Sharp"
            src={profilePhoto}
          />
        )}
        <Typography className={classes.mt}>
          {ReactEmoji.emojify(text)}
        </Typography>
      </Box>
    </Box>
  );
};

export default Message;

// return isSentByCurrentUser ? (
//     <div className="messageContainer justifyEnd">
//         <p className="sentText pr-10">{ruser}</p>
//         <div className="messageBox backgroundBlue">
//             <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
//         </div>
//         {profilePhoto && (<Avatar
//             style={{justifyContent: "center"}}
//             alt="Remy Sharp"
//             src={profilePhoto}
//         />)}
//     </div>
// ) : (
//     <div className="messageContainer justifyStart">
//         <div className="messageBox backgroundLight">
//             <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
//         </div>
//         <p className="sentText pl-10 ">{ruser}</p>
//         <Avatar
//             alt="Remy Sharp"
//             src={profilePhoto}
//         />
//     </div>
// );
