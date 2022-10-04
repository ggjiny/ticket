import Parts from "./Components/Parts";
import "./Components/PartsRecruit";
import "./PartsList.css";
import axios from "axios";
import { useState, useEffect } from "react";
import PotRecruit from "./Components/PartsRecruit";
const acToken = sessionStorage.getItem("accesstoken");

function PartsList(props) {
  const { cultureId, imgUrl, name, open, close, header } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [parts, setParts] = useState([]);

  const handleModal = () => {
    setModalOpen(!modalOpen);
  };

  const partsUrl = "/api/v1/parts/" + cultureId;

  //팟 가져오기
  useEffect(() => {
    if (cultureId) {
      getParts();
    }
  }, [open]);

  async function getParts() {
    await axios
      .get(partsUrl, {
        headers: {
          Authorization: `Bearer ${acToken}`,
        },
      })
      .then((response) => {
        if (
          response.data.result !== "undefined" &&
          response.data.result !== null
        )
          setParts(response.data.result);
      })
      .catch((error) => {
        alert(error.response.data.errorMessage);
      }); //실패했을 때
  }

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
            <div className="partss">
              {parts.length > 0 ? (
                <>
                  {parts.map((part) => (
                    <div key={part.partId}>
                      <Parts
                        managerId={part.managerId}
                        cultureId={cultureId}
                        cultureName={part.cultureName}
                        partId={part.partId}
                        partName={part.partName}
                        partContent={part.partContent}
                        partDate={part.partDate}
                        partTotal={part.partTotal}
                        currentPartTotal={part.currentPartTotal}
                        status={part.status}
                        role={part.role}
                        createdAt={part.createdAt}
                        getParts={getParts}
                      />
                    </div>
                  ))}
                </>
              ) : (
                <div>
                  <h2>팟이 존재하지 않습니다.</h2>
                </div>
              )}
              <button id="parts_generate" onClick={handleModal}>
                팟 새로 생성
              </button>
            </div>

            <PotRecruit
              cultureId={cultureId}
              imgUrl={imgUrl}
              name={name}
              open={modalOpen}
              close={handleModal}
              header="팟 모집"
              getParts={getParts}
            >
              여기에 글을 써봐용
            </PotRecruit>
          </main>
          {/* <footer>
            <button className="close" onClick={close}>
              close
            </button>
          </footer> */}
        </section>
      ) : null}
    </div>
  );
}
export default PartsList;
