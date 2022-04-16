import React from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useState } from 'react';
import axios from "axios";
import Popup from './popup';



const LoginForm = ( ) => {

    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const [popup, setPopup] = useState({open: false, title: "", message: "", callback: false});


    const onchangeEmail = (e) =>{
        console.log(e.target.value)
        setEmail(e.target.value)
    }
    const onchangePassword = (e) =>{
        console.log(e.target.value)
        setPassword(e.target.value)
    }
    return (
        <div>
            <Popup open = {popup.open} setPopup = {setPopup} message = {popup.message} title = {popup.title} callback = {popup.callback}/>
            <div className="spacer" id="forms-component">
                
                <Container>
                    <Row className="justify-content-center">
                        <Col md="7" className="text-center">
                            <h1 className="title font-bold">로그인</h1>
                            <h6 className="subtitle">로그인하여 Sports Mate를 이용해보세요</h6>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Container>
                <Row>
                    <Col md="12">
                        <Form className="col" id="loginForm" onSubmit={function (event) {
                            event.preventDefault();
                            axios.post("http://localhost:8080/sportsmate/member/public/login", {
                                    email: event.target.email.value,
                                    password: event.target.password.value
                                })
                                .then(function (response) {
                                    if(response.status == 200){
                                    const { accessToken } = response.data;

                                    console.log(accessToken);

                                    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                                    // document.cookie
                                    console.log(axios.defaults.headers.common['Authorization']);
                                    // setPopup({
                                    //     open: true,
                                    //     title: "Confirm",
                                    //     message: "Join Success!", 
                                    //     callback: function(){
                                    //         document.location.href='/'
                                    //     }
                                    // });
                                }
                                }).catch(function (error) {
                                    console.log(error);
                                });
                        }}>
                        <FormGroup className="col-md-6">
                                <Label htmlFor="email">Email 아이디</Label>
                                <Input type="email" className="form-control" id="email" placeholder="Enter email" value={email} onChange={onchangeEmail}/>
                            </FormGroup>
                            <FormGroup className="col-md-6">
                                <Label htmlFor="password">비밀번호</Label>
                                <Input type="password" className="form-control" id="password" placeholder="Password" value={password} onChange={onchangePassword}/>
                            </FormGroup>
                            <FormGroup className="col-md-6">
                                <Input id="checkbox1" type="checkbox" />
                                <Label htmlFor="checkbox1">로그인 상태 유지</Label>
                            </FormGroup>
                            <FormGroup className="col-md-6">
                                <Button type="submit" className="btn btn-success waves-effect waves-light m-r-10">로그인</Button>
                                <Button type="reset" className="btn btn-inverse waves-effect waves-light">취소</Button>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default LoginForm;
