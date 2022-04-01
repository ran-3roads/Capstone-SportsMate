import React from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';

const SignupForm = () => {
    return (
        <div>
            <div className="spacer" id="forms-component">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="7" className="text-center">
                            <h1 className="title font-bold">회원가입</h1>
                            <h6 className="subtitle">회원가입을 통해 Sports Mate를 이용해보세요</h6>
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
                                <Input type="email" className="form-control" id="email" placeholder="Enter email" />
                            </FormGroup>
                            <FormGroup className="col-md-6">
                                <Label htmlFor="password">비밀번호</Label>
                                <Input type="password" className="form-control" id="password" placeholder="Password" />
                            </FormGroup>
                            <FormGroup className="col-md-6">
                                <Label htmlFor="confirmpwd">비밀번호 확인</Label>
                                <Input type="password" className="form-control" id="confirmpwd" placeholder="Confirm Password" />
                            </FormGroup>
                            <FormGroup className="col-md-6">
                                <Label htmlFor="name">이름</Label>
                                <Input type="text" className="form-control" id="name" placeholder="Enter Username" />
                            </FormGroup>
                            <FormGroup className="col-md-6">
                                <Label htmlFor="name">주민번호</Label>
                                <div className="bir_yy">
                                    <span className="ps_box">
                                        <Input type="text" className="form-control" id="yy" placeholder="년(4자)"/>
                                    </span>
                                </div>
                                <div className="bir_mm">
                                    <span className="ps_box">
                                    <select id="mm" aria-label="월">
										<option value="">월</option>
										  	 			<option value="01">
                                                            1
                                                        </option>
										  	 			<option value="02">
                                                            2
                                                        </option>
										  	 			<option value="03">
                                                            3
                                                        </option>
										  	 			<option value="04">
                                                            4
                                                        </option>
										  	 			<option value="05">
                                                            5
                                                        </option>
										  	 			<option value="06">
                                                            6
                                                        </option>
										  	 			<option value="07">
                                                            7
                                                        </option>
										  	 			<option value="08">
                                                            8
                                                        </option>
										  	 			<option value="09">
                                                            9
                                                        </option>
										  	 			<option value="10">
                                                            10
                                                        </option>
										  	 			<option value="11">
                                                            11
                                                        </option>
										  	 			<option value="12">
                                                            12
                                                        </option>
									</select>
                                    </span>
                                </div>
                                <div className="bir_dd">
                                    <span className="ps_box">
                                        <Input type="text" className="form-control" id="dd" placeholder="일"/>
                                    </span>
                                </div>
                            </FormGroup>
                            <FormGroup className="col-md-6">
                                <Label htmlFor="name">핸드폰번호</Label>
                                <Input type="text" className="form-control" id="name" placeholder="Enter Phone Number" />
                            </FormGroup>
                            <FormGroup className="col-md-6">
                                <Input id="checkbox1" type="checkbox" />
                                <Label htmlFor="checkbox1"> 약관동의 </Label>
                            </FormGroup>
                            <FormGroup className="col-md-6">
                                <Button type="submit" className="btn btn-success waves-effect waves-light m-r-10">회원가입</Button>
                                <Button type="submit" className="btn btn-inverse waves-effect waves-light">취소</Button>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default SignupForm;
