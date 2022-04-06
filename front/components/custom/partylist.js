/* eslint-disable */
import React from 'react';
import Image from "next/image";
import { Pagination, PaginationItem, PaginationLink, Container, Row, Col } from 'reactstrap';
import footballimg from "../../assets/images/landingpage/football.png";
const PList = () => {
    return (
        <div>
            <div className="spacer" id="pagination-component">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="7" className="text-center">
                            <h1 className="title font-bold">파티검색</h1>
                            <h6 className="subtitle">파티 목록</h6>
                        </Col>
                    </Row>
                </Container>
                <Container>
                <Row>
                <div>
                                    <span className="ps_box">
                                    <select id="mm" aria-label="종목">
										<option value="">종목선택</option>
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
                                    </div>
                                <div>
                                    <span className="ps_box">
                                    <select id="mm" aria-label="장소">
										<option value="">지역선택</option>
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
                                    </div>
                                </Row>
                </Container>
                <Container>
            <ul className='mList'>
                <li className='mItem'>
                    <div className='mUri'>
                        <div class ="mcover">
                            <div className='mImage'>
                                <span className='mInner'>
                                <Image src={footballimg} alt="모임사진"/>
                                </span>
                            </div>
                        </div>
                        <div class ="mName">
                            <strong class="name"><a>성풋모</a></strong>
                            <p className="pSubTxt">성북구 풋살을 관심있게 좋아하는 분들 같이소통해요</p>
                        </div>
                    </div>
                </li>
                <li className='mItem'>
                    <div className='mUri'>
                        <div class ="mcover">
                            <div className='mImage'>
                                <span className='mInner'>
                                <Image src={footballimg} alt="모임사진"/>
                                </span>
                            </div>
                        </div>
                        <div class ="mName">
                            <strong class="name"><a>성풋모</a></strong>
                            <p className="pSubTxt">성북구 풋살을 관심있게 좋아하는 분들 같이소통해요</p>
                        </div>
                    </div>
                </li>
                <li className='mItem'>
                    <div className='mUri'>
                        <div class ="mcover">
                            <div className='mImage'>
                                <span className='mInner'>
                                <Image src={footballimg} alt="모임사진"/>
                                </span>
                            </div>
                        </div>
                        <div class ="mName">
                            <strong class="name"><a>성풋모</a></strong>
                            <p className="pSubTxt">성북구 풋살을 관심있게 좋아하는 분들 같이소통해요</p>
                        </div>
                    </div>
                </li>
                <li className='mItem'>
                    <div className='mUri'>
                        <div class ="mcover">
                            <div className='mImage'>
                                <span className='mInner'>
                                <Image src={footballimg} alt="모임사진"/>
                                </span>
                            </div>
                        </div>
                        <div class ="mName">
                            <strong class="name"><a>성풋모</a></strong>
                            <p className="pSubTxt">성북구 풋살을 관심있게 좋아하는 분들 같이소통해요</p>
                        </div>
                    </div>
                </li>
                <li className='mItem'>
                    <div className='mUri'>
                        <div class ="mcover">
                            <div className='mImage'>
                                <span className='mInner'>
                                <Image src={footballimg} alt="모임사진"/>
                                </span>
                            </div>
                        </div>
                        <div class ="mName">
                            <strong class="name"><a>성풋모</a></strong>
                            <p className="pSubTxt">성북구 풋살을 관심있게 좋아하는 분들 같이소통해요</p>
                        </div>
                    </div>
                </li>
            </ul>
            </Container>
            </div>
        </div>
    );
}

export default PList;
