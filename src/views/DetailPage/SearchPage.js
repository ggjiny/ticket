import React, { useMemo, useState, useEffect } from "react";
import { Input, Card, Image, Result, Col, Row, Button } from "antd";
import { useParams, useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import axios from "axios";
import { useRef } from "react";

import { DatabaseOutlined } from "@ant-design/icons";

const { Meta } = Card;

const SearchPage = () => {
  const { inputValue } = useParams();
  const target = useRef();
  const [next, setNext] = useState(false);
  const [page, setPage] = useState(0);
  const [cultures, setCultures] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCultures = async () => {
    await axios
      .get(`/api/v1/culture/search?query=${inputValue}&page=${page}`)
      .then((res) => {
        //setCultures([...cultures, res.data.result.cultures]);
        setCultures(res.data.result.cultures);
        console.log(res.data.result.cultures);
        console.log(`/api/v1/culture/search?query=${inputValue}&page=${page}`);
        setNext(res.data.result.hasNext);
        console.log(next);
      })
      .then(() => setLoading(true))
      .catch((error) => {
        console.log(error.response.data.errorMessage);
      }); //실패했을 때
  };

  //useEffect(() => fetchCultures(), [page]);
  // useEffect(() => {
  //   loadMore();
  // }, [loading]);

  useEffect(() => {
    fetchCultures();
  }, [inputValue, page]);

  const loadMore = () => {
    if (next == true) {
      setPage(page + 1);
      fetchCultures();
    }
  };

  return (
    <>
      {/* HEADER */}
      <Header />
      <div>
        <center>
          <h1> '{inputValue}'에 관한 결과입니다.</h1>
          <hr color="black" width={400} height={250} />
          <div
            className="site-card-wrapper"
            style={{ marginLeft: "0px", marginTop: "20px" }}
          >
            <Row gutter={10}>
              {cultures.map((culture, idx) => (
                <Col
                  span={8}
                  style={{ marginRight: "-200px", marginTop: "20px" }}
                >
                  <Link
                    to={`/detail/${culture.cultureId}`}
                    state={{
                      id: culture.cultureId,
                    }}
                  >
                    <Card
                      style={{ width: 250 }}
                      cover={
                        <img alt={culture.cultureId} src={culture.imgUrl} />
                      }
                    >
                      <Meta
                        title={culture.name}
                        description={culture.hallName}
                      />
                    </Card>
                  </Link>
                </Col>
              ))}
            </Row>
          </div>
        </center>
      </div>
    </>
  );
};
export default SearchPage;
