import "./Parts.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Dropdown, Menu, Space } from "antd";
import { UserOutlined, CrownOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import moment from "moment";

function Parts({
  managerId,
  cultureId,
  cultureName,
  partId,
  partName,
  partContent,
  partDate,
  partTotal,
  currentPartTotal,
  status,
  role,
  getParts,
}) {
  const [members, setMembers] = useState([]);
  const [date, setDate] = useState("");
  const acToken = sessionStorage.getItem("accesstoken");

  const baseUrl = `/api/v1/parts/${cultureId}/${partId}/`;

  const changeDate = () => {
    const year = partDate[0];
    const month = partDate[1] >= 10 ? partDate[1] : `0${partDate[1]}`;
    const day = partDate[2];
    setDate(`${year}.${month}.${day}`);
  };

  useEffect(() => {
    getMembers();
  }, []);
  async function getMembers() {
    //모집현황
    await axios
      .get(baseUrl + "member", {
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
          setMembers(response.data.result);
          changeDate();
        }
      })
      .catch((error) => {
        console.log(error.response.data.errorMessage);
      }); //실패했을 때
  }
  async function joinParts() {
    //참여하기
    await axios
      .post(baseUrl + "join", {
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
          getParts();
        }
      })
      .catch((error) => {
        console.log(error.response.data.errorMessage);
      }); //실패했을 때
  }
  async function closeParts() {
    //마감하기
    await axios
      .patch(baseUrl + "close", {
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
          getParts();
        }
      })
      .catch((error) => {
        console.log(error.response.data.errorMessage);
      }); //실패했을 때
  }
  async function leaveParts() {
    //나가기
    await axios
      .delete(baseUrl + "leave", {
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
          getParts();
        }
      })
      .catch((error) => {
        console.log(error.response.data.errorMessage);
      }); //실패했을 때
  }

  //삭제하기
  async function deleteParts() {
    await axios
      .delete(baseUrl, {
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
          getParts();
        }
      })
      .catch((error) => {
        console.log(error.response.data.errorMessage);
      }); //실패했을 때
  }

  const menu = (
    <Menu>
      {members.map((item) => (
        <Menu.Item key={item.memberId} style={{ border: "solid 1px #eee" }}>
          <Link
            // to={`/mypage/${culture.cultureId}`}
            // state={{
            //   id: culture.cultureId,
            // }}
            to={`/mypage/`}
          >
            {item.manager ? <CrownOutlined /> : <UserOutlined />}
            &nbsp;
            {item.memberName}
          </Link>
        </Menu.Item>
      ))}
    </Menu>
  );

  let crole = <div></div>;
  const checkRole = () => {
    if (role === "PART_USER") {
      crole = (
        <button
          id="together"
          style={{ width: "120px", marginLeft: "30px" }}
          onClick={() => joinParts()}
        >
          함께가기
        </button>
      );
    } else if (role === "PART_MANAGER") {
      crole = (
        <>
          <button id="chatroom">채팅방</button>
          {status === "ACTIVE" ? (
            <button
              id="endparts"
              onClick={() => {
                closeParts();
              }}
            >
              마감하기
            </button>
          ) : (
            <button id="deleteparts" onClick={() => deleteParts()}>
              삭제하기
            </button>
          )}
        </>
      );
    } else if (role === "PART_MEMBER") {
      crole = (
        <>
          <button id="chatroom">채팅방</button>
          <button id="leaveparts" onClick={() => leaveParts()}>
            나가기
          </button>
        </>
      );
    }
  };
  checkRole();

  return (
    <div className="parts">
      <div className="p_contents">
        <p id="letgo" style={{ fontSize: "19px" }}>
          🎞 {partName}
        </p>
        <p id="description" style={{ fontSize: "16px", marginLeft: "30px" }}>
          {partContent}
        </p>
      </div>

      <div id="status">
        <Dropdown overlay={menu}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              ▶ 모집 현황 [{currentPartTotal}/{partTotal}]
              {/* <DownOutlined /> */}
            </Space>
          </a>
        </Dropdown>
      </div>

      <div className="p_explain">
        <p id="concertName">• 공연명: {cultureName}</p>
        <p id="meetingDate">• 공연 날짜: {date}</p>
      </div>
      {crole}
    </div>
  );
}
export default Parts;
