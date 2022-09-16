import React, { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Checkbox, Input, Button } from 'antd';


const SignUpPage = () => {
    const [id, setId] = useState("");
    const [nick, setNick] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [term, setTerm] = useState(false);
    const navigate = useNavigate();

    const onSubmit = () => {};
  
    const onChangeId = e => {
      setId(e.target.value);
    };
  
    const onChangeNick = e => {
      setNick(e.target.value);
    };
  
    const onChangePassword = e => {
      setPassword(e.target.value);
    };
  
    const onChangePasswordCheck = e => {
      setPasswordCheck(e.target.value);
    };
  
    const onChangeTerm = e => {
      setTerm(e.target.value);
    };

    const ButtonStyle = useMemo(() => ({
      cursor : 'pointer',
      margin : '10px',
      marginTop: '10px',
    }), []);

    const InputStyle = useMemo(() =>({
      
      width : '30%',
      marginBottom : '10px',
    }), []); 

  
    return (
      <>
        <center>
          <h1 onClick={() => navigate('/')} style={ButtonStyle} >Ticket Together</h1>
            <Form onSubmit={onSubmit} style={ButtonStyle}>
            <div>
                <label htmlFor="user-id">아이디</label>
                <br />
                <Input name="user-id" value={id} required onChange={onChangeId} style = {InputStyle} />
            </div>
            <div>
                <label htmlFor="user-nick">닉네임</label>
                <br />
                <Input
                name="user-nick"
                value={nick}
                required
                onChange={onChangeNick}
                style={InputStyle}
                />
            </div>
            <div>
                <label htmlFor="user-password">비밀번호</label>
                <br />
                <Input
                name="user-password"
                type="password"
                value={password}
                required
                onChange={onChangePassword}
                style={InputStyle}
                />
            </div>
            <div>
                <label htmlFor="user-password-check">비밀번호체크</label>
                <br />
                <Input
                name="user-password-check"
                type="password"
                value={passwordCheck}
                required
                onChange={onChangePasswordCheck}
                style={InputStyle}
                />
            </div>
            <div>
                <Button type="primary" onClick={() => navigate('/')} >가입하기</Button>{" "}
                {/* // button type="submit"하려면 htmlType="submit"라고해야함 */}
            </div>
            </Form>
        </center>
      </>
    );
  };
  
  export default SignUpPage;