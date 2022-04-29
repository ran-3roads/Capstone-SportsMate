import Head from "next/head";
import { Container, Row, Col, Button } from "reactstrap";
import { useRouter } from 'next/router'
import React, { useState } from 'react';
import Link from "next/link";
import CommonTable from "../../../components/custom/board_post/CommonTable"
import CommonTableRow from "../../../components/custom/board_post/CommonTableRow"
import CommonTableColumn from "../../../components/custom/board_post/CommonTableColumn"
export default function Board() {
    const [mode,setMode]= useState('MANAGE');
    const router = useRouter();
    const { id } = router.query;
    console.log(id);
    const members = [{
        nickName:'맹구토',
        sinceDate:'2022-04-28',
        age:24,
        sex:'MALE',
    },
    {
            nickName:'버기',
            sinceDate:'2022-04-26',
            age:20,
            sex:'FEMALE',
    }
    ]
const permissions = [{
    nickName:'맹구토',
    sinceDate:'2022-04-28',
    age:24,
    sex:'MALE',
    content:'가입받아주세요'
    },
    {
    nickName:'버기',
    sinceDate:'2022-04-26',
    age:20,
    sex:'FEMALE',
    content:'나도받아다오'
    }
    ]
    let managecontent=null;
    if(mode=="PERMISSION"){
        managecontent=<div>
        <div id="comment_count">
        승인대기중인 가입수{permissions.length}개
      </div>
      <CommonTable headersName={['닉네임/나이/성별', '자기소개','신청일']}>
          {
            permissions.map(p => {
              return (
                  <CommonTableRow key={p.nickName}>
                  <CommonTableColumn>
                  <a>
                    { p.nickName },{p.age},{p.sex}
                  </a>
                  </CommonTableColumn>
                  <CommonTableColumn>
                  <a>  
                    { p.content }
                    </a>
                  </CommonTableColumn>
                  <CommonTableColumn>
                  <a>    
                    { p.sinceDate } 
                    </a>
                    <button id={p.nickName} value="승인" onClick={(event)=>{
                      event.preventDefault();
                      /*
                      axios.delete(`http://localhost:8080/sportsmate/party/${id}/partyboard/${board_id}/comment/${event.target.id}`)
                  .then(function (response) {
                      //받는거
                      if(response.status == 200){
                          alert("댓글이 삭제되었습니다.")
                          location.reload();
                  }
              }).catch(function (error) {
                      //error
                      console.log(error);
                  });
                      
                      */
                  }}>승인</button>
                  <button id={p.nickName} value="거절" onClick={(event)=>{
                      event.preventDefault();
                      /*
                      axios.delete(`http://localhost:8080/sportsmate/party/${id}/partyboard/${board_id}/comment/${event.target.id}`)
                  .then(function (response) {
                      //받는거
                      if(response.status == 200){
                          alert("댓글이 삭제되었습니다.")
                          location.reload();
                  }
              }).catch(function (error) {
                      //error
                      console.log(error);
                  });
                      
                      */
                  }}>거절</button>
                  </CommonTableColumn>
                  </CommonTableRow>
                
              )
            })
          }
      </CommonTable>
      
        </div>
    }
    else{
        managecontent=<div>
        <div id="comment_count">
        전체 파티원수 {members.length} 명
      </div>
      <CommonTable headersName={['닉네임', '나이', '성별','등록일']}>
          {
            members.map(m => {
              return (
                  <CommonTableRow key={m.nickName}>
                  <CommonTableColumn>
                  <a>
                    { m.nickName }
                  </a>
                  </CommonTableColumn>
                  <CommonTableColumn>
                  <a>  
                    { m.age }
                    </a>
                  </CommonTableColumn>
                  <CommonTableColumn>
                  <a>  
                    { m.sex }
                    </a>
                  </CommonTableColumn>
                  
                  <CommonTableColumn>
                  <a>    
                    { m.sinceDate } 
                    </a>
                    <button id={m.nickName} value="추방" onClick={(event)=>{
                      event.preventDefault();
                      /*
                      axios.delete(`http://localhost:8080/sportsmate/party/${id}/partyboard/${board_id}/comment/${event.target.id}`)
                  .then(function (response) {
                      //받는거
                      if(response.status == 200){
                          alert("댓글이 삭제되었습니다.")
                          location.reload();
                  }
              }).catch(function (error) {
                      //error
                      console.log(error);
                  });
                      
                      */
                  }}>추방</button>
                  </CommonTableColumn>
                  </CommonTableRow>
                
              )
            })
          }
      </CommonTable>
      
        </div>;
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
                      <Col md="7" className="text-center">
                          <h1 className="title font-bold">Party Management</h1>
                          <h6 className="subtitle">Party관리</h6>
                      </Col>
                      <div className="guide_margin">
                      <div className="party_box">
                        <Row>
                        <div>
                            <Button className="btn btn-md m-t-30 btn-info-gradiant font-14" onClick={(event)=>{
                                event.preventDefault();
                                setMode('MANAGE');
                            }}>
                                        파티원 관리
                            </Button>
                        </div>
                        <div>
                            <Button className="btn btn-md m-t-30 btn-info-gradiant font-14" onClick={(event)=>{
                                event.preventDefault();
                                setMode('PERMISSION');
                            }}>
                                        가입승인
                            </Button>
                        </div>
                        </Row>
                        {managecontent}
                        </div>
                      </div>
                  </Row> 
      </Container>
    </div>
  );
}
