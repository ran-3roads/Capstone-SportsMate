import Head from "next/head";
import Link from "next/link";
import { Container, Row, Col, Button } from "reactstrap";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

var secretKey = "test_sk_JQbgMGZzorzwlMpMwxk8l5E1em4d";

export default function Success() {
  const router = useRouter();
  const { orderId, paymentKey, amount } = router.query;
  useEffect(() => {
    if (!router.isReady) return;
    axios
      .post(
        `https://api.tosspayments.com/v1/payments/${paymentKey}`,
        {
          orderId: orderId,
          amount: amount,
        },
        {
          headers: {
            Authorization: `Basic ${Buffer.from(secretKey + ":").toString(
              "base64"
            )}`,
            "Content-Type": `application/json`,
          },
          responseType: "json",
        }
      )
      .then(function (response) {
        return axios.post("/member/deposit", {
          credit: response.data.totalAmount,
        });
      })
      .then(function (response) {
        alert(`포인트 충전완료`); // 나중에 금액 바꿀때 바꾸는걸로
        location.href = "/mypage";
      })
      .catch((error) => {
        console.log(error);
      });
  }, [router.isReady]);
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
      <div className="my_box">
        <div className="my_boxc">
          <div className="left_section">
            <div className="p_image"></div>
            <div className="inf_name">
              <div className="my_font">님</div>
            </div>
            <div className="since_date">
              <div className="my_font">가입일</div>
            </div>
            <div className="inf_name">
              <div className="my_font">포인트</div>
            </div>
            <div className="left_buttons">
              <div className="logout_button">
                <div className="my_font">정보수정</div>
              </div>
              <div className="logout_button">
                <div className="my_font">로그아웃</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Row className="justify-content-center">
        <Col lg="8" md="6" className="align-self-center text-center">
          <Button className="btn btn-danger m-t-30 btn-info-gradiant font-14">
            My Party 목록
          </Button>
          <Button className="btn btn-danger m-t-30 btn-info-gradiant font-14">
            My 경기 목록
          </Button>
          <br />
          <a className="btn btn-warning m-r-10 btn-md m-t-20">포인트충전</a>
        </Col>
      </Row>
    </div>
  );
}
