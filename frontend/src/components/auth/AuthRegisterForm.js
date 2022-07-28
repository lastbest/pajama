import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Button from "../common/Button";
import axios from "axios";

const AuthFormBlock = styled.div`
  h3 {
    margin: 0;
    color: black;
    margin-bottom: 1rem;
    font-family:"star";
  }
`;

const StyledInput = styled.input`
  border-radius: 10px;
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid #ffe9ef;
  padding-top: 0.7rem;
  padding-bottom: 0.7rem;
  outline: none;
  width: 100%;
  display: flex;

  &:focus {
    color: $oc-teal-7;
    border-bottom: 1px solid #fd7a99;
  }
  & + & {
    margin-top: 1rem;
  }
`;

const Footer = styled.div`
    display: felx;
    justify-content: center;
    margin-top: 1rem;
    a {
        color : #9D9D9D;
        text-decoration: none;
        &:hover{
            color: #FD7A99}
        }

    }
    .link {
      margin-right: 5px;
      margin-left: 5px;
    }
    span {
      color : #9D9D9D;
    }

`;

const ButtonWithMarinTop = styled(Button)`
  margin-top: 1rem;
`;

const AuthRegisterForm = () => {
  let [credentials, setCredentials] = useState({
    email: "",
    tel: "",
    pwd: "",
    nickname: "",
    name: ""
  });
  let [password1, setPassword1] = useState("");
  let [password2, setPassword2] = useState("");
  let [tel, setTel] = useState("");
  let [userEmail, setUserEmail] = useState("");
  let [userName, setUserName] = useState("");
  let [userNickname, setUserNickname] = useState("");
  function onSubmit(e) {
    e.preventDefault();
    if (password2 === password1) {
      if (password1.length < 6 || password1.length > 16) {
        alert("비밀번호는 6~16자리로 설정해야 합니다.");
      } else {
        let countNum = 0;
        let countEng = 0;
        let i = 0;
        for (i = 0; i < password1.length; i++) {
          if (password1.charAt(i) >= "A" && password1.charAt(i) <= "z") {
            countEng++;
          } else if (password1.charAt(i) >= "0" && password1.charAt(i) <= "9") {
            countNum++;
          }
        }
        if (countEng === 0 || countNum === 0) {
          alert("비밀번호는 숫자와 영문자를 혼용하여야 합니다.");
        } else {
          setCredentials(
            (credentials.email = userEmail),
            (credentials.pwd = password1),
            (credentials.name = userName),
            (credentials.nickname = userNickname),
            (credentials.tel = tel)
          );
          axios({
            url: "http://localhost:8080/users",
            method: "post",
            data: credentials
          })
            .then((res) => {
              if (res.data.result === 'success') {
                window.alert('회원가입 성공')
                document.location.href="/"
              } else {
                window.alert('이미 존재하는 이메일입니다.')
                document.location.href="/register"

              }
            })
            .catch(() => {
              console.log("회원가입 실패");
              alert('회원가입 실패')
              document.location.href="/register"
            });
        }
      }
    } else {
      alert("비밀번호가 일치하지 않습니다.");
      document.location.href="/register"
    }
  }
  return (
    <AuthFormBlock>
      <h3>회원가입</h3>
      <form onSubmit={onSubmit}>
        <StyledInput
          autoComplete="userEmail"
          name="userEmail"
          placeholder=" 이메일"
          type="email"
          onInput={(event) => {
            setUserEmail(event.target.value);
          }}
          required
        />
        <StyledInput
          autoComplete="current-password"
          name="password"
          placeholder=" 비밀번호"
          type="password"
          onInput={(event) => {
            setPassword1(event.target.value);
          }}
          required
        />
        <StyledInput
          autoComplete="new-password"
          name="passwordConfirm"
          placeholder=" 비밀번호 확인"
          type="password"
          onChange={(event) => {
            setPassword2(event.target.value);
          }}
          required
        />
        <StyledInput
          autoComplete="userName"
          name="userName"
          placeholder=" 이름"
          required
          onInput={(event) => {
            setUserName(event.target.value);
          }}
        />
        <StyledInput
          autoComplete="tel"
          name="tel"
          placeholder=" 전화번호"
          onInput={(event) => {
            setTel(event.target.value);
          }}
          required
        />
        <StyledInput
          autoComplete="userNickname"
          name="userNickname"
          placeholder=" 닉네임"
          onInput={(event) => {
            setUserNickname(event.target.value);
          }}
          required
        />
        <ButtonWithMarinTop
          fullWidth
        >
          회원가입
        </ButtonWithMarinTop>
      </form>
      <Footer>
        <Link to="/" className='link'>HOME</Link>
        <span>|</span>
        <Link to="/register" className='link'>회원가입</Link>
        <span>|</span>
        <Link to="/login" className='link'>로그인</Link>
      </Footer>
    </AuthFormBlock>
  );
};

export default AuthRegisterForm;
