import Review from "./Review";
import { useState, useEffect } from "react";
import "./ReviewHome.css";
import axios from "axios";
import Footer from "../Footer/Footer";

function UserReview(props) {
  const acToken = sessionStorage.getItem("accesstoken");

  const [reviews, setReviews] = useState([]);

  const myUrl = "/api/v1/reviews/" + props.memberId;

  //리뷰 가져오기
  useEffect(() => {
    getUserReview();
  }, []);

  async function getUserReview() {
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
        console.log(reviews);
      })
      .catch((error) => {
        console.log(error.response.data.errorMessage);
      }); //실패했을 때
  }

  return (
    <div>
      {reviews.length > 0 ? (
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
              <div className="reviewED"></div>
            </div>
          ))}
        </div>
      ) : (
        <div
          style={{
            margin: "0 auto",
            width: "fit-content",
            height: "fit-content",
          }}
        >
          <h1>등록된 리뷰가 없습니다.</h1>
        </div>
      )}
    </div>
  );
}
export default UserReview;
