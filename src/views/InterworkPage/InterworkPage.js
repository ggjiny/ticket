import React, { Component, useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { AutoComplete, Button, Card, Tooltip, Radio } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { convertLegacyProps } from "antd/lib/button/button";

const InterworkPage = () => {
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [siteId, setSiteId] = useState("");
  const navigate = useNavigate();
  const siteName = "";

  const ButtonStyle = useMemo(
    () => ({
      width: "200px",
      margin: "auto",
      display: "block",
      //padding : '70px',
      marginTop: "30px",
    }),
    []
  );

  useEffect(() => {
    getSiteInfo();
  }, []);

  async function getSiteInfo(siteName) {
    await axios
      .get(`http://3.38.7.238:8080/api/v1/tickets/site/${siteName}`)
      .then((response) => {
        if (
          response.data.result !== "undefined" &&
          response.data.result !== null
        ) {
          setData(response.data.result);
          setSiteId(response.data.result.siteId);
          setId(response.data.result.id);
        }
      })
      .catch((error) => {
        console.log(error);
      }); //실패
  }

  const onclickHandle = (siteName) => {
    getSiteInfo(siteName);
    if (siteId != null && siteId != "undefined") {
      console.log(siteId);
      alert("회원정보가 이미 존재합니다.");
      navigate(`/interwork`);
    } else {
      alert("아이디가 존재하지 않습니다.");
      console.log(siteId);
      navigate(`/external/${siteName}`);
    }
  };

  const onDeleteHandle = (siteName) => {
    getSiteInfo(siteName);
    axios
      .delete(`http://3.38.7.238:8080/api/v1/tickets/site/${id}`)
      .then((res) => {
        alert("유저 정보 삭제에 성공하였습니다.");
        setSiteId(null);
      })
      .catch(function (error) {
        console.log("실패");
        console.log(error);
      });
  };

  // axios.delete(`http://3.38.7.238:8080/api/v1/tickets/site/`, {
  //   headers: {
  //     Authorization: authorizationToken
  //   },
  //   data: {
  //     source: source
  //   }
  // });

  return (
    <>
      {/* HEADER */}
      <Header />
      <center>
        <Button style={{ width: "300px" }}>인터파크</Button>
        <br />
        <Button
          danger
          onClick={(e) => {
            onclickHandle("인터파크", e);
          }}
        >
          인터파크 등록
        </Button>
        <Button
          type="primary"
          onClick={(e) => {
            onDeleteHandle("인터파크", e);
          }}
          ghost
        >
          삭제
        </Button>
        <br />
        <br />
        <Button style={{ width: "300px" }}>11번가</Button>
        <br />
        <Button
          onClick={(e) => {
            onclickHandle("11번가", e);
          }}
          danger
        >
          11번가 등록
        </Button>
        <Button
          type="primary"
          ghost
          onClick={(e) => {
            onDeleteHandle("11번가", e);
          }}
        >
          삭제
        </Button>
        <br />
        <br />
        <Button style={{ width: "300px" }}>멜론티켓</Button>
        <br />
        <Button
          onClick={(e) => {
            onclickHandle("멜론티켓", e);
          }}
          danger
        >
          멜론티켓 등록
        </Button>
        <Button
          type="primary"
          ghost
          onClick={(e) => {
            onDeleteHandle("멜론티켓", e);
          }}
        >
          삭제
        </Button>
      </center>
    </>
  );
};

export default InterworkPage;
