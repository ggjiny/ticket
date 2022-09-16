import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useLocation } from "react-router";
import { Button, Input, Form, Image } from "antd";
import Header from "../Header/Header";
import qs from "query-string";

import { KAKAO_AUTH_URL } from "../../component/OAuth";

const About = (props) => {
  const [keyword, setKeyword] = useState("");
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();

  const searchParams = useLocation().search;
  const query = qs.parse(searchParams);

  const accessToken = new URLSearchParams(searchParams).get("token");

  sessionStorage.setItem("accesstoken", accessToken);

  useEffect(() => {
    // axios.post(url, _, {
    //   headers: {
    //     Authorization: `Bearer ${accessToken}`,
    //   },
    // });
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

  const onChangeKeyword = useCallback((e) => {
    setKeyword(e.target.value);
  }, []);

  const onChangeNickname = useCallback((e) => {
    setNickname(e.target.value);
  }, []);

  const onSubmit = (nickname, keyword) => {
    //console.log(keyword, nickname);
    sessionStorage.setItem("keyword", keyword);
    sessionStorage.setItem("nickname", nickname);
    const url = `/`;
    navigate(url);
  };

  return (
    <>
      <Header />
      <center>
        <Form>
          <div style={ButtonStyle}>
            <label htmlFor="user-keyword">키워드</label>
            <br />
            <Input
              name="user-keyword"
              value={keyword}
              onChange={onChangeKeyword}
              style={InputStyle}
              required
            />
          </div>
          <div style={ButtonStyle}>
            <label htmlFor="user-nickname">닉네임</label>
            <br />
            <Input
              name="user-nickname"
              type="nickname"
              value={nickname}
              onChange={onChangeNickname}
              style={InputStyle}
              required
            />
          </div>
          <div style={ButtonStyle}>
            <Button onClick={onSubmit}>정보 등록하기</Button>
          </div>
        </Form>
      </center>
    </>
  );
};

export default About;
