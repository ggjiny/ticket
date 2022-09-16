import React, { useState } from "react";
import styled from "styled-components";

const Score = () => {
  const [hovered, setHovered] = useState(null);
  const [clicked, setClicked] = useState(null);

  const goToFetch = (e) => {
    setClicked(e.target.id);
    fetch(`http://10.58.3.24:8000/products/1`, {
      //사용할 http 메소드
      method: "POST",
      //토큰
      headers: {
        Authorization:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxfQ.loTjeBWZ9SeXV-BcIxqOtX37AN30ROvsZl0_udeeRJU",
      },
      //서버에 보낼 데이터 (별점)
      body: JSON.stringify({
        rating: e.target.id,
      }),
    });
  };

  return (
    <ReviewBox>
      <ReviewTextBox>
        <p>이 책을 평가해주세요!</p>
        {[1, 2, 3, 4, 5].map((num) => (
          //show ={호버한 인덱스와 텍스트 인덱스가 같으면 화면에 나타내기}
          //맵 인덱스와 textList인덱스 차이가 나서 -1을 해준다
          <HiddenText key={num} show={hovered === num}>
            {textList[num - 1]}
          </HiddenText>
        ))}
      </ReviewTextBox>
      <StarContainer>
        {[1, 2, 3, 4, 5].map(
          (
            el //별 아이콘 다섯개 만들기
          ) => (
            <i //className에 조건문 넣기
              className={`fas fa-star ${
                //el만큼 클릭하거나 el만큼 호버를 하면 yellowStar 클래스를 실행
                (clicked >= el) | (hovered >= el) && "yellowStar"
              }`}
              key={el} //1,2,3,4,5
              onMouseEnter={() => setHovered(el)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setClicked(el)}
            />
          )
        )}
      </StarContainer>
    </ReviewBox>
  );
};

export default Score;

//style-component 사용
const textList = [
  "별로에요",
  "그저 그래요",
  "보통이에요",
  "좋아요",
  "최고예요",
];

const ReviewBox = styled.div`
  padding: 30px;
  color: #999;
  font-size: 20px;

  i {
    margin: 20px 10px 20px 0;
    opacity: 0.1;
    cursor: pointer;
    font-size: 50px;
  }

  .yellowStar {
    color: orange;
    opacity: 1;
  }
`;

const ReviewTextBox = styled.div`
  position: relative;
  text-align: center;
  padding-bottom: 50px;
`;

const StarContainer = styled.div`
  text-align: center;
  border: none;
  background-color: white;
`;

const HiddenText = styled.p`
  position: absolute;
  top: 50px;
  left: 50%;
  width: 130px;
  height: 30px;
  padding-top: 7px;
  transform: translate(-50%, -50%);
  color: white;
  background-color: #1f8ce6;
  border-radius: 4px;
  font-size: 16px;

  ${({ show }) => (show ? `display:block` : `display: none`)}
`;
