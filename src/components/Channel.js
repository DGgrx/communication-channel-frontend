import React, { useEffect } from "react";
import "./css/ChatRoom.css";
import Avatar from "react-avatar";
import axios from "../helpers/axios";

function Channel({ name }) {
  const getUserInfo = async (userId) => {
    const res = await axios.get("/user", {
      params: {
        userId: "5fe85f079b965e3ade7dc13f",
      },
    });
    if (res.status === 200) {
      const user = res.data.user;
    } else {
      console.log(res);
    }
  };
  useEffect(() => {
    getUserInfo("5fe85f079b965e3ade7dc13f");
  }, []);
  return (
    <a className="list-group-item media" href="#">
      <div className="pull-left avatars">
        <Avatar name={name} size="40" round />
      </div>
      <div className="media-body">
        <div className="list-group-item-heading">{name}</div>
        <small className="list-group-item-text c-gray"></small>
      </div>
    </a>
  );
}
export default Channel;
