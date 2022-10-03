import "./Parts.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Dropdown, Menu, Space } from "antd";
import { UserOutlined, CrownOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

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
  createdAt,
  getParts,
}) {
  const [members, setMembers] = useState([]);
  const [date, setDate] = useState("");
  const [cdate, setCdate] = useState("");
  //const [partCss, setPartCss] = useState("parts");
  let partCss = "parts";
  const acToken = sessionStorage.getItem("accesstoken");

  const baseUrl = `/api/v1/parts/${cultureId}/${partId}/`;

  const secondUrl = `/api/v1/parts/1/${partId}/`;

  const changeDate = () => {
    const year = partDate[0];
    const month = partDate[1] >= 10 ? partDate[1] : `0${partDate[1]}`;
    const day = partDate[2] >= 10 ? partDate[2] : `0${partDate[2]}`;
    setDate(`${year}.${month}.${day}`);
  };

  const changeDate2 = () => {
    const year = createdAt[0];
    const month = createdAt[1] >= 10 ? createdAt[1] : `0${createdAt[1]}`;
    const day = createdAt[2];
    const hour = createdAt[3] < 10 ? `0${createdAt[3]}` : createdAt[3];
    const min = createdAt[4] < 10 ? `0${createdAt[4]}` : createdAt[4];

    setCdate(`${year}.${month}.${day} ${hour}:${min}`);
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
          setMembers(response.data.result);
          changeDate();
          changeDate2();
        }
      })
      .catch((error) => {
        alert(error.response.data.errorMessage);
      }); //실패했을 때
  }
  async function joinParts() {
    //참여하기
    await axios
      .post(baseUrl + "join", "", {
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
        alert(error.response.data.errorMessage);
      }); //실패했을 때
  }
  async function closeParts() {
    //마감하기
    await axios
      .patch(secondUrl + "close", "", {
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
        alert(error.response.data.errorMessage);
      }); //실패했을 때
  }
  async function leaveParts() {
    //나가기
    await axios
      .delete(secondUrl + "leave", {
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
        alert(error.response.data.errorMessage);
      }); //실패했을 때
  }

  //삭제하기
  async function deleteParts() {
    await axios
      .delete(secondUrl, {
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
        alert(error.response.data.errorMessage);
      }); //실패했을 때
  }

  const menu = //모집인원
    (
      <Menu>
        {members.map((item) => (
          <Menu.Item key={item.memberId} style={{ border: "solid 1px #eee" }}>
            <Link
              to={`/userpage/${item.memberId}}`}
              state={{
                id: item.memberId,
              }}
            >
              {item.manager ? <CrownOutlined /> : <UserOutlined />}
              &nbsp;
              {item.memberName}
            </Link>
          </Menu.Item>
        ))}
      </Menu>
    );

  const onClickHandle = (str, func) => {
    if (window.confirm(str)) {
      func();
    }
  };

  let crole = <div></div>;
  const checkRole = () => {
    if (role === "PART_USER") {
      //일반사람
      crole = (
        <>
          {status === "ACTIVE" ? (
            <button
              id="together"
              style={{ width: "120px", marginLeft: "30px" }}
              onClick={() => {
                onClickHandle("팟에 참여하시겠습니까?", joinParts);
              }}
            >
              함께가기
            </button>
          ) : (
            <button
              id="together"
              style={{
                width: "120px",
                marginLeft: "30px",
                backgroundColor: "#767677",
              }}
            >
              마감
            </button>
          )}
        </>
      );
    } else if (role === "PART_MANAGER") {
      //방장
      partCss = "partsMe";
      crole = (
        <>
          {status === "ACTIVE" ? (
            <>
              {members.length > 1 ? (
                <>
                  <button id="chatroom">채팅방</button>
                  <button
                    id="endparts"
                    onClick={() => {
                      onClickHandle("팟을 마감하시겠습니까?", closeParts);
                    }}
                  >
                    마감하기
                  </button>
                </>
              ) : (
                <button
                  id="deleteparts"
                  onClick={() =>
                    onClickHandle("팟을 삭제하시겠습니까?", deleteParts)
                  }
                >
                  삭제하기
                </button>
              )}
            </>
          ) : (
            <button
              id="chatroom"
              style={{ width: "120px", marginLeft: "30px" }}
            >
              채팅방
            </button>
          )}
        </>
      );
    } else if (role === "PART_MEMBER") {
      //멤버
      partCss = "partsIn";
      crole = (
        <>
          {status === "ACTIVE" ? (
            <>
              <button id="chatroom">채팅방</button>
              <button
                id="leaveparts"
                onClick={() =>
                  onClickHandle("팟에서 나가시겠습니까?", leaveParts)
                }
              >
                나가기
              </button>
            </>
          ) : (
            <button
              id="chatroom"
              style={{ width: "120px", marginLeft: "30px" }}
            >
              채팅방
            </button>
          )}
        </>
      );
    }
  };
  checkRole();

  return (
    <div className="partsContainer">
      <div className={partCss}>
        <div className="p_contents">
          <p id="letgo" style={{ fontSize: "19px" }}>
            🎞 {partName}
          </p>
          <p id="description" style={{ fontSize: "16px", marginLeft: "30px" }}>
            {partContent}
          </p>
        </div>

        <br />
        <br />
        <div className="p_explain">
          <p id="concertName">공연명: {cultureName}</p>
          <p id="meetingDate">공연 날짜: {date}</p>
          <p>등록 날짜: {cdate}</p>
        </div>

        {crole}
        <div id="status">
          <Dropdown overlay={menu}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                ▶모집 현황[{currentPartTotal}/{partTotal}]
              </Space>
            </a>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
export default Parts;
