import Head from "next/head";
import { Container, Row, Col, Button } from "reactstrap";
import { useRouter } from 'next/router'
import React from 'react';
import Image from "next/image";
import footballimg from "../../../assets/images/landingpage/football.png";
import PartySelect from "../../../components/custom/partyselectform";
import PostMain from "../../../components/custom/board_post/PostMain";

export default function Board() {
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
                      <div className="party_box">
                          <PostMain/>
                      </div>
                      </div>
                  </Row> 
      </Container>
    </div>
  );
}
