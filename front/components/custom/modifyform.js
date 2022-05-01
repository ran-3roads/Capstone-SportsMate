import React, { useCallback } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useState, useEffect } from 'react';
import Popup from './popup';
import axios from 'axios';


const ModifyForms = () => {
    
    const[my,setMy]=useState({});

    useEffect(() => {
        axios.get(`http://localhost:8080/sportsmate/member/my`)
      .then(function (response) {
        if(response.status == 200){
          setMy(response.data);
        }})
        .catch(function (error) {
           console.log(error);
          });
    }, [])
    const [popup, setPopup] = useState({open: false, title: "", message: "", callback: false});
    
    const[password,setPassword]=useState(my.password);
    const[passwordconfirm,setPasswordconfirm]=useState(my.password);
    const[nickName,setNickName]=useState(my.nickName);
    const[phoneNumber,setPhoneNumber]=useState(my.phoneNumber);

    const onchangePassword = (e) =>{
        console.log(e.target.value)
        setPassword(e.target.value)
    }
    const onchangePasswordconfirm = (e) =>{
        console.log(e.target.value)
        setPasswordconfirm(e.target.value)
    }
    const onchangeNickName = (e) =>{
        console.log(e.target.value)
        setNickName(e.target.value)
    }
    const onchangePhoneNumber = (e) =>{
        console.log(e.target.value)
        setPhoneNumber(e.target.value)
    }

    return (
        <div>
             <Popup open = {popup.open} setPopup = {setPopup} message = {popup.message} title = {popup.title} callback = {popup.callback}/>
            <div className="spacer" id="forms-component">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="7" className="text-center">
                            <h1 className="title font-bold">회원정보 수정</h1>
                            <h6 className="subtitle">회원정보를 변경하세요</h6>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Container>
                <Row>
                    <Col md="12">
                    <Form className="col" id="ModifyForm" onSubmit={function (event) {
                            event.preventDefault();
                                console.log()
                                axios.post(`http://localhost:8080/sportsmate/member/my`, {
                                    nickName: event.target.nickName.value,
                                    password: event.target.password.value,
                                    phoneNumber: event.target.phoneNumber.value
                                })
                                .then(function (response) {
                                    //받는거
                                    if(response.status == 200){
                                        setPopup({
                                            open: true,
                                            title: "Confirm",
                                            message: "변경 완료!", 
                                            callback: function(){
                                                document.location.href=`/mypage`;
                                            }
                                        });
                                }
                            }).catch(function (error) {
                                    //error
                                    console.log(error);
                                });
                        }}>
                        <FormGroup className="col-md-6">
                                <Label htmlFor="email">Email 아이디: {my.email}</Label>
                            </FormGroup>
                            <FormGroup className="col-md-6">
                                <Label htmlFor="password">비밀번호</Label>
                                <Input type="password" className="form-control" id="password" placeholder="Password" value={password} onChange={onchangePassword}/>
                            </FormGroup>
                            <FormGroup className="col-md-6">
                                <Label htmlFor="confirmpwd">비밀번호 확인</Label>
                                <Input type="password" className="form-control" id="confirmpassword" placeholder="Confirm Password" value={passwordconfirm} onChange={onchangePasswordconfirm}/>
                            </FormGroup>
                            <FormGroup className="col-md-6">
                                <Label htmlFor="name">이름: {my.name}</Label>
                            </FormGroup>
                            <FormGroup className="col-md-6">
                                <Label htmlFor="nickNsame">별명</Label>
                                <Input type="text" className="form-control" id="nickName" placeholder={my.nickName} value={nickName} onChange={onchangeNickName}/>
                            </FormGroup>
                            <FormGroup className="col-md-6">
                                <Label htmlFor="birthDate">생년월일: {my.birthDate}</Label>   
                            </FormGroup>
                            <FormGroup className="col-md-6">
                                <Label htmlFor="sex">성별: {my.sex}</Label>
                            </FormGroup>
                            <FormGroup className="col-md-6">
                                <Label htmlFor="phoneNumber">핸드폰번호</Label>
                                <Input type="text" className="form-control" id="phoneNumber" placeholder={my.phoneNumber} value={phoneNumber} onChange={onchangePhoneNumber}/>
                            </FormGroup>
                            <FormGroup className="col-md-6">
                                <Button type="submit" className="btn btn-success waves-effect waves-light m-r-10">수정</Button>
                                <Button type="reset" className="btn btn-inverse waves-effect waves-light">취소</Button>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default ModifyForms;