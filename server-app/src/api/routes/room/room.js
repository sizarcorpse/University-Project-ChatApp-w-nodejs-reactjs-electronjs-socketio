const express = require("express");
const User = require("../../../models/User");
const addUser = async ({ id, name, room }) => {
  try {
    const user = await User.findOne({ username: name });

    if (user) {
      user.rooms = room;
      user.socketID.push(id);

      await user.save();

      return { user: user };
    } else {
      return { error: "no user" };
    }
  } catch (error) {
    console.log(error);
  }
};

const removeUser = async ({ id }) => {
  try {
    let userroom;
    const user = await User.findOne({ socketID: { $in: [id] } });
    if (user) {
      userroom = user.rooms;
      user.socketID = [];
      user.rooms = "";
      await user.save();

      return { username: user.username, room: userroom };
    }
  } catch (error) {
    console.log(error);
  }
};

const getUser = async ({ id }) => {
  try {
    const user = await User.findOne({
      socketID: { $in: [id] },
    });
    return {
      username: user.username,
      rooms: user.rooms,
      profilePhoto: user.profilePhoto,
    };
  } catch (error) {
    console.log(error);
  }
};

const getUsersInRoom = async (room) => {
  try {
    const users = [];

    const uxs = await User.find({ rooms: room });
    uxs.forEach((user) => {
      users.push({
        username: user.username,
        profilePhoto: `http://localhost:8000/api/user/${user.username}/profile`,
      });
    });

    return users;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { addUser, getUser, getUsersInRoom, removeUser };
