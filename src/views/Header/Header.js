import React, { useState, useMemo, useEffect } from "react";
import { Input, Button } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import "./Header.css";
import { color } from "@mui/system";
import axios from "axios";
import SearchPage from "../DetailPage/SearchPage";
import Item from "antd/lib/list/Item";
import { KAKAO_AUTH_URL } from "../../component/OAuth";

const { Search } = Input;

const Header = () => {
  const [inputValue, setInputValue] = useState("");
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  let Tokencase = <div></div>;
  const acToken = sessionStorage.getItem("accesstoken");
  // const SearchInput = styled(Input.Search)`
  //   vertical-align: middle;
  // `;

  const onSearch = (e) => {
    setInputValue(e.target.value);
  };

  const onSubmit = (inputValue) => {
    const url = `/search/${inputValue}`;
    navigate(url);
  };

  const ButtonSytle = useMemo(
    () => ({
      float: "right",
      marginTop: "20px",
      marginRight: "20px",
    }),
    []
  );

  const SearchSytle = useMemo(
    () => ({
      marginTop: "20px",
      width: "50%",
      //float : 'right',
    }),
    []
  );

  const SearchArea = useMemo(
    () => ({
      float: "right",
    }),
    []
  );

  if (acToken === null) {
    {
      /*token이 없는 경우*/
    }
    Tokencase = (
      <Button
        href={KAKAO_AUTH_URL}
        style={{
          backgroundColor: "#666666",
          color: "white",
          border: "none",
          fontSize: "18px",
          float: "right",
          marginTop: "20px",
          marginRight: "20px",
        }}
      >
        카카오 로그인
      </Button>
    );
  } else {
    {
      /*token이 존재하는 경우*/
    }
    Tokencase = (
      <Button
        href={"/mypage"}
        style={{
          backgroundColor: "#283858",
          color: "white",
          border: "none",
          fontSize: "18px",
          float: "right",
          marginTop: "20px",
          marginRight: "20px",
        }}
      >
        마이페이지
      </Button>
    );
  }

  return (
    <header>
      <div className="head2"></div>
      <div className="head">
        <div className="headIn">
          <div style={SearchArea}>
            {/* 로그인 안 되어있을 경우, 로그인 / 회원가입 버튼 */}
            {Tokencase}
            {/* 검색 */}
            <Search
              value={inputValue}
              onChange={onSearch}
              placeholder="검색어를 입력하세요."
              onSearch={onSubmit}
              style={SearchSytle}
            />
          </div>
          <br />
        </div>
        <h1
          id="title"
          onClick={() => navigate("/")}
          style={{ textAlign: "center", cursor: "pointer", color: "white" }}
        >
          TICKET TOGETHER
        </h1>
      </div>
    </header>
  );
};

export default Header;

// import React, { useState, useMemo } from "react";
// import { Input, Button } from "antd";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import styled from "styled-components";
// import "./Header.css";
// import { color } from "@mui/system";

// const { Search } = Input;

// const Header = () => {
//   const [searchText, setSearchText] = useState("");
//   const { userData } = useSelector((state) => state.user);
//   const navigate = useNavigate();

//   const onChangeSearchText = (e) => {
//     setSearchText(e.target.value);
//   };

//   // const SearchInput = styled(Input.Search)`
//   //   vertical-align: middle;
//   // `;

//   const onSearch = () => {
//     // Back에 검색 데이터 요청
//     const body = {
//       searchText,
//     };

//     // axios로 백에 데이터 요청해서 처리하기
//     // 받아온 데이터 기반으로 새로운 페이지로 이동하는 방법 추천
//   };

//   const ButtonSytle = useMemo(
//     () => ({
//       float: "right",
//       marginTop: "20px",
//       marginRight: "20px",
//     }),
//     []
//   );

//   const SearchSytle = useMemo(
//     () => ({
//       marginTop: "20px",
//       width: "50%",
//       //float : 'right',
//     }),
//     []
//   );

//   const SearchArea = useMemo(
//     () => ({
//       float: "right",
//     }),
//     []
//   );

//   return (
//     <header>
//       <div className="head2"></div>
//       <div className="head">
//         <div className="headIn">
//           <div style={SearchArea}>
//             {/* 로그인 안 되어있을 경우, 로그인 / 회원가입 버튼 */}
//             {!userData && (
//               <div style={ButtonSytle}>
//                 <Button
//                   onClick={() => navigate("/login")}
//                   style={{
//                     backgroundColor: "#666666",
//                     color: "white",
//                     border: "none",
//                     fontSize: "18px",
//                   }}
//                 >
//                   로그인
//                 </Button>
//                 <Button
//                   onClick={() => navigate("/signup")}
//                   style={{
//                     backgroundColor: "#666666",
//                     color: "white",
//                     border: "none",
//                     fontSize: "18px",
//                   }}
//                 >
//                   회원가입
//                 </Button>
//               </div>
//             )}
//             {/* 검색 */}
//             <Search
//               value={searchText}
//               onChange={onChangeSearchText}
//               placeholder="검색어를 입력하세요."
//               onSearch={onSearch}
//               style={SearchSytle}
//             />
//           </div>
//           <br />
//           {/* 로그인 되어있을 경우, 마이페이지 */}
//           {userData && (
//             <div>
//               <Button>마이페이지</Button>
//             </div>
//           )}
//         </div>
//         <h1
//           id="title"
//           onClick={() => navigate("/")}
//           style={{ textAlign: "center", cursor: "pointer", color: "white" }}
//         >
//           {/* Ticket Together */}
//           TICKET TOGETHER
//         </h1>
//       </div>
//     </header>
//   );
// };

// export default Header;
