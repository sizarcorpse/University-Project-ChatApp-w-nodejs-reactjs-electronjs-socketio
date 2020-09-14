import React from "react";

import Avatar from "@material-ui/core/Avatar";

import "./TextContainer.css";

const TextContainer = ({ users }) => {

  console.log('from text conteiner',users)

if(users){
  users.map((user) => {
    console.log("hi",user.username)
  })
}

return (  <div className="textContainer">
  <div>
    <h1>
      Realtime Chat Application
      <span role="img" aria-label="emoji">
          💬 🤣 🍜 🍷
        </span>
    </h1>
  </div>
  {users ? (
      <div>
        <h1>People currently chatting:</h1>
        <div className="activeContainer">
          <h2>
            {users.map((user) => (

                <div key={user} className="activeItem">
                  <Avatar
                      alt="Remy Sharp"
                      src={user.profilePhoto}
                  />

                  {user.username}
                  <img alt="Online Icon" src=''/>
                </div>
            ))}
          </h2>
        </div>
      </div>
  ) : null}
</div>)
}

export default TextContainer;
