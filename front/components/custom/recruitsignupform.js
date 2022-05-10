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
import Link from "next/link";
import { useRouter } from "next/router";

const request = {
  suggest: "",
};

const RecruitSignupForm = () => {
  const router = useRouter();
  const { id } = router.query;

  const [recruits, setRecruits] = useState({});
  const [ismember,setIsmember]=useState(false);
  const [isalreadyapply,setIsalreadyapply]=useState(false);
  const container = useRef();
  const [kakaoMap, setKakaoMap] = useState(null);
  const [Markers, setMarkers] = useState([]);

  let requestbutton=null;

  if(ismember){
    requestbutton = null;
  }
  else{
    if(!isalreadyapply){
    requestbutton = 
    <Button type="submit" className="btn btn-success waves-effect waves-light m-r-10">
          신청
    </Button>
    }
    else{
      requestbutton = <a className="btn btn-warning m-r-10 btn-md m-t-20 ">
      승인 대기중
      </a>
      }
  }

  useEffect(() => {
    axios
      .get(`http://localhost:8080/sportsmate/match/board/${id}`)
      .then(function (response) {
        if (response.status == 200) {
          console.log(response.data);
          setRecruits(response.data);
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
        return axios.get(`http://localhost:8080/sportsmate/party/${id}/isPartyMemeber`)
      })
      .then(function(response){
        if(response.status == 200){
          setIsmember(response.data)
          return axios.get(`http://localhost:8080/sportsmate/party/${id}/alreadyApply`)
        }
      })
      .then(function(response){
        setIsalreadyapply(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
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

  const [suggest, setSuggest] = useState(request.suggest);

  const onchangeSuggest = (e) => {
    console.log(e.target.value);
    setSuggest(e.target.value);
  };

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
              <h1 className="title font-bold">용병 참여신청</h1>
              <h6 className="subtitle">
                양식을 입력하여 용병참여를 신청하세요
              </h6>
            </Col>
          </Row>
        </Container>
      </div>
      <Container>
        <Row>
          <Col md="12">
            <Form
              className="col"
              id="signupForm"
              onSubmit={function (event) {
                event.preventDefault();
                console.log(event.target.suggest.value,recruits.registId);
                axios
                  .post("http://localhost:8080/sportsmate/match/apply", {
                    suggest: event.target.suggest.value,
                    registId: recruits.registId,
                  })
                  .then(function (response) {
                    //받는거
                    if (response.status == 200) {
                      setPopup({
                        open: true,
                        title: "Confirm",
                        message: "신청 완료!",
                        callback: function () {
                          document.location.href = `/recruit`;
                        },
                      });
                    }
                  })
                  .catch(function (error) {
                    //error
                    if(error.response.status == 403){
                      //돈이 부족하거나 파티원일경우 용병신청 불가
                      alert(error.response.data.message)
                    }
                    else if(error.response.status == 405){
                      //이미 신청한 용병
                      alert(error.response.data.message)
                    }
                    console.log(error);
                  });
              }}
            >
              <FormGroup className="col-md-6">
                <Label htmlFor="title">파티명: {recruits.title}</Label>
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label htmlFor="manager">스포츠: {recruits.sportsName}</Label>
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label htmlFor="members">모집수: {recruits.maxMember}명</Label>
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label htmlFor="sincedate">비용: {recruits.credit}</Label>
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label htmlFor="sincedate">날짜: {recruits.day}</Label>
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label htmlFor="sincedate">경기 시간: {recruits.time}</Label>
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label htmlFor="location">장소: {recruits.location}</Label>
                <span className="mInner">
                  <div
                    id="container"
                    ref={container}
                    style={{ width: "500px", height: "400px" }}
                  />
                </span>
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label htmlFor="contents">모집 내용: {recruits.contents}</Label>
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label htmlFor="suggest">신청양식</Label>
                <textarea
                  rows="10"
                  cols="60"
                  id="suggest"
                  placeholder="ex)이름/나이/성별/포지션/연락처(파티와의 연락을 위해 적어주세요)"
                  value={suggest}
                  onChange={onchangeSuggest}
                />
              </FormGroup>
              <FormGroup className="col-md-6">
                {requestbutton}
                <Link href={`/recruit`}>
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
    </div>
  );
};
export default RecruitSignupForm;
