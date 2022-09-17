import React from "react";
import { Button } from "antd";
import "./Footer.css";

const Footer = () => {
  const moveToTop = () => {
    document.documentElement.scrollTop = 0;
  };

  return (
    <footer>
      <nav>
        <a href="https://github.com/ticket-together" target="_blank">
          Github
        </a>
      </nav>
      <p>
        <span>상명대학교 컴퓨터과학과 캡스톤디자인</span>
        <br />
        <span>FrontEnd: 김예진 ,최아름</span>
        <span>BackEnd: 강세미, 나영현, 임지민</span>
      </p>
      {/* Top 버튼 */}
      <Button
        shape="circle"
        onClick={moveToTop}
        style={{ position: "fixed", bottom: "60px", right: "80px" }}
      >
        ↑
      </Button>
    </footer>
  );
};

export default Footer;
