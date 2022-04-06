/* eslint-disable */
import React from 'react';
import Image from "next/image";
import { Pagination, PaginationItem, PaginationLink, Container, Row, Col } from 'reactstrap';
import footballimg from "../../assets/images/landingpage/football.png";
const MPList = () => {
    return (
        <div>
            <div className="spacer" id="pagination-component">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="7" className="text-center">
                            <h1 className="title font-bold">My Party</h1>
                            <h6 className="subtitle">내가가입한 파티목록</h6>
                        </Col>
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

export default MPList;
