import Head from "next/head";
import { Container, Row, Col, Button } from "reactstrap";
import { useRouter } from "next/router";
import React from "react";
import footballimg from "../../../assets/images/landingpage/football.png";
import PartySelect from "../../../components/custom/partyselectform";
import MyCalendar from "../../../components/custom/calendar/MyCalendar";
import Popup from "../../../components/custom/calendar/popup";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Schedule() {
  const router = useRouter();
  const { id } = router.query;
  const [ismanager, setIsmanager] = useState(false);
  const [popup, setPopup] = useState({
    open: false,
    party_id: id,
    callback: false,
  });
  const [events, setEvents] = useState([]);
  const party = {
    party_id: id, // id 외의 정보는 db로 가져오기
    sports_name: "풋살",
    intro: "성북구 풋살을 좋아하고 모임에 관심있는분들 같이파티해요",
    location: "성북구",
    since_date: "2022-4-18",
    title: "성풋모1",
    infoimg: footballimg,
  };
  console.log(events);
  let managercontent = null;
  useEffect(() => {
    if (!router.isReady) return;
    axios
      .get(`/party/${id}/schedule`)
      .then(function (response) {
        if (response.status == 200) {
          console.log(response.data);
          let tmp = [];
          let i = 0;
          response.data.map((d) => {
            let day = d.day.split("-");
            let time = d.time.split("-");
            tmp[i] = {
              id: d.scheduleId,
              title: d.title,
              allDay: false,
              start: new Date(day[0], day[1] - 1, day[2], time[0], 0),
              end: new Date(day[0], day[1] - 1, day[2], time[1], 0),
            };
            i++;
          });
          setEvents([...tmp]);
          return axios.get(`/party/${id}/isPartyManager`);
        }
      })
      .then(function (response) {
        if (response.status == 200) {
          console.log(response.data);
          setIsmanager(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [router.isReady]);
  if (ismanager) {
    managercontent = (
      <Button
        className="btn btn-success waves-effect waves-light m-r-10"
        onClick={(event) => {
          event.preventDefault();
          setPopup({
            open: true,
            title: "일정 추가하기",
            party_id: id,
            callback: function () {},
          });
        }}
      >
        일정추가
      </Button>
    );
  }
  return (
    <div>
      <Popup
        open={popup.open}
        setPopup={setPopup}
        party_id={popup.party_id}
        title={popup.title}
        callback={popup.callback}
      />
      <Head>
        <title>Sports Mate</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <PartySelect></PartySelect>
        <Row className="justify-content-center">
          <Col md="7" className="text-center">
            <h1 className="title font-bold">모임 일정</h1>
            <h6 className="subtitle">Party Schedule</h6>
          </Col>
          <div className="guide_margin">
            <MyCalendar event={events} party_id={id} ismanager={ismanager} />
            {managercontent}

            <div></div>
          </div>
        </Row>
      </Container>
    </div>
  );
}
