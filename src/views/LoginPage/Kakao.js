import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useLocation } from "react-router";
import { Button, Input, Form, Radio } from "antd";
import Header from "../Header/Header";
import qs from "query-string";
import axios from "axios";

import { KAKAO_AUTH_URL } from "../../component/OAuth";
import { ConsoleSqlOutlined } from "@ant-design/icons";

const Kakao = (props) => {
  const [nickname, setNickname] = useState("");
  const [phone, setPhone] = useState("");
  const [value, setValue] = useState("");
  const [keywords, setKeywords] = useState([]);
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  const searchParams = useLocation().search;
  const query = qs.parse(searchParams);

  const accessToken = new URLSearchParams(searchParams).get("token");

  sessionStorage.setItem("accesstoken", accessToken);

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

  const acToken = sessionStorage.getItem("accesstoken");
  console.log(acToken);

  const [checkedInputs, setCheckedInputs] = useState([]);

  const changeHandler = (checked, id) => {
    if (checked === true) {
      setCheckedInputs([...checkedInputs, id]);
    } else if (checked === false) {
      // 체크 해제
      setCheckedInputs(checkedInputs.filter((element) => element !== id));
    }
    console.log(checked, id);
    console.log(checkedInputs);
    setKeywords(...keywords, ...checkedInputs);
  };

  const onChangeNickname = useCallback((e) => {
    setNickname(e.target.value);
  }, []);

  const onChangePhone = useCallback((e) => {
    setPhone(e.target.value);
  }, []);

  const data = {
    nickname: nickname,
    phoneNumber: phone,
    keywords: checkedInputs,
  };

  // const onClickHandler = (e) => {
  //   if (data.keywords.length === 0) {
  //     alert("키워드를 체크해주세요.");
  //   }
  // else if (data.nickname == "") {
  //   alert("닉네임을 입력해주세요");
  // } else if (data.phoneNumber == "") {
  //   alert("전화번호를 입력헤주세요");
  // } else {
  //   //onSubmit();
  // }
  //};

  const baseUrl = "/api/v1/member";

  async function getMember() {
    await axios
      .get(baseUrl, {
        headers: {
          Authorization: `Bearer ${acToken}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        //setUserName(res.data.result.username);
        window.location.replace("/");
      })
      .catch((error) => {
        alert(error.response.data.errorMessage);
      }); //실패했을 때
  }

  useEffect(() => {
    getMember();
  }, []);

  // if (userName.length >0) {
  //   alert("유저정보가 이미 존재합니다.");
  //   navigate("/");
  // }

  async function postMember() {
    console.log(data);
    await axios
      .post(baseUrl, data, {
        headers: {
          Authorization: `Bearer ${acToken}`,
        },
      })
      .then((response) => {
        if (
          response.data.result !== "undefined" &&
          response.data.result !== null
        ) {
          alert(response.data.message);
          window.location.replace("/");
        }
      })
      .catch((error) => {
        alert(error.response.data.errorMessage);
      }); //실패했을 때
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.keywords.length === 0) {
      alert("키워드를 체크해주세요.");
    } else {
      console.log(value);
      postMember();
    }
  };

  return (
    <>
      <Header />
      <center>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              name="콘서트"
              id={"CONCERT"}
              type="checkbox"
              onChange={(e) => {
                changeHandler(e.currentTarget.checked, "CONCERT");
              }}
              checked={checkedInputs.includes("CONCERT") ? true : false}
            />
            <label>콘서트</label>
            <input
              id={"MUSICAL"}
              type="checkbox"
              onChange={(e) => {
                changeHandler(e.currentTarget.checked, "MUSICAL");
              }}
              checked={checkedInputs.includes("MUSICAL") ? true : false}
            />
            <label margin="30px">뮤지컬</label>
            <input
              id={"CLASSIC"}
              type="checkbox"
              onChange={(e) => {
                changeHandler(e.currentTarget.checked, "CLASSIC");
              }}
              checked={checkedInputs.includes("CLASSIC") ? true : false}
            />
            <label>클래식</label>
            <input
              id={"EXHIBITION"}
              type="checkbox"
              onChange={(e) => {
                changeHandler(e.currentTarget.checked, "EXHIBITION");
              }}
              checked={checkedInputs.includes("EXHIBITION") ? true : false}
            />
            <label>전시회</label>
          </div>
          <div style={ButtonStyle}>
            <label htmlFor="user-nickname">닉네임</label>
            <br />
            <Input
              type="string"
              value={nickname}
              onChange={onChangeNickname}
              style={InputStyle}
              required
            />
          </div>
          {/* <div style={ButtonStyle}>
            <label htmlFor="user-nickname">전화번호</label>
            <br />
            <Input
              type="string"
              value={phone}
              onChange={onChangePhone}
              style={InputStyle}
              required
            />
          </div> */}
          <div style={ButtonStyle}>
            <button type="submit">정보 등록하기</button>
          </div>
        </form>
      </center>
    </>
  );
};

export default Kakao;
