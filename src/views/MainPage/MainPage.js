import React, { useMemo, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

import { Button, Image, Result } from "antd";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { ButtonGroup } from "@mui/material";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const MainPage = () => {
  const [data, setData] = useState([]);
  const [culture, setCulture] = useState([]);
  const [name, setName] = useState("");
  const infoUrl = "/api/v1/member";
  const baseUrl = "/api/v1/tickets/reservation";
  const baseUrl2 = "/api/v1/culture";
  let caro = <div></div>;

  useEffect(() => {
    getInfo();
  }, []);

  async function getInfo() {
    await axios
      .get(infoUrl)
      .then((response) => {
        if (
          response.data.result !== "undefined" &&
          response.data.result !== null
        )
          setName(response.data.result.username);
      })
      .catch((error) => {
        console.log(error);
      }); //실패했을 때
  }

  useEffect(() => {
    getReservation();
  }, []);

  async function getReservation() {
    await axios
      .get(baseUrl)
      .then((response) => {
        if (
          response.data.result !== "undefined" &&
          response.data.result !== null
        )
          setData(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      }); //실패했을 때
  }

  useEffect(() => {
    getCulture();
  }, []);

  async function getCulture() {
    await axios
      .get(baseUrl2)
      .then((response) => {
        if (
          response.data.result !== "undefined" &&
          response.data.result !== null
        )
          setCulture(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      }); //실패했을 때
  }

  if (data.length === 0) {
    {
      /*구매한 공연이 없는 경우*/
    }
    caro = (
      <div>
        <h1>아직 구매한 공연이 없습니다.</h1>
        <Link to={`/interwork`}> 티켓사이트 연동하러 가기!</Link>
      </div>
    );
  } else {
    {
      /*구매정보가 있는 경우 -> 캐러셀*/
    }
    caro = (
      <Carousel
        centerMode={true}
        infinite
        autoPlaySpeed={4000}
        autoPlay
        responsive={responsive}
      >
        {data.map((result) => (
          <center key={result.number}>
            <Link to={`/search/${result.name}`}>
              <Image
                alt="포스터"
                id={result.number}
                src={result.imgUrl}
                width={200}
              />
            </Link>
            {/* <Image id={result.number} src={result.imgUrl} width={200} /> */}
          </center>
        ))}
      </Carousel>
    );
  }

  return (
    <>
      {/* HEADER */}
      <Header />
      <div style={{ marginRight: "280px", marginLeft: "280px" }}>
        <h2>{name ? name + "님이 구매한 공연" : null}</h2>
        {caro};{/* 추천 캐러셀 */}
        <hr />
        <br />
        <h2>{name ? name + "님, " : null}이런 공연은 어때요?</h2>
        <Carousel
          centerMode={true}
          infinite
          autoPlaySpeed={4000}
          autoPlay
          responsive={responsive}
        >
          {culture.map((item) => (
            <center key={item.cultureId}>
              <Link
                to={`/detail/${item.cultureId}`}
                state={{
                  id: item.cultureId,
                }}
              >
                <Image
                  alt="포스터"
                  id={item.cultureId}
                  src={item.imgUrl}
                  width={200}
                />
              </Link>
            </center>
          ))}
        </Carousel>
      </div>
      {/* FOOTER(TOP BUTTON) */}
      <Footer />
    </>
  );
};

export default MainPage;
