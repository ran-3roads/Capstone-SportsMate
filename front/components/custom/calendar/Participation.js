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
import Link from "next/link";
import { useRouter } from "next/router";

function Participation({
  open,
  setPopup,
  callback,
  party_id,
  schedule_id,
  viewdata,
  isalreadyP,
  ismanager,
  isalreadyR,
}) {
  const router = useRouter();
  const handleClose = () => {
    setPopup({ open: false });
    if (callback) {
      callback();
    }
  };
  let buttoncontent = null;
  if (isalreadyP) {
    buttoncontent = (
      <Button
        className="btn btn-warning waves-effect waves-light m-r-10"
        onClick={(event) => {
          event.preventDefault();
          if (
            confirm(`정말 ${viewdata.title}에 참가신청을 취소하시겠습니까?`)
          ) {
            axios
              .delete(`/party/${party_id}/schedule/${schedule_id}`, {})
              .then(function (response) {
                if (response.status == 200) {
                  alert(`참가취소되었습니다.`);
                  handleClose();
                  setPopup({ open: false });
                  if (callback) {
                  }
                }
              })
              .catch(function (error) {
                console.log(error);
              });
          }
        }}
      >
        참가 중(취소)
      </Button>
    );
  } else {
    buttoncontent = (
      <Button
        className="btn btn-success waves-effect waves-light m-r-10"
        onClick={(event) => {
          event.preventDefault();
          axios
            .post(`/party/${party_id}/schedule/${schedule_id}`, {})
            .then(function (response) {
              if (response.status == 200) {
                alert(`${viewdata.title}에 참가완료.`);
                handleClose();
                setPopup({ open: false });
                if (callback) {
                }
              }
            })
            .catch(function (error) {
              if (error.response.status == 403) {
                alert(error.response.data.message);
              }
            });
        }}
      >
        일정참가
      </Button>
    );
  }
  let managercontent = null;
  if (ismanager) {
    if (isalreadyR) {
      managercontent = (
        <button
          onClick={(event) => {
            event.preventDefault();
            handleClose();
            setPopup({ open: false });
            if (callback) {
            }
            router.push(`/party/${party_id}/schedule/${schedule_id}/manage`);
          }}
        >
          용병모집현황
        </button>
      );
    } else {
      managercontent = (
        <button
          onClick={(event) => {
            event.preventDefault();
            handleClose();
            setPopup({ open: false });
            if (callback) {
            }
            router.push(`/recruit/form/${schedule_id}/write`);
          }}
        >
          용병모집
        </button>
      );
    }
  }

  if (viewdata != undefined)
    return (
      <>
        <Modal show={open} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className="justify-content-center">
              <Col md="7" className="text-center">
                <h1 className="title font-bold">{viewdata.title}</h1>
                <h6 className="title font-bold">
                  날짜:{viewdata.day} 시간:{viewdata.time}
                </h6>
              </Col>
              <div className="guide_margin">
                <Container>
                  <Row>
                    <Col className="text-right">
                      <h6 className="title font-bold">장소:</h6>
                      <h6 className="title font-bold">경기장:</h6>
                      <h6 className="title font-bold">현재참가인원수:</h6>
                      <h6 className="title font-bold">참가비용:</h6>
                    </Col>
                    <Col className="text-left">
                      <h6 className="title font-bold">{viewdata.location}</h6>
                      <h6 className="title font-bold">{viewdata.arenaName}</h6>
                      <h6 className="title font-bold">
                        {viewdata.currentMember}/{viewdata.maxMember}{" "}
                        {managercontent}
                      </h6>
                      <h6 className="title font-bold">
                        {viewdata.nshotCredit}포인트
                      </h6>
                    </Col>
                  </Row>
                </Container>
                {buttoncontent}
                <div></div>
              </div>
            </Row>
          </Modal.Body>
        </Modal>
      </>
    );
  else return <></>;
}

export default Participation;
