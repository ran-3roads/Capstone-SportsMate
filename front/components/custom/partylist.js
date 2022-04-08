/* eslint-disable */
import React from 'react';
import Image from "next/image";
import { Pagination, PaginationItem, PaginationLink, Container, Row, Col } from 'reactstrap';
import footballimg from "../../assets/images/landingpage/football.png";

const party = {
    'party_id':1 ,
    'sports_name':'풋살',
    'title': '성풋모', //db에 추가해달라고 얘기해야함
    'location' : '성북구',
    'intro':'성북구 풋살을 좋아하고 모임에 관심있는분들 같이파티해요',
    'infoimg': footballimg
}

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
                <a href={'party/'+party.party_id+'/info'}>
                    <div className='mUri' >
                        <div class ="mcover">
                            <div className='mImage'>
                                <span className='mInner'>
                                <Image src={party.infoimg} alt="모임소개사진"/>
                                </span>
                            </div>
                        </div>
                        <div class ="mName">
                            <strong class="name"><a>{party.title}</a></strong>
                            <a>{'종목:'+party.sports_name+'  지역:'+party.location}</a>
                            <p className="pSubTxt">{party.intro}</p>
                        </div>
                    </div>
                    </a>
                </li>
                <li className='mItem'>
                <a href={'party/'+party.party_id+'/info'}>
                    <div className='mUri' >
                        <div class ="mcover">
                            <div className='mImage'>
                                <span className='mInner'>
                                <Image src={party.infoimg} alt="모임소개사진"/>
                                </span>
                            </div>
                        </div>
                        <div class ="mName">
                            <strong class="name"><a>{party.title}</a></strong>
                            <a>{'종목:'+party.sports_name+'  지역:'+party.location}</a>
                            <p className="pSubTxt">{party.intro}</p>
                        </div>
                    </div>
                    </a>
                </li>
                <li className='mItem'>
                <a href={'party/'+party.party_id+'/info'}>
                    <div className='mUri' >
                        <div class ="mcover">
                            <div className='mImage'>
                                <span className='mInner'>
                                <Image src={party.infoimg} alt="모임소개사진"/>
                                </span>
                            </div>
                        </div>
                        <div class ="mName">
                            <strong class="name"><a>{party.title}</a></strong>
                            <a>{'종목:'+party.sports_name+'  지역:'+party.location}</a>
                            <p className="pSubTxt">{party.intro}</p>
                        </div>
                    </div>
                    </a>
                </li>
                <li className='mItem'>
                <a href={'party/'+party.party_id+'/info'}>
                    <div className='mUri' >
                        <div class ="mcover">
                            <div className='mImage'>
                                <span className='mInner'>
                                <Image src={party.infoimg} alt="모임소개사진"/>
                                </span>
                            </div>
                        </div>
                        <div class ="mName">
                            <strong class="name"><a>{party.title}</a></strong>
                            <a>{'종목:'+party.sports_name+'  지역:'+party.location}</a>
                            <p className="pSubTxt">{party.intro}</p>
                        </div>
                    </div>
                    </a>
                </li>
                <li className='mItem'>
                <a href={'party/'+party.party_id+'/info'}>
                    <div className='mUri' >
                        <div class ="mcover">
                            <div className='mImage'>
                                <span className='mInner'>
                                <Image src={party.infoimg} alt="모임소개사진"/>
                                </span>
                            </div>
                        </div>
                        <div class ="mName">
                            <strong class="name"><a>{party.title}</a></strong>
                            <a>{'종목:'+party.sports_name+'  지역:'+party.location}</a>
                            <p className="pSubTxt">{party.intro}</p>
                        </div>
                    </div>
                    </a>
                </li>


            </ul>
            </Container>
            </div>
        </div>
    );
}

export default PList;