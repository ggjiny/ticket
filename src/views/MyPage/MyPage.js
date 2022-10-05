import React, { useState, useEffect } from "react";
import Calendar from "./Calendar";
import Header from "../Header/Header";
import axios from "axios";
import { FormOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router";
import "./MyPage.css";
import MyReview from "../ReviewPage/MyReview";
import MyPartsList from "../PartsPage/MyPartsList";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
const acToken = sessionStorage.getItem("accesstoken");

function MyPage() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [select, setSelect] = useState("Calendar");

  const [modalOpen2, setModalOpen2] = useState(false);

  const handleModal2 = () => {
    setModalOpen2(!modalOpen2);
  };

  const baseUrl = "/api/v1/member";

  async function getInfo() {
    //사용자 정보 받아오기
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
        ) {
          console.log(response.data.result);
          setData(response.data.result);
        }
        //console.log("success!");
      })
      .catch((error) => {
        alert(error.response.data.errorMessage);
      }); //실패했을 때
  }
  useEffect(() => {
    getInfo();
  }, []);

  return (
    <>
      <div>
        <Header />
        <div className="container">
          <div className="left_box" style={{ marginBottom: "-600px" }}>
            <section
              className="info"
              style={{ boxShadow: "2px 2px 2px 2px #ddd" }}
            >
              <img
                src={data.imgUrl}
                style={{ borderRadius: "70%", marginBottom: "10px" }}
              />
              <h2>{data.username}</h2>

              <h1>{data.email}</h1>

              <button
                style={{ border: "0px" }}
                onClick={() => console.log("hii")}
              >
                개인정보 수정📝
              </button>

              {/* <h1>{data.phoneNumber}</h1> */}
            </section>
            <section
              className="keywords"
              style={{ boxShadow: "2px 2px 2px 2px #ddd" }}
            >
              {data.keywords &&
                data.keywords.map((keyword) => (
                  <div
                    key={keyword}
                    style={{
                      marginRight: "5px",
                      backgroundColor: "#fff",
                      padding: "12px",
                      paddingTop: "7px",
                      border: "1px solid #ccc",
                      borderRadius: "20px",
                      fontSize: "14px",
                      width: "fit-content",
                    }}
                  >
                    <p>#{keyword} </p>
                  </div>
                ))}
            </section>
            <section>
              <button className="buttons" onClick={() => setSelect("Calendar")}>
                포토 캘린더
              </button>
              <button className="buttons" onClick={() => setSelect("Review")}>
                후기
              </button>
              <button
                className="buttons"
                onClick={() => navigate("/interwork")}
              >
                티켓 연동
              </button>
              <button className="buttons" onClick={() => handleModal2()}>
                팟 참여 목록
              </button>
              <MyPartsList
                open={modalOpen2}
                close={handleModal2}
                header="나의 팟 목록"
              />
            </section>
          </div>
          {select === "Review" ? (
            <div
              style={{
                marginLeft: "400px",
              }}
            >
              <MyReview />
            </div>
          ) : (
            <>
              <Calendar />
              <p
                style={{
                  marginTop: "-130px",
                  marginLeft: "10px",
                  marginBottom: "200px",
                  fontSize: "18px",
                  color: "gray",
                }}
              >
                원하는 날짜를 선택하고 포스터를 추가하세요.
              </p>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
export default MyPage;
