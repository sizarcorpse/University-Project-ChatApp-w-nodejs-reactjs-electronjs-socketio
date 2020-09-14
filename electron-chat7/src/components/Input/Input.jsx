import React from "react";

import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";

const Input = ({ message, setMessage, sendMessage }) => (
  <form>
    <FormControl
      fullWidth
      style={{ padding: "0px 30px 10px 30px", height: "30px", margin: 0 }}
    >
      <TextField
        placeholder="Type a message"
        // variant="outlined"
        type="text"
        margin="normal"
        required
        id="password"
        value={message}
        name="password"
        autoFocus
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
      />
    </FormControl>
  </form>
);

export default Input;
