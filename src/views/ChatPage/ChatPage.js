import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  Fragment,
  useRef,
} from "react";
import Header from "../Header/Header";

import "./Chat.css";
import axios from "axios";

import SockJs from "sockjs-client";
import * as StompJs from "@stomp/stompjs";
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
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";

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
  const client = useRef({});
  const [chbody, setChbody] = useState({});

  const [disabled, setDisabled] = useState(false);

  let NewMsg = <div></div>;
  let BeforeMsg = <div></div>;
  // const sockJs = new SockJs("http://3.38.7.238:8080/ws");
  // const client = StompJs.over(sockJs);

  const acToken = sessionStorage.getItem("accesstoken");
  const baseUrl = "/api/v1/member";

  const location = useLocation();
  const roomId = location.state.roomId;

  const getMember = () => {
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

  async function Info() {
    await axios
      .get(`/api/v1/chat/${roomId}`, {
        headers: {
          Authorization: `Bearer ${acToken}`,
        },
      })
      .then((res) => {
        setRoomName(res.data.result.roomName);
        setMessageList(res.data.result.messageList.contents);
        setRMessageList(messageList.reverse());
        const temp = JSON.stringify(res.data.result.messageList);
        const contents = JSON.parse(temp);
        console.log(roomId);
        console.log(messageList);

        console.log(contents.contents.type);
        if (contents.contents.length === 0) {
          //입장 메시지 보내기
          client.current.publish({
            destination: "/pub/chat.enter." + roomId,
            body: JSON.stringify({ type: "JOIN", sender: userName }),
          });
        } else {
          for (var i = 0; i < contents.length; i++) {
            const arrs = JSON.parse(JSON.stringify(contents[i]));
            console.log(arrs.data);
          }
        }
      })
      .catch((error) => {
        console.log("실패");
        console.log(error);
      });
  }

  useEffect(() => {
    connect();
    getMember();

    return () => disconnect();
  }, []);

  const connect = () => {
    client.current = new StompJs.Client({
      //brokerURL: "http://3.38.7.238:8080/ws", // 웹소켓 서버로 직접 접속
      webSocketFactory: () => new SockJs("http://3.38.7.238:8080/ws"), // proxy를 통한 접속
      connectHeaders: {
        Authorization: `Bearer ${acToken}`,
        roomId,
      },
      debug: function (str) {
        //console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,

      onConnect: () => {
        Info();

        subscribe();
        console.log("연결ㄹㄹ");
      },
      onStompError: (frame) => {
        console.error(frame);
      },
    });
    client.current.activate();
  };

  const disconnect = () => {
    client.current.deactivate();
  };

  const subscribe = () => {
    client.current.subscribe(`/topic/room.` + roomId, (chat) => {
      setChatList((chatList) => [...chatList, JSON.parse(chat.body)]);
      var content = JSON.parse(chat.body);

      console.log(chatList);
    });
  };

  const publish = async (e) => {
    setDisabled(true);
    e.preventDefault();
    if (!client.current.connected) {
      return;
    }

    await new Promise((r) => setTimeout(r, 800)); //1초 지연시킴
    client.current.publish({
      destination: "/pub/chat.message." + roomId,
      body: JSON.stringify({ sender: userName, data: text, type: "CHAT" }),
    });

    setText("");
    setDisabled(false);
  };

  const onInfo = (e) => {
    Info();
  };
  const onChangeMsg = (e) => {
    e.preventDefault();
    setText(e.target.value);
  };

  console.log(chatList);
  NewMsg = (
    <div>
      {chatList.map((ch, idx) =>
        ch.type === "CHAT" ? (
          ch.sender === userName ? (
            <MessageBox
              key={ch.createdAt}
              position={"right"}
              type={"text"}
              text={ch.data}
              title={ch.sender}
            />
          ) : (
            <MessageBox
              position={"left"}
              type={"text"}
              text={ch.data}
              title={ch.sender}
            />
          )
        ) : (
          <SystemMessage text={ch.data} />
        )
      )}
    </div>
  );

  BeforeMsg = (
    <div>
      {RMessageList.map((ml) =>
        ml.type === "CHAT" ? (
          ml.sender === userName ? (
            <MessageBox
              position={"right"}
              type={"text"}
              text={ml.data}
              title={ml.sender}
            />
          ) : (
            <MessageBox
              position={"left"}
              type={"text"}
              text={ml.data}
              title={ml.sender}
              date
            />
          )
        ) : (
          <SystemMessage text={ml.data} />
        )
      )}
    </div>
  );
  return (
    <div
      style={{
        marginRight: "500px",
        marginLeft: "500px",
        paddingBottom: "70px",
      }}
    >
      <Button onClick={onInfo}></Button>
      <h1>{content.sender}</h1>
      <Navbar
        left={
          <div>
            <p
              style={{
                fontWeight: "bold",
                marginTop: "20px",
                color: "navy",
                fontSize: "17px",
              }}
            >
              {roomName}
            </p>
          </div>
        }
        // center={<div>{userName}님 환영합니다.</div>}
        right={<div></div>}
      />
      <br />
      <div>
        {BeforeMsg}
        {NewMsg}
      </div>

      <form
        onSubmit={publish}
        style={{
          position: "fixed",
          bottom: "0",
          width: "100vw",
        }}
      >
        <input
          placeholder="메시지를 입력하세요!"
          onChange={onChangeMsg}
          type="text"
          value={text}
          style={{ width: "45vw", fontSize: "16px", height: "60px" }}
        />
        <button type="submit" style={{ height: "60px" }} disabled={disabled}>
          전송
        </button>
      </form>
    </div>
  );
};
export default ChatPage;
