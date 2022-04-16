import React from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Uploader from './Uploader';

const MkpartyForm = () => {
    return (
        <div>
            <div className="spacer" id="forms-component">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="7" className="text-center">
                            <h1 className="title font-bold">파티 만들기</h1>
                            <h6 className="subtitle">파티를 만들어 파티원들과 활동을 즐겨보세요</h6>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Container>
                <Row>
                    <Col md="12">
                        <Form className="col">
                        <FormGroup className="col-md-6">
                                <Label htmlFor="title">파티 이름</Label>
                                <Input type="text" className="form-control" id="title" placeholder="Enter party name" />
                            </FormGroup>
                            <FormGroup className="col-md-6">
                                <Label htmlFor="sportsName">활동 선택</Label>
                                <span className="ps_box">
                                    <select id="mm" aria-label="종목">
										<option value="sportsName">종목선택</option>
										  	 			<option value="축구">
                                                            축구
                                                        </option>
										  	 			<option value="풋살">
                                                            풋살
                                                        </option>
										  	 			<option value="배구">
                                                            배구
                                                        </option>
										  	 			<option value="배드민턴">
                                                            배드민턴
                                                        </option>
										  	 			<option value="농구">
                                                            농구
                                                        </option>
										  	 			<option value="탁구">
                                                            탁구
                                                        </option>
										  	
									</select>
                                    </span>
                            </FormGroup>
                            <FormGroup className="col-md-6">
                                <Label htmlFor="location">지역 선택</Label>
                                <span className="ps_box">
                                    <select id="mm" aria-label="장소">
										<option value="location">지역선택</option>
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
									</select>
                                    </span>
                            </FormGroup>
                            <FormGroup className="col-md-6">
                                <Label htmlFor="intro">파티 소개글</Label>
                                <Input type="text" className="form-control" id="intro" placeholder="소개글을 작성해주세요" />
                            </FormGroup>
                            <FormGroup className="col-md-6">
                                <Label htmlFor="intro">파티 이미지 업로드</Label>
                                <Uploader/>
                            </FormGroup>
                            <FormGroup className="col-md-6">
                                <Button type="submit" className="btn btn-success waves-effect waves-light m-r-10">파티 만들기</Button>
                                <Button type="reset" className="btn btn-inverse waves-effect waves-light">취소</Button>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default MkpartyForm;