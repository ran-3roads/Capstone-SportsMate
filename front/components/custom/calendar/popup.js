import Modal from 'react-bootstrap/Modal';
import React from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useState } from 'react';
import axios from 'axios';

const customer = {
    'Date':'',
    'field':'',
    'time':'',
}

function Popup({open, setPopup,party_id, title, callback}) {
    const handleClose = () => {
      setPopup({open: false});
      if(callback){
        callback();
      }
    }
    const[Date,setDate]=useState(customer.Date);
    const[field,setField]=useState(customer.field);
    const[time,setTime]=useState(customer.time);
   
    const onchangeDate = (e) =>{
        setDate(e.target.value)
    }
    const onchangeTime = (e) =>{
        setTime(e.target.value)
    }
    const onchangeField = (e) =>{
        setField(e.target.value)
    }
    let fieldcontent=null
    let timecontent=null
    if(Date!=''){
        fieldcontent=<FormGroup className="col-md-6">
                        <Label htmlFor="field">경기장</Label>
                        <Input type="select" name="field" value={field} onChange={onchangeField}>
                            <option value="" selected disabled>경기장선택</option>
                            <option value="HSFIELD">한성대풋살경기장</option>
                            <option value="BJFIELD">배제고풋살경기장</option>
                        </Input>
        </FormGroup>
    }
    if(field!=''){
        timecontent=<FormGroup className="col-md-6">
                        <Label htmlFor="time">시간</Label>
                        <Input type="select" name="time" value={time} onChange={onchangeTime}>
                            <option value="" selected disabled>시간선택</option>
                            <option value="09001100">09:00~11:00</option>
                            <option value="12001400">12:00~14:00</option>
                            <option value="15001700">15:00~17:00</option>
                            <option value="18002000">18:00~20:00</option>
                            <option value="21002300">21:00~23:00</option>
                        </Input>
                    </FormGroup>
    }
    return (
      <>1
        <Modal show={open} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
                <Form className="col" id="signupForm" onSubmit={function (event) {
                    event.preventDefault();
                    handleClose();
                    setPopup({open: false});
                    if(callback){
                    console.log(Date);
                    console.log(time);
                    console.log(field);
                    }
                }}>
                    <FormGroup className="col-md-6">
                        <Label htmlFor="Date">경기날짜</Label>
                        <Input type="date" name="Date" placeholder="date placeholder" value={Date} onChange={onchangeDate}/>    
                    </FormGroup>
                    {fieldcontent}
                    
                    {timecontent}
                    
                    <FormGroup className="col-md-6">
                        <Button type="submit" className="btn btn-success waves-effect waves-light m-r-10">예약하기</Button>
                    </FormGroup>
            </Form>


          </Modal.Body>
        </Modal>
      </>
    );
}

export default Popup;