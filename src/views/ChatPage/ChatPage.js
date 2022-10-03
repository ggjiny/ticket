import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  Fragment,
} from "react";
import Header from "../Header/Header";

import "./Chat.css";
import axios from "axios";

import SockJs from "sockjs-client";
import Stomp from "stompjs";
import { Space } from "antd";
import {
  SendOutlined,
  HomeOutlined,
  ConsoleSqlOutlined,
} from "@ant-design/icons";
import "react-chat-elements/dist/main.css";
import {
  SystemMessage,
  MessageBox,
  MessageList,
  Navbar,
  Input,
  Button,
  SideBar,
  ChatList,
} from "react-chat-elements";

const ChatPage = () => {
  const [chatList, setChatList] = useState([]);
  const inputReferance = React.createRef();
  const messageListReferance = React.createRef();
  const [roomName, setRoomName] = useState("");
  //const [roomId, setRoomId ] = useState('');
  const [userName, setUserName] = useState("");
  const [content, setContent] = useState([]);
  const [writer, setWriter] = useState([]);
  const [messageList, setMessageList] = useState([]);
  const [RMessageList, setRMessageList] = useState([]);
  const [message, setMessage] = useState("");
  const [inputMessage, setInputMessage] = useState([]);
  const [newDate, setNewDate] = useState([]);
  const [sender, setSender] = useState([]);
  const [text, setText] = useState("");

  let caro = <div></div>;
  let str = <div></div>;
  let str1 = <div></div>;
  const sockJs = new SockJs("http://3.38.7.238:8080/ws");
  const stomp = Stomp.over(sockJs);

  const acToken = sessionStorage.getItem("accesstoken");
  const baseUrl = "/api/v1/member";
  const roomId = "1";
  const SName = "semi";

  const getMember = () => {
    //사용자 이름 받기
    axios
      .get(baseUrl, {
        headers: {
          Authorization: `Bearer ${acToken}`,
        },
      })
      .then((res) => {
        setUserName(res.data.result.username);
        console.log(res.data.result.username);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const Info = () => {
    //채팅 목록 받기
    axios
      .get("/api/v1/chat/1/", {
        headers: {
          Authorization: `Bearer ${acToken}`,
        },
      })
      .then((res) => {
        //setRoomId(res.data.result.roomId);//setRoomId
        setRoomName(res.data.result.roomName); //setRoomName
        setMessageList(res.data.result.messageList); //setMessageList
        setWriter(res.data.result.messageList.contents.sender); //setWirter
        const temp = JSON.stringify(res.data.result.messageList);
        const contents = JSON.parse(temp);
        console.log(res.data.result.messageList);

        /* if (contents.length === 0) {

          stomp.send(
            "/pub/chat.enter." + roomId,
            {},
            JSON.stringify({ type: "JOIN" })
          );
        } else {

          for (var i = 0; i < contents.length; i++) {
            const arrs = JSON.parse(JSON.stringify(contents[i]));
            setNewDate(arrs.date);

          }
        }*/
      })
      .catch((error) => {
        console.log("실패");
        console.log(error);
      });
  };
  const Subscribe = () => {
    //구독하기
    stomp.subscribe(`/topic/room.` + roomId, function (response) {
      console.log("chat:" + response);
      console.log(JSON.parse(response.body));
      // const json_body = JSON.parse(chat.body);
      //setWriter(json_body.sender);
      //setChatList([...chatList, json_body]);
    });
  };

  const Connect = () => {
    //연결하기

    stomp.connect(
      { Authorization: `Bearer ${acToken}`, roomId },
      function (frame) {
        console.log("connected: " + frame);
        Subscribe();
        // if (userName && text)
        //   stomp.send(
        //     "/pub/chat.message." + roomId,
        //     {},
        //     JSON.stringify({ sender: userName, data: text, type: "CHAT" })
        //   );
      }
    );
  };

  useEffect(() => {
    Connect();
    getMember();
    Info();
  }, []);

  const SendMessage = (e) => {
    //메시지 보내기
    e.preventDefault();
    console.log(text);
    if (userName && text)
      stomp.send(
        "/pub/chat.message." + roomId,
        {},
        JSON.stringify({ sender: userName, data: text, type: "CHAT" })
      );
    setText("");
  };

  const onChangeMsg = (e) => {
    setText(e.target.value);
  };

  // const onInfo = (e) => {
  //   Info();
  // };

  str = (
    <div>
      {chatList.map((ch, idx) => (
        <MessageBox
          position={"right"}
          type={"text"}
          text={ch.data}
          title={writer}
        />
      ))}
    </div>
  );

  return (
    <>
      <h1>{content.sender}</h1>
      {/* <Button onClick={onInfo} /> */}
      <Navbar
        left={<div>{roomName} </div>}
        center={<div>{userName}님 환영합니다.</div>}
        right={<div></div>}
      />
      <br />
      <div>{str}</div>
      <form onSubmit={SendMessage}>
        <input
          referance={inputReferance}
          placeholder="메시지를 입력하세요!"
          //multiline={true}
          onChange={onChangeMsg}
          //autofocus={true}
          value={text}
        ></input>
        <button type="submit">보내기</button>
      </form>
    </>
  );
};
export default ChatPage;
