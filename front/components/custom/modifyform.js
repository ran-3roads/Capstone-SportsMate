import React, { useCallback } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useState } from 'react';

const customer = {
    'email':'qaz5216@naver.com',
    'password' : 'asdf7034',
    'name':'박경민',
    'nickName':'맹구토슼갈리오',
    'birthDate':'1998-11-23',
    'sex':'FEMALE',
    'phoneNumber':'01027597034'
}


const ModifyForm = () => {
    
    const[email,setEmail]=useState(customer.email);
    const[password,setPassword]=useState(customer.password);
    const[passwordconfirm,setPasswordconfirm]=useState(customer.password);
    const[name,setName]=useState(customer.name);
    const[nickName,setNickname]=useState(customer.nickName);
    const[birthDate,setBirthDate]=useState(customer.birthDate);
    const[sex,setSex]=useState(customer.sex);
    const[phoneNumber,setPhoneNumber]=useState(customer.phoneNumber);

    const onchangeEmail = (e) =>{
        console.log(e.target.value)
        setEmail(e.target.value)
    }
    const onchangePassword = (e) =>{
        console.log(e.target.value)
        setPassword(e.target.value)
    }
    const onchangePasswordconfirm = (e) =>{
        console.log(e.target.value)
        setPasswordconfirm(e.target.value)
    }
    const onchangeName = (e) =>{
        console.log(e.target.value)
        setName(e.target.value)
    }
    const onchangeNickName = (e) =>{
        console.log(e.target.value)
        setNickname(e.target.value)
    }
    const onchangeBirthDate = (e) =>{
        console.log(e.target.value)
        setBirthDate(e.target.value)
    }
    const onchangeSex = (e) =>{
        console.log(e.target.value)
        setSex(e.target.value)
    }
    const onchangePhoneNumber = (e) =>{
        console.log(e.target.value)
        setPhoneNumber(e.target.value)
    }

    return (
        <div>
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
                    <Form className="col">
                        <FormGroup className="col-md-6">
                                <Label htmlFor="email">Email 아이디</Label>
                                <Input type="email" className="form-control" id="email" placeholder="Enter email" value={email} onChange={onchangeEmail}/>
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
                                <Label htmlFor="name">이름</Label>
                                <Input type="text" className="form-control" id="name" placeholder="Enter Username" value={name} onChange={onchangeName}/>
                            </FormGroup>
                            <FormGroup className="col-md-6">
                                <Label htmlFor="nickNsame">별명</Label>
                                <Input type="text" className="form-control" id="nickname" placeholder="Enter Nickname" value={nickName} onChange={onchangeNickName}/>
                            </FormGroup>
                            <FormGroup className="col-md-6">
                                <Label htmlFor="birthDate">생년월일</Label>
                                <Input type="date" name="birthDate" placeholder="date placeholder" value={birthDate} onChange={onchangeBirthDate}/>    
                            </FormGroup>
                            <FormGroup className="col-md-6">
                                <Label htmlFor="sex">성별</Label>
                                <Input type="select" name="sex" value={sex} onChange={onchangeSex}>
                                    <option value="MALE">남자</option>
                                    <option value="FEMALE">여자</option>
                                </Input>
                            </FormGroup>
                            <FormGroup className="col-md-6">
                                <Label htmlFor="phoneNumber">핸드폰번호</Label>
                                <Input type="text" className="form-control" id="phoneNumber" placeholder="Enter Phone Number" value={phoneNumber} onChange={onchangePhoneNumber}/>
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

export default ModifyForm;