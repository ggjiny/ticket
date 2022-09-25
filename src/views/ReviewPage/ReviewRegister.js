import Header from "../Header/Header";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import "./ReviewRegister.css";
import axios from "axios";
import Footer from "../Footer/Footer";

function ReviewRegister() {
  const acToken = sessionStorage.getItem("accesstoken");

  const [value, setValue] = useState({
    starPoint: 5.0,
    contents: "",
    floor: "",
    part: "",
    record: "",
    number: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const hallid = location.state.hallId;

  const { starPoint, contents, floor, part, record, number } = value;

  const baseUrl = "/api/v1/reviews/add?hall=" + hallid;

  async function postReview() {
    await axios
      .post(baseUrl, value, {
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
          navigate(-1);
        }
      })
      .catch((error) => {
        alert(error.response.data.errorMessage);
      }); //실패했을 때
  }

  const handleChange = (e) => {
    if (e.target.name === "starPoint") {
      setValue({
        ...value,
        [e.target.name]: parseFloat(e.target.value),
      });
      console.log(starPoint);
    } else {
      setValue({
        ...value,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(value);
    postReview();
  };

  return (
    <div>
      <Header />
      <div className="register">
        <ul>
          <form onSubmit={handleSubmit}>
            <li>
              <a id="극장">극장</a>
              <p>{hallid}</p>
            </li>

            <li className="find">
              <a id="좌석">좌석</a>

              <input
                type="text"
                name="floor"
                value={floor}
                required
                onChange={handleChange}
              ></input>
              <label>층 </label>

              <input
                type="text"
                name="part"
                value={part}
                required
                onChange={handleChange}
              ></input>
              <label>구역 </label>

              <input
                type="text"
                name="record"
                value={record}
                required
                onChange={handleChange}
              ></input>
              <label>열 </label>

              <input
                type="text"
                name="number"
                value={number}
                required
                onChange={handleChange}
              ></input>
              <label>번 </label>
            </li>

            <li>
              <a id="별점">별점(5.0)</a>
              <input
                type="number"
                max="5"
                min="1"
                step="0.1"
                name="starPoint"
                value={starPoint}
                onChange={handleChange}
                style={{ border: "1.5px solid #999" }}
              ></input>
            </li>
            <li>
              <a id="상세후기">상세후기</a>
              <textarea
                type="text"
                name="contents"
                value={contents}
                required
                cols="57"
                rows="6"
                onChange={handleChange}
                placeholder="상세 후기를 남겨주세요."
                style={{ resize: "none", padding: "7px" }}
              />
            </li>

            <button type="submit">등록하기</button>
          </form>
        </ul>
      </div>
      <Footer />
    </div>
  );
}
export default ReviewRegister;
