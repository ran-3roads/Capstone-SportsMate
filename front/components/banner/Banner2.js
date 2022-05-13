import React from "react";
import Link from "next/link";
import { Container, Row, Col } from "reactstrap";
import Image from "next/image";
import footballimg from "../../assets/images/landingpage/football.png";
import badmintonimg from "../../assets/images/landingpage/badminton.png";
import basketballimg from "../../assets/images/landingpage/basketball.png";
import pingpongimg from "../../assets/images/landingpage/pingpong.png";
import volleyballimg from "../../assets/images/landingpage/valleyball.png";
import wasteimg from "../../assets/images/landingpage/waste.png";
import cookie from 'react-cookies';
import cookies from "next-cookies";
const Banner2 = () => {
  const coa = cookie.loadAll();
  const allCookies = cookies(coa);
  const refreshTokenByCookie = allCookies['refreshToken'];
  let mkpartycontent=null;
  if(refreshTokenByCookie!=undefined){
  mkpartycontent=<Link href="/party/mkparty">
  <a className="btn btn-md m-t-30  btn-outline-light ">
    파티생성하기
  </a>
</Link>
  }
  else{
    mkpartycontent=<a className="btn btn-md m-t-30  btn-outline-light " onClick={(e)=>{
                e.preventDefault();
                alert("로그인후 이용해주세요");
              }}>
                파티생성하기
              </a>
  }

  return (
    <div className="static-slider-head banner2">
      <Container>
        <Row className="">
          <Col lg="6" md="6" className="align-self-center">
            <h1 className="title">
              Sports Mate
            </h1>
            <h4 className="subtitle font-light">
              Sports Mate를 통해
              <br /> 깐부를 찾아보세요
            </h4>
            { mkpartycontent}
            <Link href="/party">
              <a className="btn btn-md m-t-30  btn-outline-light ">
                파티참가하기
              </a>
            </Link>
          </Col>
          <Col lg="6" md="6">
            <Row>
                <Image src={footballimg} alt="hero banner" />
                <Image src={badmintonimg} alt="hero banner" />
                <Image src={basketballimg} alt="hero banner" />
            </Row>
            <Row>
                <Image src={volleyballimg} alt="hero banner" />
                <Image src={pingpongimg} alt="hero banner" />
                <Image src={wasteimg} alt="hero banner" />
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Banner2;
