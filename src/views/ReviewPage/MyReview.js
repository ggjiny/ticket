import Review from "./Review";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./ReviewHome.css";
import Header from "../Header/Header";
import axios from "axios";
import useDidMountEffect from "./useDidMountEffect";
import { ToggleButton } from "@mui/material";

function MyReview() {
  const acToken = sessionStorage.getItem("accesstoken");

  const [reviews, setReviews] = useState([]);
  let hallId = "";

  const [toggle, setToggle] = useState(true);

  const myUrl = "/api/v1/reviews";

  let deleteUrl = "/api/v1/reviews/delete?hall=";

  //리뷰 가져오기
  useEffect(() => {
    getMyReview();
  }, []);

  async function getMyReview() {
    await axios
      .get(myUrl, {
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
        console.log(response.data.result);
        setToggle(true);
      })
      .catch((error) => {
        console.log(error.response.data.errorMessage);
      }); //실패했을 때
  }

  async function deleteReview() {
    await axios
      .delete(deleteUrl, {
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
          //window.location.replace("/review");
          getMyReview();
        }
      })
      .catch((error) => {
        console.log(error.response.data.errorMessage);
      }); //실패했을 때
  }

  //삭제
  const reivewDelete = (reId, reName) => {
    if (window.confirm("리뷰를 삭제하시겠습니까?")) {
      deleteUrl = deleteUrl + reName + "&reviewId=" + reId;
      console.log(deleteUrl);
      deleteReview();
    }
  };

  return (
    <div>
      {toggle > 0 ? (
        <div>
          {reviews.map((review) => (
            <div key={review.reviewId}>
              <Review
                hallName={review.hallName}
                memberId={review.memberId}
                imgUrl={review.imgUrl}
                name={review.name}
                contents={review.contents}
                floor={review.floor}
                part={review.part}
                record={review.record}
                number={review.number}
                starPoint={review.starPoint}
                reviewId={review.reviewId}
                createdAt={review.createdAt}
              />
              <div className="reviewED">
                {/* <button>수정</button> */}
                <button
                  onClick={() => reivewDelete(review.reviewId, review.hallName)}
                >
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
    </div>
  );
}
export default MyReview;
