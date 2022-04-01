import React from "react";
import Link from "next/link";
import { Container, Row, Col } from "reactstrap";
import Image from "next/image";
import footballimg from "../../assets/images/landingpage/football.png";
import badmintonimg from "../../assets/images/landingpage/badminton.png";
import basketballimg from "../../assets/images/landingpage/basketball.png";
import tabletennisimg from "../../assets/images/landingpage/tabletennis.png";
import volleyballimg from "../../assets/images/landingpage/volleyball.png";
import wasteimg from "../../assets/images/landingpage/waste.png";

const Banner2 = () => {
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
            <a
              href="https://wrappixel.com/templates/nextkit-nextjs-free-uikit"
              className="btn btn-danger m-r-20 btn-md m-t-30 "
            >
              파티생성하로가기
            </a>
            <Link href="/#coming">
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
                <Image src={tabletennisimg} alt="hero banner" />
                <Image src={wasteimg} alt="hero banner" />
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Banner2;
