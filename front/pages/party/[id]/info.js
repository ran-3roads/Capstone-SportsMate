import Head from "next/head";
import { Container, Row, Col, Button } from "reactstrap";
import { useRouter } from 'next/router'
import Link from "next/link";
import React from 'react';
import Image from "next/image";
import footballimg from "../../../assets/images/landingpage/football.png";
import partyimg from "../../../assets/images/landingpage/20.jpg";
import PartySelect from "../../../components/custom/partyselectform";

export default function Info() {
    const router = useRouter();
    const { id } = router.query;
    console.log(id);
    const party = {
      party_id:id , // id 외의 정보는 db로 가져오기
      sports_name:'풋살',
      intro:'성북구 풋살을 좋아하고 모임에 관심있는분들 같이파티해요',
      location: '성북구',
      since_date:'2022-4-18',
      title: '성풋모1', 
      infoimg: footballimg
  }
    const partyinfo = {
    manager: '맹구토씈갈리오',
    sinceDate:'2022-4-5',
    members:'40',
    comments:'성북구 풋살을 좋아하고 모임에 관심있는분들 같이파티해요',
    infoimg: partyimg
  }
  return (
    <div>
      <Head>
        <title>Sports Mate</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
      <Row className="justify-content-center">
          <PartySelect>
          </PartySelect>
                      <Col md="7" className="text-center">
                          <h1 className="title font-bold">Party Title</h1>
                          <h6 className="subtitle">Party 정보글</h6>
                      </Col>
                    <div className="guide_margin">
                      <div className="n_guide">
                        <div className="party_infobox" >
                          <div className="my_box">
                            <div className="party_infoboxc">
                              <div className="left_section">
                                <div className="inf_name"><div className="party_font">방장: {partyinfo.manager} 님</div></div>
                                <div className="since_date"><div className="party_font">개설일: {partyinfo.sinceDate}</div></div>
                                <div className="party_font">멤버수: {partyinfo.members}명 </div>
                                <div className="party_font">활동: {party.sports_name}</div>
                                  <Link href="/party/signup">
                                    <a className="btn btn-danger m-r-10 btn-md m-t-20 ">
                                      파티 가입하기
                                    </a>
                                  </Link>
                                  <Link href="/party/member">
                                    <a className="btn btn-danger m-r-10 btn-md m-t-20 ">
                                      파티원 정보
                                    </a>
                                  </Link>
                              </div>
                            </div>
                          </div>
                        </div>                       
                      </div>
                      <div className="n_guide2">
                        <div className="party_infobox2" >
                          <div className='pImage'>
                            <span className='pInner'>
                            <Image src={partyinfo.infoimg} alt="파티사진"/>
                            </span>
                          </div>
                          <div className="party_write_container">
                            <div className="party_font">
                            {partyinfo.comments}
                            </div>     
                          </div>
                        </div>
                      </div>
                    </div>
                  </Row> 
      </Container>
    </div>
  );
}
