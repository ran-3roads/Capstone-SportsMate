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
import Link from "next/link";
import Popup from "./popup";
import { useRouter } from "next/router";

const request = {
  contents: "",
};

const PartySignupForm = () => {
  const [partyinfo, setPartyInfo] = useState({});
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (!router.isReady) return;
    axios
      .get(`/party/public/${id}/info`)
      .then(function (response) {
        if (response.status == 200) {
          setPartyInfo(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [router.isReady]);

  const [popup, setPopup] = useState({
    open: false,
    title: "",
    message: "",
    callback: false,
  });

  const [contents, setContents] = useState(request.contents);

  const onchangeContent = (e) => {
    setContents(e.target.value);
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
              <h1 className="title font-bold">파티 가입신청</h1>
              <h6 className="subtitle">
                양식을 입력하여 파티가입을 신청하세요
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
                axios
                  .post(`/party/${id}/join`, {
                    contents: event.target.contents.value,
                  })
                  .then(function (response) {
                    if (response.status == 200) {
                      alert("가입신청 완료");
                      document.location.href = `/party/${id}/info`;
                    }
                  })
                  .catch(function (error) {
                    //error
                    console.log(error);
                  });
              }}
            >
              <FormGroup className="col-md-6">
                <Label htmlFor="title">파티명: {partyinfo.title}</Label>
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label htmlFor="title">종목: {partyinfo.sportsName}</Label>
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label htmlFor="manager">파티장: {partyinfo.manager}</Label>
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label htmlFor="members">
                  회원수: {partyinfo.currentMember}명
                </Label>
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label htmlFor="sincedate">개설일: {partyinfo.sinceDate}</Label>
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label htmlFor="phoneNumber">자기소개</Label>
                <textarea
                  rows="10"
                  cols="60"
                  id="contents"
                  placeholder="ex)이름/나이/성별"
                  value={contents}
                  onChange={onchangeContent}
                />
              </FormGroup>
              <FormGroup className="col-md-6">
                <Button
                  type="submit"
                  className="btn btn-success waves-effect waves-light m-r-10"
                >
                  신청
                </Button>
                <Link href={`/party/${id}/info`}>
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

export default PartySignupForm;
