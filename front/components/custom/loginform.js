import React from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import { useState } from "react";
import axios from "axios";
import Popup from "./popup";
import Link from "next/link";
const LoginForm = () => {
  const REST_API_KEY = "efb19b8fa4a62908e8d97d87c2f34573";
  const REDIRECT_URI = "http://localhost:3000/auth";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const [mode, setMode] = useState("LOGIN");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [popup, setPopup] = useState({
    open: false,
    title: "",
    message: "",
    callback: false,
  });
  const onchangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onchangePassword = (e) => {
    setPassword(e.target.value);
  };
  let content = null;
  if (mode == "LOGIN") {
    content = (
      <Container>
        <Row>
          <Col md="12">
            <Form
              className="col"
              id="loginForm"
              onSubmit={function (event) {
                event.preventDefault();
                if (event.target.email.value != "") {
                  if (event.target.password.value != "") {
                    axios
                      .post("/member/public/login", {
                        email: event.target.email.value,
                        password: event.target.password.value,
                      })
                      .then(function (response) {
                        if (response.status == 202) {
                          axios.defaults.headers.common["Authorization"] =
                            response.headers.authorization;
                          setPopup({
                            open: true,
                            title: "Confirm",
                            message: "Join Success!",
                            callback: function () {
                              document.location.href = "/";
                            },
                          });
                        }
                      })
                      .catch(function (error) {
                        if (error.response.status == 404) {
                          alert("아이디 혹은 비밀번호가 틀렸습니다");
                        }
                        console.log(error);
                      });
                  } else {
                    alert("비밀번호를 입력하세요");
                  }
                } else {
                  alert("이메일을 입력하세요");
                }
              }}
            >
              <FormGroup className="col-md-6">
                <Label htmlFor="email">Email 아이디</Label>
                <Input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={onchangeEmail}
                />
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label htmlFor="password">비밀번호</Label>
                <Input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={onchangePassword}
                />
              </FormGroup>
              <FormGroup className="col-md-6">
                <Input id="checkbox1" type="checkbox" />
                <Label htmlFor="checkbox1">로그인 상태 유지</Label>
              </FormGroup>
              <FormGroup className="col-md-6">
                <Button
                  type="submit"
                  className="btn btn-success waves-effect waves-light m-r-10"
                >
                  로그인
                </Button>
                <Link href={`/`}>
                  <Button
                    type="reset"
                    className="btn btn-inverse waves-effect waves-light"
                  >
                    취소
                  </Button>
                </Link>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
  return (
    <div>
      <Popup
        open={popup.open}
        setPopup={setPopup}
        message={popup.message}
        title={popup.title}
        callback={popup.callback}
      />
      <div className="spacer" id="forms-component">
        <Container>
          <Row className="justify-content-center">
            <Col md="7" className="text-center">
              <h1 className="title font-bold">로그인</h1>
              <h6 className="subtitle">
                로그인하여 Sports Mate를 이용해보세요
              </h6>
            </Col>
          </Row>
        </Container>
      </div>

      {content}
    </div>
  );
};

export default LoginForm;
