/* global kakao */
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
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Popup from "./popup";
import Image from "next/image";
import mapimg from "../../assets/images/landingpage/mapimg.png";
import { useRouter } from "next/router";
import Link from "next/link";

const recruitinfo = {
  title: "성풋모",
  sportsName: "풋살",
  date: "2022-4-5",
  num: "2",
  location: "성북구",
  infoimg: mapimg,
};
const request = {
  contents: "",
};

const MymatchInfoForm = () => {
  const router = useRouter();
  const { id } = router.query;

  const [mymatchs, setMymatchs] = useState({});

  const container = useRef();
  const [kakaoMap, setKakaoMap] = useState(null);
  const [, setMarkers] = useState([]);

  useEffect(() => {
    if (!router.isReady) return;
    axios
      .get(`/match/myMatch/${id}`)
      .then(function (response) {
        if (response.status == 200) {
          console.log(response.data);
          setMymatchs(response.data);
          return response.data;
        }
      })
      .then((data) => {
        const script = document.createElement("script");
        script.src =
          "https://dapi.kakao.com/v2/maps/sdk.js?appkey=3dbb4a851361084c24a23040d0abd3c6&autoload=false";
        document.head.appendChild(script);

        script.onload = () => {
          kakao.maps.load(() => {
            const center = new kakao.maps.LatLng(data.mapX, data.mapY);
            const options = {
              center,
              level: 3,
            };
            const map = new kakao.maps.Map(container.current, options);
            setKakaoMap(map);
          });
        };
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [router.isReady]);
  useEffect(() => {
    if (kakaoMap === null) {
      return;
    }

    // save center position
    const center = kakaoMap.getCenter();

    // relayout and...
    kakaoMap.relayout();
    // restore
    kakaoMap.setCenter(center);
    let marker = new kakao.maps.Marker({
      position: center,
    });
    marker.setMap(kakaoMap);
  }, [kakaoMap]);

  const [popup, setPopup] = useState({
    open: false,
    title: "",
    message: "",
    callback: false,
  });

  let sportsname = undefined;
  if (mymatchs.sportsName == "FOOTBALL") sportsname = "풋볼";
  else if (mymatchs.sportsName == "VALLEYBALL") sportsname = "배구";
  else if (mymatchs.sportsName == "BASKETBALL") sportsname = "농구";
  else if (mymatchs.sportsName == "PINGPONG") sportsname = "탁구";
  else if (mymatchs.sportsName == "SOCCER") sportsname = "축구";
  else if (mymatchs.sportsName == "BADMINTON") sportsname = "배드민턴";

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
              <h1 className="title font-bold">My Match</h1>
              <h6 className="subtitle">나의 경기 정보를 확인하세요</h6>
            </Col>
          </Row>
        </Container>
      </div>
      <Container>
        <Row>
          <Col md="12">
            <Form className="col" id="matchinfoForm">
              <FormGroup className="col-md-6">
                <Label htmlFor="title">모임 이름: {mymatchs.title}</Label>
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label htmlFor="sprotsName">종목: {sportsname}</Label>
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label htmlFor="members">인원: {mymatchs.maxMember}명</Label>
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label htmlFor="members">비용: {mymatchs.credit}원</Label>
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label htmlFor="sincedate">날짜: {mymatchs.day}</Label>
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label htmlFor="sincedate">경기 시간: {mymatchs.time}</Label>
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label htmlFor="location">
                  경기장 이름: {mymatchs.arenaName}
                </Label>
                <span className="mInner">
                  <div
                    id="container"
                    ref={container}
                    style={{ width: "500px", height: "400px" }}
                  />
                </span>
              </FormGroup>
              <FormGroup className="col-md-6">
                <Link href={`/mymatch`}>
                  <a className="btn btn-md m-t-30  btn-outline-light bg-primary ">
                    목록으로 돌아가기
                  </a>
                </Link>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default MymatchInfoForm;
