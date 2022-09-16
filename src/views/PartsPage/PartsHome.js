import axios from "axios";
import { useState, useEffect } from "react";
import PotRecruit from "./Components/PartsRecruit";
import PartsList from "./PartsList";

function PotHome({ cultureId }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const handleModal = () => {
    setModalOpen(!modalOpen);
  };
  const handleModal2 = () => {
    setModalOpen2(!modalOpen2);
  };

  // const partsUrl = "api/v1/parts/" + cultureId;
  // console.log(partsUrl);

  // //리뷰 가져오기
  // useEffect(() => {
  //   getParts();
  // }, []);

  // async function getParts() {
  //   await axios
  //     .get(partsUrl)
  //     .then((response) => {
  //       if (
  //         response.data.result !== "undefined" &&
  //         response.data.result !== null
  //       )
  //         console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     }); //실패했을 때
  // }

  return (
    <div>
      <button onClick={handleModal}>팟 모집</button>
      <PotRecruit open={modalOpen} close={handleModal} header="Pot 모집">
        여기에 글을 써봐용
      </PotRecruit>
      <br />
      <br />
      <button onClick={handleModal2}>팟 목록</button>
      <PartsList open={modalOpen2} close={handleModal2} header="Pot 목록">
        팟목록입니당
      </PartsList>
    </div>
  );
}
export default PotHome;
