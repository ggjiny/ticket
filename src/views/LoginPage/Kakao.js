import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useLocation } from "react-router";
import { Button, Input, Form, Radio } from "antd";
import Header from "../Header/Header";
import qs from "query-string";
import axios from "axios";

import { KAKAO_AUTH_URL } from "../../component/OAuth";
import { ConsoleSqlOutlined } from "@ant-design/icons";
import { Scale } from "@mui/icons-material";
import Footer from "../Footer/Footer";

const Kakao = () => {
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
      width: "300px",
      marginBottom: "10px",
      fontSize: "20px",
    }),
    []
  );
  const KeywordStyle = useMemo(
    () => ({
      transform: "scale(1.5)",
      cursor: "pointer",
      marginRight: "10px",
    }),
    []
  );
  const infoStyle = useMemo(
    () => ({
      width: "200px",
      display: "block",
      fontSize: "19px",
      cursor: "pointer",

      padding: "8px 10px",
      borderRadius: "40px",
      color: "black",
      background: "#f5f5f5",
      border: "solid 1px #ccc",
      boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.25)",
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
        setUserName(res.data.result.username);
        window.location.replace("/");
      })
      .catch((error) => {
        alert(error.response.data.errorMessage);
      }); //실패했을 때
  }

  useEffect(() => {
    getMember();
  }, []);

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
        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: "30px",
            margin: "50px 200px",
            padding: "80px",
          }}
        >
          <h1>정보를 입력해주세요.</h1>
          <hr />
          <h2 style={{ marginTop: "30px", fontWeight: "bold" }}>
            키워드를 선택하세요.
          </h2>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                name="콘서트"
                id={"CONCERT"}
                type="checkbox"
                style={KeywordStyle}
                onChange={(e) => {
                  changeHandler(e.currentTarget.checked, "CONCERT");
                }}
                checked={checkedInputs.includes("CONCERT") ? true : false}
              />
              <label style={{ fontSize: "20px", marginRight: "20px" }}>
                CONCERT
              </label>
              <input
                id={"MUSICAL"}
                type="checkbox"
                style={KeywordStyle}
                onChange={(e) => {
                  changeHandler(e.currentTarget.checked, "MUSICAL");
                }}
                checked={checkedInputs.includes("MUSICAL") ? true : false}
              />
              <label style={{ fontSize: "20px", marginRight: "20px" }}>
                MUSICAL
              </label>
              <input
                id={"CLASSIC"}
                type="checkbox"
                style={KeywordStyle}
                onChange={(e) => {
                  changeHandler(e.currentTarget.checked, "CLASSIC");
                }}
                checked={checkedInputs.includes("CLASSIC") ? true : false}
              />
              <label style={{ fontSize: "20px", marginRight: "20px" }}>
                CLASSIC
              </label>
              <input
                id={"EXHIBITION"}
                type="checkbox"
                style={KeywordStyle}
                onChange={(e) => {
                  changeHandler(e.currentTarget.checked, "EXHIBITION");
                }}
                checked={checkedInputs.includes("EXHIBITION") ? true : false}
              />
              <label style={{ fontSize: "20px", marginRight: "20px" }}>
                EXHIBITION
              </label>
            </div>
            <br />
            <br />

            <div style={ButtonStyle}>
              <h2 style={{ marginTop: "30px", fontWeight: "bold" }}>
                닉네임을 입력하세요.
              </h2>
              {/* <label htmlFor="user-nickname">닉네임</label> */}

              <Input
                type="string"
                value={nickname}
                onChange={onChangeNickname}
                style={InputStyle}
                required
              />
            </div>
            <div>
              <button type="submit" style={infoStyle}>
                정보 등록하기
              </button>
            </div>
          </form>
        </div>
      </center>
      <Footer />
    </>
  );
};

export default Kakao;
