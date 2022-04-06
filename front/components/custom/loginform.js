import React from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useState } from 'react';
const LoginForm = () => {

    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');

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
                            if(event.target.checkbox1.checked)
                            console.log(event.target.email.value, event.target.password.value, "예");
                            else
                            console.log(event.target.email.value, event.target.password.value, "아니오");

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
