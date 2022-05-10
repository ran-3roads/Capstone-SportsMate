import Modal from 'react-bootstrap/Modal';
import React from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useState,useEffect } from 'react';
import axios from 'axios';


function Popup({open, setPopup,party_id, callback}) {
    const handleClose = () => {
      setPopup({open: false});
      if(callback){
        callback();
      }
    }
    const[contents,setContents]=useState('');
    const[maxMember,setMaxMember]=useState(1);
    const[title,setTitle]=useState('');
    const[timeList,setTimeList]=useState([]);
    const[arena,setArena]=useState([]);
    const[Date,setDate]=useState('');
    const[location,setLocation]=useState('');
    const[field,setField]=useState('');
    const[time,setTime]=useState('');
    useEffect(() => {
        axios.get(`http://localhost:8080/sportsmate/party/${party_id}/schedule/regist/getArenaList`)
                                .then(function (response) {
                                    if(response.status == 200){
                                        console.log("arena:",arena)
                                        setArena(response.data)
                                    }
                            }).catch(function (error) {
                                console.log("arena:error")
                                    console.log(error);
                                });
      }, [])
                            
    const onchangeTitle = (e) =>{
        setTitle(e.target.value)
    }
    const onchangeMaxmember = (e) =>{
        setMaxMember(e.target.value)
    }
    const onchangeContents = (e) =>{
        setContents(e.target.value)
    }



    const onchangeDate = (e) =>{
        setDate(e.target.value)
    }
    const onchangeTime = (e) =>{
        setTime(e.target.value)
    }
    const onchangeField = (e) =>{
        axios.post(`http://localhost:8080/sportsmate/party/${party_id}/schedule/regist/getArenaList`, {
                                arenaId:e.target.value,
                                day:Date
                            })
                                .then(function (response) {
                                    if(response.status == 200){
                                        setTimeList(response.data)
                                    }
                            }).catch(function (error) {
                                    console.log(error);
                                });
        setField(e.target.value)
    }
    const onchangeLocation = (e) =>{
        setLocation(e.target.value)
  }
    let bookcontent=null
    let locationcontent=null
    let fieldcontent=null
    let timecontent=null
    if(Date!=''){
      locationcontent=<FormGroup className="col-md-6">
      <Label htmlFor="field">지역</Label>
      <Input type="select" name="location" value={location} onChange={onchangeLocation}>
      <option value="" selected>지역선택</option>
										  	 			<option value="강남구">
                                                            강남구
                                                        </option>
										  	 			<option value="강동구">
                                                            강동구
                                                        </option>
										  	 			<option value="강북구">
                                                            강북구
                                                        </option>
										  	 			<option value="강서구">
                                                            강서구
                                                        </option>
										  	 			<option value="관악구">
                                                            관악구
                                                        </option>
										  	 			<option value="광진구">
                                                            광진구
                                                        </option>
										  	 			<option value="구로구">
                                                            구로구
                                                        </option>
										  	 			<option value="금천구">
                                                            금천구
                                                        </option>
										  	 			<option value="노원구">
                                                            노원구
                                                        </option>
										  	 			<option value="도봉구">
                                                            도봉구
                                                        </option>
										  	 			<option value="동대문구">
                                                            동대문구
                                                        </option>
										  	 			<option value="동작구">
                                                            동작구
                                                        </option>
                                                        <option value="마포구">
                                                            마포구
                                                        </option>
                                                        <option value="서대문구">
                                                            서대문구
                                                        </option>
                                                        <option value="서초구">
                                                            서초구
                                                        </option>
                                                        <option value="성동구">
                                                            성동구
                                                        </option>
                                                        <option value="성북구">
                                                            성북구
                                                        </option>
                                                        <option value="송파구">
                                                            송파구
                                                        </option>
                                                        <option value="양천구">
                                                            양천구
                                                        </option>
                                                        <option value="영등포구">
                                                            영등포구
                                                        </option>
                                                        <option value="용산구">
                                                            용산구
                                                        </option>
                                                        <option value="은평구">
                                                            은평구
                                                        </option>
                                                        <option value="종로구">
                                                            종로구
                                                        </option>
                                                        <option value="중구">
                                                            중구
                                                        </option>
                                                        <option value="중랑구">
                                                            중랑구
                                                        </option>
      </Input>
</FormGroup>
    }
    if(location!=''){
      fieldcontent=<FormGroup className="col-md-6">
                        <Label htmlFor="field">경기장</Label>
                        <Input type="select" name="field" value={field} onChange={onchangeField}>
                            <option value="" selected disabled>경기장선택</option>
                            {
                               arena.filter(a=>a.location==location).map(a => {
                                return (
                                    <option value={a.id} key={a.id}>{a.name}</option>
                                )}
                               )
                            }
                        </Input>
        </FormGroup>
    }
    if(field!=''){
        timecontent=<FormGroup className="col-md-6">
                        <Label htmlFor="time">시간</Label>
                        <Input type="select" name="time" value={time} onChange={onchangeTime}>
                            <option value="" selected disabled>시간선택</option>
                            {
                               timeList.map(t => {
                                return (
                                    <option value={t.id} key={t.id}>{t.time}시 credit:{t.credit}원</option>
                                )}
                               )
                            }
                        </Input>
                    </FormGroup>
    }
    if(time!=''){
        bookcontent=<Col>
                        <FormGroup className="col-md-6">
                                <Label htmlFor="title">모임제목을 입력해주세요</Label>
                                <Input type="text" className="form-control" id="title" placeholder="제목" value={title} onChange={onchangeTitle}/>
                            </FormGroup>
                            <FormGroup className="col-md-6">
                                <Label htmlFor="maxMember">모임인원</Label>
                                <Input type="number" name="maxMember" value={maxMember} min={1} onChange={onchangeMaxmember}/>
                            </FormGroup>
                            <FormGroup className="col-md-6">
                                <Label htmlFor="contents">내용을 입력해주세요</Label>
                                <textarea  rows="10" cols="30" id="contents" placeholder="내용" value={contents} onChange={onchangeContents}/>
                            </FormGroup>
                    </Col>
    }
    return (
      <>
        <Modal show={open} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>모임 예약</Modal.Title>
          </Modal.Header>
          <Modal.Body>
                <Form className="col" id="signupForm" onSubmit={function (e) {
                    e.preventDefault();
                    axios.post(`http://localhost:8080/sportsmate/party/${party_id}/schedule/regist/book`,{
                                maxMember:e.target.maxMember.value,
                                title:e.target.title.value,
                                contents:e.target.contents.value,
                                day:e.target.Date.value,
                                arenaTimeId:e.target.time.value
                            })
                                .then(function (response) {
                                    if(response.status == 200){
                                        alert(`${e.target.Date.value}에 예약완료.`)
                                        handleClose();
                                    setPopup({open: false});
                                        if(callback){
                                        }
                                    }
                            }).catch(function (error) {
                                    console.log(error);
                                });
                }}>
                    <FormGroup className="col-md-6">
                        <Label htmlFor="Date">경기날짜</Label>
                        <Input type="date" name="Date" placeholder="date placeholder" value={Date} onChange={onchangeDate}/>    
                    </FormGroup>
                    {locationcontent}
                    {fieldcontent}
                    {timecontent}
                    {bookcontent}
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