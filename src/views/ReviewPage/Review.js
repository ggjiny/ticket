import "./Review.css";
import { StarFilled } from "@ant-design/icons";
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
}) {
  return (
    <div>
      <div className="reviewBox">
        {imgUrl ? (
          <div className="memberImg">
            <img src={imgUrl} />
          </div>
        ) : (
          <div className="memberImg"></div>
        )}

        <p id="nickname">
          {hallName ? <p>{hallName}</p> : null}
          {name ? <a>{name}</a> : <a>닉네임</a>} | {floor}층 {part}구역 {record}
          열 {number}번 &nbsp;&nbsp;&nbsp;&nbsp;
          <StarFilled style={{ color: "#FFCE31" }} />
          &nbsp;{starPoint}
        </p>
        <p id="reviewContent">{contents}</p>
      </div>
    </div>
  );
}
export default Review;
