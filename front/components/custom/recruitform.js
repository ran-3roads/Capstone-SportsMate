/* eslint-disable */
import React from 'react';
import Image from "next/image";
import { Pagination, PaginationItem, PaginationLink, Container, Row, Col } from 'reactstrap';
import footballimg from "../../assets/images/landingpage/football.png";
const RecruitForm = () => {
    return (
        <div>
            <div className="spacer" id="pagination-component">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="7" className="text-center">
                            <h1 className="title font-bold">용병</h1>
                            <h6 className="subtitle">용병으로 참가해보세요</h6>
                        </Col>
                    </Row>
                </Container>
                <Container>
                <Row>
                                <div>
                                    <span className="ps_box">
                                    <select id="mm" aria-label="장소">
										<option value="">장소선택</option>
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
                                    <div>
                                    <span className="ps_box">
                                    <select id="mm" aria-label="월">
										<option value="">날짜-월</option>
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
                                    <div>
                                    <span className="ps_box">
                                    <select id="mm" aria-label="일">
										<option value="">날짜-일</option>
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
                                                        <option value="13">
                                                            13
                                                        </option>
                                                        <option value="14">
                                                            14
                                                        </option>
                                                        <option value="15">
                                                            15
                                                        </option>
                                                        <option value="16">
                                                            16
                                                        </option>
                                                        <option value="17">
                                                            17
                                                        </option>
                                                        <option value="18">
                                                            18
                                                        </option>
                                                        <option value="19">
                                                            19
                                                        </option>
                                                        <option value="20">
                                                            20
                                                        </option>
                                                        <option value="21">
                                                            21
                                                        </option>
                                                        <option value="22">
                                                            22
                                                        </option>
                                                        <option value="23">
                                                            23
                                                        </option>
                                                        <option value="24">
                                                            24
                                                        </option>
                                                        <option value="25">
                                                            25
                                                        </option>
                                                        <option value="26">
                                                            26
                                                        </option>
                                                        <option value="27">
                                                            27
                                                        </option>
                                                        <option value="28">
                                                            28
                                                        </option>
                                                        <option value="29">
                                                            29
                                                        </option>
                                                        <option value="30">
                                                            30
                                                        </option>
                                                        <option value="31">
                                                            31
                                                        </option>
									</select>
                                    </span>
                                    </div>
                                </Row>
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

export default RecruitForm;
