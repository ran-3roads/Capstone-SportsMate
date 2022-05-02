import Head from "next/head";
import Link from "next/link";
import { Container, Row, Col, Button } from "reactstrap";
import axios from "axios";
import { useState, useEffect } from "react";
import { loadTossPayments } from '@tosspayments/payment-sdk'
var uuid = require("uuid").v4;

const clientKey = 'test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq'


export default function Mypage() {

  const [my, setMy] = useState({});
  console.log(axios.defaults.headers.common['Authorization']);

  useEffect(() => {
    axios.get(`http://localhost:8080/sportsmate/member/my`)
      .then(function (response) {
          setMy(response.data);
      })
      .catch(function (error) {
        console.log("에러입니뎅");
      });
  }, []);



  return (

    <div className="static-slider-head">

      <Head>
        <title>My</title>
        <meta
          name="description"
          content="The page you are looking for is not found go back to the homepage"
        />
        <link rel="icon" href="/favicon.ico" />

      </Head>
      <div className="font_title">My Information</div>
      <div className="my">
        <div className="my_box">
          <div className="my_boxc">
            <div className="left_section">
              <div className="p_image">
              </div>
              <div className="inf_name"><div className="my_font">{my.nickName} 님</div></div>
              <div className="since_date"><div className="my_font">가입일 {my.sinceDate}</div></div>
              <div className="inf_name"><div className="my_font">포인트 {my.credit}</div></div>
              <div className="left_buttons">
                <div className="logout_button">
                  <div className="my_font">
                    <Link href="/mypage/modify">
                      정보수정
                    </Link>
                  </div>
                </div>
                <div className="logout_button">
                  <div className="my_font">
                    <Link href="/my">
                      로그아웃
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Row className="justify-content-center">
          <Col lg="8" md="6" className="align-self-center text-center">
            <Link href="/party">
              <Button className="btn btn-danger m-t-30 btn-info-gradiant font-14">
                My Party 목록
              </Button>
            </Link>
            <Link href="/mymatch">
              <Button className="btn btn-danger m-t-30 btn-info-gradiant font-14">
                My 경기 목록
              </Button> 
            </Link>
            <Link href="/mymatch">
            <a className="btn btn-warning m-r-10 btn-md m-t-20"  onClick={(event) => {
                event.preventDefault();
                loadTossPayments(clientKey).then(tossPayments => {
                  tossPayments.requestPayment("토스결제", {
                    amount: 5000,
                    orderId: uuid(),
                    orderName: "스포츠 포인트 충전 ",
                    customerName: "송영우 ",
                    successUrl: window.location.origin + "/success",
                    failUrl: window.location.origin + "/fail",
                  });
                })
              }}>포인트충전</a>
            </Link>
          </Col>
        </Row>
      </div>
    </div>
  );
};