import Review from "./Review";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./ReviewHome.css";
import Header from "../Header/Header";
import axios from "axios";
import useDidMountEffect from "./useDidMountEffect";

function Home() {
  const acToken = sessionStorage.getItem("accesstoken");

  const [data, setData] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [reviews, setReviews] = useState([]);

  const location = useLocation();
  const hallId = location.state.hallId;
  console.log(hallId);

  const [search, setSearch] = useState({
    floor: "",
    part: "",
    record: "",
    number: "",
  });
  //const [toggle, setToggle] = useState(false);

  const { floor, part, record, number } = search;
  const searchUrl =
    "/api/v1/reviews/search?hall=" +
    hallId +
    "&floor=" +
    search.floor +
    "&part=" +
    search.part +
    "&record=" +
    search.record +
    "&number=" +
    search.number;

  let deleteUrl = "/api/v1/reviews/delete?hall=" + hallId + "&reviewId="; // + reId;

  //리뷰 가져오기
  useEffect(() => {
    getReview();
  }, []);

  async function getReview() {
    await axios
      .get(searchUrl, {
        headers: {
          Authorization: `Bearer ${acToken}`,
        },
      })
      .then((response) => {
        if (
          response.data.result !== "undefined" &&
          response.data.result !== null
        )
          setReviews(response.data.result);
        console.log(reviews);
      })
      .catch((error) => {
        console.log(error.response.data.errorMessage);
      }); //실패했을 때
  }

  const handleChange = (e) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    });
  };

  //검색
  const handleSubmit = async (e) => {
    setDisabled(true);
    e.preventDefault();

    await new Promise((r) => setTimeout(r, 800)); //1초 지연시킴
    alert("검색합니다");
    setDisabled(false);
    getReview();
  };

  async function deleteReview() {
    await axios
      .delete(deleteUrl)
      .then((response) => {
        if (
          response.data.result !== "undefined" &&
          response.data.result !== null
        ) {
          alert(response.data.message);
          //window.location.replace("/review");
          getReview();
        }
      })
      .catch((error) => {
        console.log(error.response.data.errorMessage);
      }); //실패했을 때
  }

  //삭제
  const reivewDelete = (re) => {
    deleteUrl = deleteUrl + re;
    console.log(deleteUrl);
    deleteReview();
    //setToggle(true);
  };
  return (
    <div style={{ marginBottom: "100px" }}>
      <Header />
      <div className="concertHall">
        <p>{hallId}</p>
      </div>
      <div className="find-seat">
        <ul>
          <form onSubmit={handleSubmit}>
            <li>
              <input
                type="text"
                name="floor"
                value={floor}
                onChange={handleChange}
              ></input>
              <label>층 </label>
            </li>
            <li>
              <input
                type="text"
                name="part"
                value={part}
                onChange={handleChange}
              ></input>
              <label>구역 </label>
            </li>
            <li>
              <input
                type="text"
                name="record"
                value={record}
                onChange={handleChange}
              ></input>
              <label>열 </label>
            </li>
            <li>
              <input
                type="text"
                name="number"
                value={number}
                onChange={handleChange}
              ></input>
              <label>번 </label>
            </li>
            <li>
              <button type="submit" disabled={disabled}>
                검색
              </button>
            </li>
          </form>
        </ul>
      </div>
      {reviews.length > 0 ? (
        <div>
          {reviews.map((item) => (
            <div key={item.reviewId}>
              <Review
                hallId={item.hallId}
                memberId={item.memberId}
                imgUrl={item.imgUrl}
                name={item.name}
                contents={item.contents}
                floor={item.floor}
                part={item.part}
                record={item.record}
                number={item.number}
                starPoint={item.starPoint}
                reviewId={item.reviewId}
              />
              <div className="reviewED">
                <button>수정</button>
                <button onClick={() => reivewDelete(item.reviewId)}>
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ margin: "0 auto", width: "fit-content" }}>
          <h1>등록된 리뷰가 없습니다.</h1>
        </div>
      )}

      <Link
        to={`./register`}
        state={{
          hallId: hallId,
        }}
      >
        <button id="reviewRegister">등록하기</button>
      </Link>
    </div>
  );
}
export default Home;
