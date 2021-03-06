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
        <Label htmlFor="field">??????</Label>
        <Input
          type="select"
          name="Location"
          value={Location}
          onChange={onchangeLocation}
        >
          <option value="" selected>
            ????????????
          </option>
          <option value="?????????">?????????</option>
          <option value="?????????">?????????</option>
          <option value="?????????">?????????</option>
          <option value="?????????">?????????</option>
          <option value="?????????">?????????</option>
          <option value="?????????">?????????</option>
          <option value="?????????">?????????</option>
          <option value="?????????">?????????</option>
          <option value="?????????">?????????</option>
          <option value="?????????">?????????</option>
          <option value="????????????">????????????</option>
          <option value="?????????">?????????</option>
          <option value="?????????">?????????</option>
          <option value="????????????">????????????</option>
          <option value="?????????">?????????</option>
          <option value="?????????">?????????</option>
          <option value="?????????">?????????</option>
          <option value="?????????">?????????</option>
          <option value="?????????">?????????</option>
          <option value="????????????">????????????</option>
          <option value="?????????">?????????</option>
          <option value="?????????">?????????</option>
          <option value="?????????">?????????</option>
          <option value="??????">??????</option>
          <option value="?????????">?????????</option>
        </Input>
      </FormGroup>
    );
  }
  if (Location != "") {
    fieldcontent = (
      <FormGroup className="col-md-10">
        <Label htmlFor="field">?????????</Label>
        <Input
          type="select"
          name="field"
          value={field}
          onChange={onchangeField}
        >
          <option value="" selected disabled>
            ???????????????
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
        <Label htmlFor="time">??????</Label>
        <Input type="select" name="time" value={time} onChange={onchangeTime}>
          <option value="" selected disabled>
            ????????????
          </option>
          {timeList.map((t) => {
            return (
              <option value={t.id} key={t.id}>
                {t.time}??? credit:{t.credit}???
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
          <Label htmlFor="title">???????????? ??????????????????</Label>
          <Input
            type="text"
            className="form-control"
            id="title"
            placeholder="??????"
            value={title}
            onChange={onchangeTitle}
          />
        </FormGroup>
        <FormGroup className="col-md-10">
          <Label htmlFor="maxMember">????????????</Label>
          <Input
            type="number"
            name="maxMember"
            value={maxMember}
            min={1}
            onChange={onchangeMaxmember}
          />
        </FormGroup>
        <FormGroup className="col-md-10">
          <Label htmlFor="contents">????????? ??????????????????</Label>
          <Input
            type="textarea"
            rows="5"
            id="contents"
            placeholder="??????"
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
          <Modal.Title>?????? ??????</Modal.Title>
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
                    alert(`${e.target.Date.value}??? ????????????.`);
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
              <Label htmlFor="Date">????????????</Label>
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
                ????????????
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Popup;
