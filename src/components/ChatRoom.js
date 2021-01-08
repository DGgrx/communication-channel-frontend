import React, { useState, useEffect } from "react";
import "./css/ChatRoom.css";
import $, { data } from "jquery";
import Message from "./Message";
import axios from "../helpers/axios";
import Rooms from "./Rooms";
import Member from "./Member";
import getSocket from "../helpers/socket";

const socket = getSocket();

// $(function () {
//   if ($("#ms-menu-trigger")[0]) {
//     $("body").on("click", "#ms-menu-trigger", function () {
//       $(".ms-menu").toggleClass("toggled");
//     });
//   }
// });

function ChatRoom({ token, user }) {
  const [clickedRoomName, setClickedRoomName] = useState("");
  const [clickedRoomMembers, setClickedRoomMembers] = useState([]);
  const [clickedRoomMessages, setClickedRoomMessages] = useState([]);

  const acknowledgement = (ack) => {
    if (ack) {
      alert(ack);
    }
  };

  const sendMessage = () => {
    const content = document.getElementById("box").value;
    if (content) {
      socket.emit("message", {
        senderId: user._id,
        content,
        createdAt: Date().toLocaleString(),
      });
      document.getElementById("box").value = "";
    }
  };
  useEffect(() => {
    socket.on("message", (data) => {
      const { senderId, content, createdAt } = data;
      setClickedRoomMessages((messages) => [
        ...messages,
        { senderId, content, createdAt },
      ]);
    });
  }, []);

  useEffect(() => {
    $("#ms-menu-trigger").on("click", function () {
      $(".ms-menu").toggleClass("toggled");
    });
  }, []);
  // var [bg, state] = React.useState({
  //   backgroundImage: "url(./images/pcb.gif)",
  // });
  // function background({ val }) {
  //   if (val === "App Development")
  //     state((bg = { backgroundImage: "url(./css/images/5.jpg)" }));
  // }

  return (
    <div className="all">
      <div className="container bootstrap snippets bootdey">
        <div className="tile tile-alt" id="messages-main">
          <div className="ms-menu">
            <div className="ms-user clearfix">
              <div className="sub-heading">Channels</div>
            </div>
            <div className="list-group lg-alt scroll">
              <Rooms
                token={token}
                user={user}
                setClickedRoomName={setClickedRoomName}
                setClickedRoomMembers={setClickedRoomMembers}
                setClickedRoomMessages={setClickedRoomMessages}
                acknowledgement={acknowledgement}
                socket={socket}
              />
              <div className="ms-user clearfix">
                <div className="sub-heading">Members</div>
              </div>
              {clickedRoomMembers.map((clickedRoomMember) => (
                <Member userId={clickedRoomMember.id} />
              ))}
            </div>
          </div>
          {console.log(clickedRoomName)}
          {clickedRoomName ? (
            //if clicked room true
            <div className="ms-body">
              <div className="action-header clearfix">
                <div
                  className="d-none d-block d-sm-block d-md-none"
                  id="ms-menu-trigger"
                >
                  <i className="fa fa-bars" />
                </div>
                <div className="pull-left roomname">
                  <div className="lv-avatar pull-left"></div>
                  <div className="sub-heading">{clickedRoomName}</div>
                </div>
              </div>

              {/* MESSAGES START FROM HERE*/}

              <div className="messages">
                <div className="reverse" id="messages">
                  {clickedRoomMessages.map(
                    ({ senderId, content, createdAt }) => (
                      <Message
                        senderId={senderId}
                        content={content}
                        createdAt={createdAt}
                        user={user}
                      />
                    )
                  )}
                </div>
              </div>
              {/* MESSAGES END */}
              <div className="msb-reply">
                <textarea
                  placeholder="What's on your mind..."
                  defaultValue={""}
                  id="box"
                />
                <button
                  onClick={() => {
                    sendMessage();
                  }}
                >
                  <i className="fa fa-paper-plane-o" />
                </button>
              </div>
            </div>
          ) : (
            //else
            <div className="ms-body">
              <div className="action-header clearfix">
                <div
                  className="d-none d-block d-sm-block d-md-none"
                  id="ms-menu-trigger"
                >
                  <i className="fa fa-bars" />
                </div>
                <div className="pull-left roomname">
                  <div className="lv-avatar pull-left"></div>
                  <div className="sub-heading"></div>
                </div>
              </div>

              {/* MESSAGES START FROM HERE*/}

              {/* <div className="messages">
                <div className="reverse">
                  {clickedRoomMessages.map(
                    ({ senderId, content, conversationId, createdAt }) => (
                      <Message
                        senderId={senderId}
                        content={content}
                        conversationId={conversationId}
                        createdAt={createdAt}
                      />
                    )
                  )}
                </div>
              </div> */}
              {/* MESSAGES END */}
              {/* <div className="msb-reply">
                <textarea
                  placeholder="What's on your mind..."
                  defaultValue={""}
                />
                <button>
                  <i className="fa fa-paper-plane-o" />
                </button>
              </div> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default ChatRoom;
