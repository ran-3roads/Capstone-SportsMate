import Modal from 'react-bootstrap/Modal';
import React from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useState,useEffect } from 'react';
import axios from 'axios';


function Participation({open, setPopup, callback,party_id,schedule_id,viewdata}) {
    const handleClose = () => {
      setPopup({open: false});
      if(callback){
        callback();
      }
    }
    if(viewdata!=undefined)
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
                          <h6 className="title font-bold">날짜:{viewdata.day} 시간:{viewdata.time}</h6>
                          </Col>
                      <div className="guide_margin">
                        <Container>
                        <Row>
                        <Col className='text-right'>
                        <h6 className="title font-bold">장소:</h6>
                        <h6 className="title font-bold">현재참가인원수:</h6>
                        <h6 className="title font-bold">참가비용:</h6>
                        </Col>
                        <Col className='text-left'>
                        <h6 className="title font-bold">{viewdata.location}</h6>
                        <h6 className="title font-bold">{viewdata.currentMember}/{viewdata.maxMember}</h6>
                        <h6 className="title font-bold">{viewdata.nshotCredit}포인트</h6>
                        </Col>
                        </Row>  
                        </Container>
                        <Button className="btn btn-success waves-effect waves-light m-r-10" onClick={(event)=>{
                          event.preventDefault();
                          axios.post(`http://localhost:8080/sportsmate/party/${party_id}/schedule/${schedule_id}`, {
                            })
                                .then(function (response) {
                                    if(response.status == 200){
                                        alert(`${viewdata.title}에 참가완료.`)
                                        handleClose();
                                    setPopup({open: false});
                                        if(callback){
                                        }
                                    }
                            }).catch(function (error) {
                                    console.log(error);
                                });
                        }}>일정참가</Button>
                        <div>
                        </div>
                      </div>
                  </Row> 
          </Modal.Body>
        </Modal>
      </>
    );
    else
    return(<></>)
}

export default Participation;