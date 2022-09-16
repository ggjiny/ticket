import Parts from "./Components/Parts";
import "./Components/PartsRecruit";
import "./PartsList.css";
import axios from "axios";
import { useState, useEffect } from "react";

const acToken = sessionStorage.getItem("accesstoken");

function MyPartsList(props) {
  const { cultureId, imgUrl, name, open, close, header } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [parts, setParts] = useState([]);

  const handleModal = () => {
    setModalOpen(!modalOpen);
  };

  const partsUrl = "/api/v1/parts/";

  //팟 가져오기
  useEffect(() => {
    getMyParts();
  }, [open]);

  async function getMyParts() {
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
        console.log(response.data.result);
      })
      .catch((error) => {
        console.log(error.response.data.errorMessage);
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
                        getParts={getMyParts}
                      />
                    </div>
                  ))}
                </>
              ) : (
                <div>
                  <h2>팟이 존재하지 않습니다.</h2>
                </div>
              )}
            </div>
          </main>
        </section>
      ) : null}
    </div>
  );
}
export default MyPartsList;
