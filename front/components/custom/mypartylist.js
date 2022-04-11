/* eslint-disable */
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Pagination, PaginationItem, PaginationLink, Container, Row, Col } from 'reactstrap';
import footballimg from "../../assets/images/landingpage/football.png";

const party = {
    party_id:1 ,
    sports_name:'풋살',
    title: '성풋모', //db에 추가해달라고 얘기해야함
    location: '성북구',
    intro:'성북구 풋살을 좋아하고 모임에 관심있는분들 같이파티해요',
    infoimg: footballimg
}

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
            <Link href={{
                pathname:'/party/info',
                query: { qparty: JSON.stringify(party) },
            }} as={`party/${party.party_id}/info`}>
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
                </Link>
                </li>
                <li className='mItem'>
            <Link href={{
                pathname:'/party/info',
                query: { qparty: JSON.stringify(party) },
            }} as={`party/${party.party_id}/info`}>
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
                </Link>
                </li>
                <li className='mItem'>
            <Link href={{
                pathname:'/party/info',
                query: { qparty: JSON.stringify(party) },
            }} as={`party/${party.party_id}/info`}>
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
                </Link>
                </li>
                <li className='mItem'>
            <Link href={{
                pathname:'/party/info',
                query: { qparty: JSON.stringify(party) },
            }} as={`party/${party.party_id}/info`}>
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
                </Link>
                </li>
                <li className='mItem'>
            <Link href={{
                pathname:'/party/info',
                query: { qparty: JSON.stringify(party) },
            }} as={`party/${party.party_id}/info`}>
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
                </Link>
                </li>
            </ul>
            </Container>
            </div>
        </div>
    );
}

export default MPList;
