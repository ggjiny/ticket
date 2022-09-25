import "./Review.css";
import { StarFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
function Review({
  hallId,
  memberId,
  hallName,
  name,
  imgUrl,
  contents,
  floor,
  part,
  record,
  number,
  starPoint,
  reviewId,
  createdAt,
}) {
  const [cdate, setCdate] = useState("");
  const changeDate = () => {
    const year = createdAt[0];
    const month = createdAt[1] >= 10 ? createdAt[1] : `0${createdAt[1]}`;
    const day = createdAt[2] >= 10 ? createdAt[2] : `0${createdAt[2]}`;
    const hour = createdAt[3] < 10 ? `0${createdAt[3]}` : createdAt[3];
    const min = createdAt[4] < 10 ? `0${createdAt[4]}` : createdAt[4];

    setCdate(`${year}.${month}.${day} ${hour}:${min}`);
  };
  useEffect(() => {
    if (createdAt) changeDate();
  }, []);

  return (
    <div>
      <div className="reviewBox">
        {imgUrl ? (
          <div>
            <img className="memberImg" src={imgUrl} />
          </div>
        ) : (
          <div className="memberImg"></div>
        )}

        <p id="nickname">
          {hallName ? <p>{hallName}</p> : null}
          {name ? (
            <>
              <Link
                to={`/userpage/${memberId}}`}
                state={{
                  id: memberId,
                }}
              >
                {name}
              </Link>
              {"  "}
            </>
          ) : (
            <a>닉네임</a>
          )}{" "}
          | {floor}층 {part}구역 {record}열 {number}번 &nbsp;&nbsp;&nbsp;&nbsp;
          <StarFilled style={{ color: "#FFCE31" }} />
          &nbsp;{starPoint}
        </p>
        <p id="reviewContent">{contents}</p>
        <p style={{ fontSize: "15px" }}>작성 시간: {cdate}</p>
      </div>
    </div>
  );
}
export default Review;
