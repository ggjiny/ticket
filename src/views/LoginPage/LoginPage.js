// import React, { useState, useCallback, useMemo } from "react";
// import { Button, Input, Form } from "antd";
// import { useNavigate } from "react-router-dom";
// //import Link from 'next/link';
// import styled from "styled-components";

// const LoginPage = () => {
//   const [id, setId] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const onChangeId = useCallback((e) => {
//     setId(e.target.value);
//   }, []);

//   const onChangePassword = useCallback((e) => {
//     setPassword(e.target.value);
//   }, []);

//   const ButtonStyle = useMemo(
//     () => ({
//       cursor: "pointer",
//       margin: "10px",
//       marginTop: "10px",
//     }),
//     []
//   );

//   const InputStyle = useMemo(
//     () => ({
//       width: "30%",
//       marginBottom: "10px",
//     }),
//     []
//   );

//   return (
//     <center>
//       <h1 onClick={() => navigate("/")} style={ButtonStyle}>
//         Ticket Together
//       </h1>
//       <Form>
//         <div style={ButtonStyle}>
//           <label htmlFor="user-id">아이디</label>
//           <br />
//           <Input
//             name="user-id"
//             value={id}
//             onChange={onChangeId}
//             style={InputStyle}
//             required
//           />
//         </div>
//         <div style={ButtonStyle}>
//           <label htmlFor="user-password">비밀번호</label>
//           <br />
//           <Input
//             name="user-password"
//             type="password"
//             value={password}
//             onChange={onChangePassword}
//             style={InputStyle}
//             required
//           />
//         </div>
//         <div style={ButtonStyle}>
//           <Button type="primary" htmlType="submit" loading={false}>
//             로그인
//           </Button>
//           <Button onClick={() => navigate("/signup")}>회원가입</Button>
//         </div>
//       </Form>
//     </center>
//   );
// };

// export default LoginPage;
