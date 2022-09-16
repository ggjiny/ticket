import "./PartsRecruit.css";
import { useState, useEffect } from "react";
import axios from "axios";

function PotRecruit(props) {
  const [value, setValue] = useState({
    partName: "",
    partContent: "",
    partTotal: 5,
    partDate: "",
  });
  const { cultureId, imgUrl, name, open, close, header, getParts } = props;
  const { partName, partContent, partTotal, partDate } = value;

  const partRUrl = "/api/v1/parts/" + cultureId;

  async function postParts() {
    await axios
      .post(partRUrl, value)
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
        alert("입력이 잘못 되었습니다.");
        console.log(error.response.data.errorMessage);
      }); //실패했을 때
  }

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(value);
    close();
    postParts();
    setValue({
      partName: "",
      partContent: "",
      partTotal: 5,
      partDate: "",
    });
  };

  return (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>
            {header}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main>
            <form onSubmit={handleSubmit}>
              <div id="box">
                <img id="cimg" src={imgUrl} />
              </div>
              <div
                className="input"
                style={{ width: "300px", marginBottom: "-40px" }}
              >
                <ul>
                  <li>
                    <label style={{ marginRight: "15px" }}>공연명</label>
                    <a>{name}</a>
                  </li>

                  <li>
                    <label htmlFor="date">모임 날짜</label>
                    <input
                      type="date"
                      name="partDate"
                      value={partDate}
                      onChange={handleChange}
                      required
                    ></input>
                  </li>
                  <li>
                    <label htmlFor="nofp">모집 인원</label>
                    <select
                      id="nofp"
                      name="partTotal"
                      onChange={handleChange}
                      value={partTotal}
                      required
                    >
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </li>
                </ul>
              </div>
              <div className="input2">
                <ul>
                  <li>
                    <input
                      type="text"
                      id="parts_title"
                      name="partName"
                      placeholder="모집 제목을 입력해주세요."
                      value={partName}
                      required
                      maxLength={12}
                      onChange={handleChange}
                      style={{
                        border: "1px solid #999",
                        borderRadius: "10px",
                        width: "420px",
                        height: "38px",
                        fontSize: "17px",
                        padding: "10px",
                      }}
                    />
                  </li>
                  <li>
                    <textarea
                      type="text"
                      id="context"
                      name="partContent"
                      placeholder="모집 상세정보를 입력해주세요."
                      value={partContent}
                      cols="47"
                      rows="6"
                      required
                      maxLength={28}
                      onChange={handleChange}
                      style={{
                        border: "1px solid #999",
                        borderRadius: "10px",
                        resize: "none",
                        fontSize: "17px",
                        padding: "10px",
                      }}
                    />
                  </li>
                </ul>
              </div>
              <button type="submit" id="parts_register">
                팟 등록
              </button>
            </form>
          </main>
        </section>
      ) : null}
    </div>
  );
}
export default PotRecruit;
