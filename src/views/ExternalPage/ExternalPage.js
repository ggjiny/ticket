import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Button, Input, Form } from "antd";
import { useParams, useNavigate } from "react-router";
import { SnippetsTwoTone } from "@ant-design/icons";
import Header from "../Header/Header";
import axios from "axios";

const ExternalPage = () => {
  const { siteName } = useParams();
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const onChangeId = useCallback((e) => {
    setId(e.target.value);
  }, []);

  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const ButtonStyle = useMemo(
    () => ({
      cursor: "pointer",
      margin: "10px",
      marginTop: "10px",
    }),
    []
  );

  const InputStyle = useMemo(
    () => ({
      width: "30%",
      marginBottom: "10px",
    }),
    []
  );
  async function postSite() {
    await axios

      .post(`/api/v1/tickets/site`, {
        id: id,
        password: password,
        ticketSite: siteName,
      })
      .then((res) => {
        alert("등록을 완료했습니다.");
        navigate("/interwork");
      })
      .catch(function (error) {
        console.log("실패");
        console.log(error);
      });
  }
  const onSubmitForm = (e) => {
    //e.preventDefault();
    postSite();
  };

  return (
    <>
      <Header />
      <center>
        <h1>{siteName}</h1>
        <h2>로그인 정보 입력</h2>
        <Form>
          <div style={ButtonStyle}>
            <label htmlFor="user-id">아이디</label>
            <br />
            <Input
              name="user-id"
              value={id}
              onChange={onChangeId}
              style={InputStyle}
              required
            />
          </div>
          <div style={ButtonStyle}>
            <label htmlFor="user-password">비밀번호</label>
            <br />
            <Input
              name="user-password"
              type="password"
              value={password}
              onChange={onChangePassword}
              style={InputStyle}
              required
            />
          </div>
          <div style={ButtonStyle}>
            <Button onClick={onSubmitForm}>등록하기</Button>
          </div>
        </Form>
      </center>
    </>
  );
};

export default ExternalPage;
