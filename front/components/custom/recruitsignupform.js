import React from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Popup from './popup';
import Image from "next/image";
import mapimg from "../../assets/images/landingpage/mapimg.png";
import { useRouter } from 'next/router';



const recruitinfo = {
    title: '성풋모',
    sportsName: '풋살',
    date:'2022-4-5',
    num:'2',
    location:'성북구',
    infoimg: mapimg
}
const request = {
    'contents' : '',
}


const RecruitSignupForm = () => {
    const router=useRouter();
    const { id } = router.query;

    const[recruits,setRecruits]=useState({});

    useEffect(() => {
        axios.get(`http://localhost:8080/sportsmate/match/board/${id}`)
      .then(function (response) {
        if(response.status == 200){
            console.log(response.data);
          setRecruits(response.data);
        }})
        .catch(function (error) {
           console.log(error);
          });
    }, [])

    const [popup, setPopup] = useState({open: false, title: "", message: "", callback: false});
 
    const[contents,setContents]=useState(request.contents);

    const onchangeContents = (e) =>{
        console.log(e.target.value)
        setContents(e.target.value)
    }
    

    return (
        <div>
            <Popup open = {popup.open} setPopup = {setPopup} message = {popup.message} title = {popup.title} callback = {popup.callback}/>
            <div className="spacer" id="forms-component">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="7" className="text-center">
                            <h1 className="title font-bold">용병 참여신청</h1>
                            <h6 className="subtitle">양식을 입력하여 용병참여를 신청하세요</h6>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Container>
                <Row>
                    <Col md="12">
                        <Form className="col" id="signupForm" onSubmit={function (event) {
                            event.preventDefault();
                                console.log()
                                axios.post("http://localhost:8080/sportsmate/member/public/signup", {
                                    contents:event.target.contents.value
                                })
                                .then(function (response) {
                                    //받는거
                                    if(response.status == 200){
                                        setPopup({
                                            open: true,
                                            title: "Confirm",
                                            message: "신청 완료!", 
                                            callback: function(){
                                                document.location.href=`/recruit`;
                                            }
                                        });
                                }
                            }).catch(function (error) {
                                    //error
                                    console.log(error);
                                });
                        }}>
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
                                <Label htmlFor="sincedate">시작 시간: {recruits.startTime}</Label>
                            </FormGroup>
                            <FormGroup className="col-md-6">
                                <Label htmlFor="sincedate">종료 시간: {recruits.endTime}</Label>
                            </FormGroup>
                            <FormGroup className="col-md-6">
                                <Label htmlFor="location">장소: {recruits.location}</Label>
                                <span className='mInner'>
                                     <Image src={recruitinfo.infoimg} alt="모임소개사진"/>
                                </span>
                            </FormGroup>
                            <FormGroup className="col-md-6">
                                <Label htmlFor="phoneNumber">신청양식</Label>
                                <textarea  rows="10" cols="60" id="contents" placeholder="ex)이름/나이/성별/포지션" value={contents} onChange={onchangeContents}/>
                            </FormGroup>
                            <FormGroup className="col-md-6">
                                <Button type="submit" className="btn btn-success waves-effect waves-light m-r-10">신청</Button>
                                <Button type="reset" className="btn btn-inverse waves-effect waves-light">취소</Button>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default RecruitSignupForm;