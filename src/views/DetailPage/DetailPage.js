import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router";
import { Button, Card } from "antd";
import Header from "../Header/Header";
import PartsList from "../PartsPage/PartsList";
import moment from "moment";
import Footer from "../Footer/Footer";
const acToken = sessionStorage.getItem("accesstoken");

const DetailPage = () => {
  const { showId } = useParams();
  const navigate = useNavigate();

  const location = useLocation();
  const id = location.state.id;

  const baseUrl = "/api/v1/culture/" + id;

  const [data, setData] = useState([]);
  let date;

  const [sdate, setSdate] = useState("");
  const [edate, setEdate] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);

  const handleModal = () => {
    setModalOpen(!modalOpen);
  };
  const handleModal2 = () => {
    setModalOpen2(!modalOpen2);
  };
  const changeDate = () => {
    date = "" + data.startDate;
    date = date.substring(0, 10);
    date = moment(date, "YYYY-MM-DD").format("YYYY.MM.DD");
    setSdate(date);

    date = "" + data.endDate;
    date = date.substring(0, 10);
    date = moment(date, "YYYY-MM-DD").format("YYYY.MM.DD");
    setEdate(date);
  };

  useEffect(() => {
    changeDate();
  }, [data]);
  useEffect(() => {
    getDetail();
  }, []);

  async function getDetail() {
    await axios
      .get(baseUrl, {
        headers: {
          Authorization: `Bearer ${acToken}`,
        },
      })
      .then((response) => {
        if (
          response.data.result !== "undefined" &&
          response.data.result !== null
        )
          setData(response.data.result);
      })
      .catch((error) => {
        alert(error.response.data.errorMessage);
      }); //실패했을 때
  }

  return (
    <div style={{ textAlign: "center" }}>
      {/* Header */}
      <Header />

      {/* 이미지 캐러셀 */}
      {/* 공연 정보(공연명, 카테고리, 공연 날짜) */}
      <Card>
        <img
          src={data.imgUrl}
          style={{ height: "300px", marginBottom: "20px" }}
        />
        <div
          style={{
            textAlign: "left",
            width: "fit-content",
            margin: "0 auto",
          }}
        >
          <h3>공연명 : {data.name}</h3>
          <h3>카테고리 : {data.keyword}</h3>
          <h3>
            공연날짜 : {sdate} {sdate === edate ? null : `- ${edate}`}
          </h3>
          <h3>공연장 : {data.hallName}</h3>
        </div>
      </Card>
      {/* 팟 목록 조회 버튼 */}

      <Button
        style={{
          fontSize: "20px",
          height: "50px",
          borderRadius: "30px",
          marginRight: "20px",
          width: "180px",
        }}
        onClick={handleModal2}
      >
        팟 목록 조회
      </Button>
      <PartsList
        cultureId={data.cultureId}
        imgUrl={data.imgUrl}
        name={data.name}
        open={modalOpen2}
        close={handleModal2}
        header="팟 목록"
      >
        팟목록입니당
      </PartsList>
      {/* 후기 버튼 */}
      <Button
        style={{
          fontSize: "20px",
          height: "50px",
          borderRadius: "30px",
          width: "180px",
        }}
        onClick={() =>
          navigate("/review", { state: { hallId: data.hallName } })
        }
      >
        후기
      </Button>
      <Footer />
    </div>
  );
};

export default DetailPage;
