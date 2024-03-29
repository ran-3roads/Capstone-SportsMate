import Modal from "react-bootstrap/Modal";
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
import { useState, useEffect } from "react";
import axios from "axios";

function Popup({ open, setPopup, party_id, callback }) {
  const handleClose = () => {
    setDate("");
    setLocation("");
    setField("");
    setTime("");
    setTitle("");
    setMaxMember(1);
    setContents("");
    setPopup({ open: false });
    if (callback) {
      callback();
    }
  };
  const [contents, setContents] = useState("");
  const [maxMember, setMaxMember] = useState(1);
  const [title, setTitle] = useState("");
  const [timeList, setTimeList] = useState([]);
  const [arena, setArena] = useState([]);
  const [Date, setDate] = useState("");
  const [Location, setLocation] = useState("");
  const [field, setField] = useState("");
  const [time, setTime] = useState("");
  useEffect(() => {
    axios
      .get(`/party/${party_id}/schedule/regist/getArenaList`)
      .then(function (response) {
        if (response.status == 200) {
          setArena(response.data);
        }
      })
      .catch(function (error) {
        console.log("arena:error");
        console.log(error);
      });
  }, []);

  const onchangeTitle = (e) => {
    setTitle(e.target.value);
    setMaxMember(1);
    setContents("");
  };
  const onchangeMaxmember = (e) => {
    setMaxMember(e.target.value);
    setContents("");
  };
  const onchangeContents = (e) => {
    setContents(e.target.value);
  };

  const onchangeDate = (e) => {
    setDate(e.target.value);
    setLocation("");
    setField("");
    setTime("");
    setTitle("");
    setMaxMember(1);
    setContents("");
  };
  const onchangeTime = (e) => {
    setTime(e.target.value);
    setTitle("");
    setMaxMember(1);
    setContents("");
  };
  const onchangeField = (e) => {
    axios
      .post(`/party/${party_id}/schedule/regist/getArenaList`, {
        arenaId: e.target.value,
        day: Date,
      })
      .then(function (response) {
        if (response.status == 200) {
          setTimeList(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    setField(e.target.value);
    setTime("");
    setTitle("");
    setMaxMember(1);
    setContents("");
  };
  const onchangeLocation = (e) => {
    setLocation(e.target.value);
    setField("");
    setTime("");
    setTitle("");
    setMaxMember(1);
    setContents("");
  };
  let bookcontent = null;
  let Locationcontent = null;
  let fieldcontent = null;
  let timecontent = null;
  if (Date != "") {
    Locationcontent = (
      <FormGroup className="col-md-10">
        <Label htmlFor="field">지역</Label>
        <Input
          type="select"
          name="Location"
          value={Location}
          onChange={onchangeLocation}
        >
          <option value="" selected>
            지역선택
          </option>
          <option value="강남구">강남구</option>
          <option value="강동구">강동구</option>
          <option value="강북구">강북구</option>
          <option value="강서구">강서구</option>
          <option value="관악구">관악구</option>
          <option value="광진구">광진구</option>
          <option value="구로구">구로구</option>
          <option value="금천구">금천구</option>
          <option value="노원구">노원구</option>
          <option value="도봉구">도봉구</option>
          <option value="동대문구">동대문구</option>
          <option value="동작구">동작구</option>
          <option value="마포구">마포구</option>
          <option value="서대문구">서대문구</option>
          <option value="서초구">서초구</option>
          <option value="성동구">성동구</option>
          <option value="성북구">성북구</option>
          <option value="송파구">송파구</option>
          <option value="양천구">양천구</option>
          <option value="영등포구">영등포구</option>
          <option value="용산구">용산구</option>
          <option value="은평구">은평구</option>
          <option value="종로구">종로구</option>
          <option value="중구">중구</option>
          <option value="중랑구">중랑구</option>
        </Input>
      </FormGroup>
    );
  }
  if (Location != "") {
    fieldcontent = (
      <FormGroup className="col-md-10">
        <Label htmlFor="field">경기장</Label>
        <Input
          type="select"
          name="field"
          value={field}
          onChange={onchangeField}
        >
          <option value="" selected disabled>
            경기장선택
          </option>
          {arena
            .filter((a) => a.location == Location)
            .map((a) => {
              return (
                <option value={a.id} key={a.id}>
                  {a.name}
                </option>
              );
            })}
        </Input>
      </FormGroup>
    );
  }
  if (field != "") {
    timecontent = (
      <FormGroup className="col-md-10">
        <Label htmlFor="time">시간</Label>
        <Input type="select" name="time" value={time} onChange={onchangeTime}>
          <option value="" selected disabled>
            시간선택
          </option>
          {timeList.map((t) => {
            return (
              <option value={t.id} key={t.id}>
                {t.time}시 credit:{t.credit}원
              </option>
            );
          })}
        </Input>
      </FormGroup>
    );
  }
  if (time != "") {
    bookcontent = (
      <Col className="registcol">
        <FormGroup className="col-md-10">
          <Label htmlFor="title">모임명을 입력해주세요</Label>
          <Input
            type="text"
            className="form-control"
            id="title"
            placeholder="제목"
            value={title}
            onChange={onchangeTitle}
          />
        </FormGroup>
        <FormGroup className="col-md-10">
          <Label htmlFor="maxMember">모임인원</Label>
          <Input
            type="number"
            name="maxMember"
            value={maxMember}
            min={1}
            onChange={onchangeMaxmember}
          />
        </FormGroup>
        <FormGroup className="col-md-10">
          <Label htmlFor="contents">내용을 입력해주세요</Label>
          <Input
            type="textarea"
            rows="5"
            id="contents"
            placeholder="내용"
            value={contents}
            onChange={onchangeContents}
          />
        </FormGroup>
      </Col>
    );
  }
  return (
    <>
      <Modal show={open} size="lg"  onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>모임 예약</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            className="col"
            id="signupForm"
            onSubmit={function (e) {
              e.preventDefault();
              axios
                .post(`/party/${party_id}/schedule/regist`, {
                  maxMember: e.target.maxMember.value,
                  title: e.target.title.value,
                  contents: e.target.contents.value,
                  day: e.target.Date.value,
                  arenaTimeId: e.target.time.value,
                })
                .then(function (response) {
                  if (response.status == 200) {
                    alert(`${e.target.Date.value}에 예약완료.`);
                    handleClose();
                    setPopup({ open: false });
                    location.reload();
                    if (callback) {
                    }
                  }
                })
                .catch(function (error) {
                  console.log(error);
                });
            }}
          >
            <Row className="registrow">
            <Col className="registcol">
            <FormGroup className="col-md-10">
              <Label htmlFor="Date">경기날짜</Label>
              <Input
                type="date"
                name="Date"
                placeholder="date placeholder"
                value={Date}
                onChange={onchangeDate}
              />
            </FormGroup>
            {Locationcontent}
            {fieldcontent}
            {timecontent}
            </Col>
            {bookcontent}
            </Row>
            <div className="button-center">
              <Button
                type="submit"
                className="btn btn-success waves-effect waves-light m-r-10"
              >
                예약하기
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Popup;
