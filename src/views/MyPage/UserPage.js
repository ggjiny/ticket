import React, { useState, useEffect } from "react";
import UserCalendar from "./UserCalendar";
import Header from "../Header/Header";
import axios from "axios";
import { useNavigate, useLocation } from "react-router";
import "./MyPage.css";
import UserReview from "../ReviewPage/UserReview";
import Footer from "../Footer/Footer";
const acToken = sessionStorage.getItem("accesstoken");

function UserPage() {
  const location = useLocation();
  const memberid = location.state.id;

  const [data, setData] = useState([]);
  const [select, setSelect] = useState("Calendar");

  const baseUrl = "/api/v1/member/" + memberid;

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
      })
      .catch((error) => {
        alert("입력이 잘못 되었습니다.");
        console.log(error);
      }); //실패했을 때
  }
  useEffect(() => {
    getInfo();
  }, []);

  return (
    <>
      <Header />
      <div className="container">
        <div className="left_box" style={{ marginBottom: "-600px" }}>
          <section
            className="info"
            style={{ boxShadow: "2px 2px 2px 2px #ddd" }}
          >
            <img src={data.imgUrl} style={{ borderRadius: "70%" }} />
            <h2>{data.username}</h2>
            <h1>{data.email}</h1>
            <h1>{data.phoneNumber}</h1>
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
                    padding: "10px",
                    paddingTop: "2px",
                    border: "1px solid #ccc",
                    borderRadius: "20px",
                  }}
                >
                  <p># {keyword} </p>
                </div>
              ))}
          </section>
          <section className="buttons">
            <button
              style={{ marginRight: "20px" }}
              onClick={() => setSelect("Calendar")}
            >
              포토 캘린더
            </button>
            <button onClick={() => setSelect("Review")}>후기</button>
          </section>
        </div>
        {select === "Review" ? (
          <div
            style={{
              marginLeft: "400px",
            }}
          >
            <UserReview memberId={memberid} />
          </div>
        ) : (
          <div>
            <UserCalendar memberId={memberid} />
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
export default UserPage;
