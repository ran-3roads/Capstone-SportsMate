import Head from "next/head";
import { Container, Row, Col, Button } from "reactstrap";
import { useRouter } from 'next/router'
import React, { useState,useEffect } from 'react';
import Link from "next/link";
import CommonTable from "../../../components/custom/board_post/CommonTable"
import CommonTableRow from "../../../components/custom/board_post/CommonTableRow"
import CommonTableColumn from "../../../components/custom/board_post/CommonTableColumn"
import axios from "axios";
export default function Manage() {
    const [mode,setMode]= useState('MANAGE');
    const [permissions,setPermissions]=useState([]);
    const [members,setMembers]=useState([]);
    const router = useRouter();
    const { id } = router.query;
    const today = new Date();
    console.log(id);
    useEffect(() => {
      if(!router.isReady)return;
      axios.get(`http://localhost:8080/sportsmate/party/${id}/applyList`)
                              .then(function (response) {
                                  if(response.status == 200){
                                      setPermissions(response.data)
                                  }
                          }).catch(function (error) {
                                  console.log(error);
                              });
    }, [router.isReady])
    useEffect(() => {
      if(!router.isReady)return;
      axios.get(`http://localhost:8080/sportsmate/party/${id}/memberList`)
                              .then(function (response) {
                                  if(response.status == 200){
                                      setMembers(response.data)
                                  }
                          }).catch(function (error) {
                                  console.log(error);
                              });
    }, [router.isReady])
    let managecontent=null;
    if(mode=="PERMISSION"){
        managecontent=<div>
        <div id="comment_count">
        승인대기중인 가입수{permissions.filter(p=>p.state=="WAITING").length}개
      </div>
      <CommonTable headersName={['닉네임/성별', '자기소개','신청일']}>
          {
            permissions.filter(p=>p.state=="WAITING").map(p => {
              return (
                  <CommonTableRow key={p.id}>
                  <CommonTableColumn>
                  <a>
                    { p.memberName },{p.sex}
                  </a>
                  </CommonTableColumn>
                  <CommonTableColumn>
                  <a>  
                    { p.contents }
                    </a>
                  </CommonTableColumn>
                  <CommonTableColumn>
                  <a>    
                    { p.sinceDate } 
                    </a>
                    <button id={p.id} value="승인" onClick={(event)=>{
                      event.preventDefault();
                      axios.post(`http://localhost:8080/sportsmate/party/${id}/applyList/${event.target.id}/accept`)
                      .then(function (response) {
                      //받는거
                      if(response.status == 200){
                          alert("가입요청을 승인했습니다.")
                          location.reload();
                      }
                      }).catch(function (error) {
                        if(error.response.staus==405){
                          alert("중복된 승인 요청입니다.")
                        }
                      console.log(error);
                      });
                  }}>승인</button>
                  <button id={p.id} value="거절" onClick={(event)=>{
                      event.preventDefault();
                      axios.post(`http://localhost:8080/sportsmate/party/${id}/applyList/${event.target.id}/reject`)
                      .then(function (response) {
                      //받는거
                      if(response.status == 200){
                          alert("가입요청을 거절했습니다.")
                          location.reload();
                      }
                      }).catch(function (error) {
                        if(error.response.staus==405){
                          alert("중복된 거절 요청입니다.")
                        }
                      console.log(error);
                      });
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
      <CommonTable headersName={['닉네임', '나이/성별','직위','가입일']}>
      {
            members.filter(m=>m.role=="HOST").map(m => {
              return (
                  <CommonTableRow key={m.nickName}>
                  <CommonTableColumn>
                  <a>
                    { m.nickName }
                  </a>
                  </CommonTableColumn>
                  <CommonTableColumn>
                  <a>  
                    { m.birthDate}세/{m.sex}
                    {console.log(m.birthDate.type)}
                    </a>
                  </CommonTableColumn>
                  <CommonTableColumn>
                  <a>  
                    { m.role }
                    </a>
                  </CommonTableColumn>
                  
                  <CommonTableColumn>
                  <a>    
                    { m.sinceDate } 
                    </a>
                  </CommonTableColumn>
                  </CommonTableRow>
                
              )
            })
          }
          {
            members.filter(m=>m.role!="HOST").map(m => {
              return (
                  <CommonTableRow key={m.nickName}>
                  <CommonTableColumn>
                  <a>
                    { m.nickName }
                  </a>
                  </CommonTableColumn>
                  <CommonTableColumn>
                  <a>  
                    { m.birthDate}세/{m.sex}
                    {console.log(m.birthDate.type)}
                    </a>
                  </CommonTableColumn>
                  <CommonTableColumn>
                  <a>  
                    { m.role }
                    </a>
                  </CommonTableColumn>
                  
                  <CommonTableColumn>
                  <a>    
                    { m.sinceDate } 
                    </a>
                    <button id={m.memberId} value="추방" onClick={(event)=>{
                      event.preventDefault();
                      axios.delete(`http://localhost:8080/sportsmate/party/${id}/member/${event.target.id}`)
                  .then(function (response) {
                      //받는거
                      if(response.status == 200){
                          console.log(response.data)
                          alert("멤버를 추방하였습니다.")
                          location.reload();
                  }
              }).catch(function (error) {
                  if(error.response.staus==405){
                    alert("중복된 추방 요청입니다.")
                    }
                      //error
                      console.log(error);
                  });
                      
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
