import Head from "next/head";
import { Container, Row, Col, Button } from "reactstrap";
import { useRouter } from 'next/router'
import React, { useState,useEffect } from 'react';
import Link from "next/link";
import CommonTable from "../../../../../components/custom/board_post/CommonTable"
import CommonTableRow from "../../../../../components/custom/board_post/CommonTableRow"
import CommonTableColumn from "../../../../../components/custom/board_post/CommonTableColumn"
import axios from "axios";
export default function Manage() {
    const [permissions,setPermissions]=useState([
      {
        id:1,
        suggest:"나좀받아주소",
        name:"축구신동"
      },
      {
        id:2,
        suggest:"나좀받아주소2",
        name:"축구신동2"
      }
    ]); //받아올거
    const [schedule,setSchedule]=useState({});
    const router = useRouter();
    const { id,schedule_id } = router.query;
    const [recruits, setRecruits] = useState({});
    console.log(id,schedule_id);
    useEffect(() => {
      // axios.get(`http://localhost:8080/sportsmate/party/${id}/schedule/${schedule_id}/applyList`)
      //                         .then(function (response) {
      //                             if(response.status == 200){
      //                                 setPermissions(response.data)
                            axios.get(`http://localhost:8080/sportsmate/party/${id}/schedule/${schedule_id}`)
                            .then(function (response){
                            setSchedule(response.data)
                            console.log(response.data)    
                          })
                          .catch(function (error) {
                                  console.log(error);
                              });
    }, [])
    
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
                          <h1 className="title font-bold">용병 승인 관리</h1>
                          <h6 className="subtitle">{schedule.title}의 인원수{schedule.currentMember}/{schedule.maxMember}</h6>
                      </Col>
                      <div className="guide_margin">
                      <div className="party_box">
                      <div>
        <div id="comment_count">
        승인대기중인 용병신청{permissions.length}개
      </div>
      <CommonTable headersName={['닉네임', '자기소개','승인']}>
          {
            permissions.map(p => {
              return (
                  <CommonTableRow key={p.matchApplyId}>
                  <CommonTableColumn>
                  <a>
                    { p.name }
                  </a>
                  </CommonTableColumn>
                  <CommonTableColumn>
                  <a>  
                    { p.suggest }
                    </a>
                  </CommonTableColumn>
                  <CommonTableColumn>
                    <button id={p.id} value="승인" onClick={(event)=>{
                      event.preventDefault();
                      // axios.post(`http://localhost:8080/sportsmate/party/${id}/applyList/${event.target.id}/accept`)
                      // .then(function (response) {
                      // //받는거
                      // if(response.status == 200){
                      //     alert("가입요청을 승인했습니다.")
                      //     location.reload();
                      // }
                      // }).catch(function (error) {
                      //   if(error.response.staus==405){
                      //     alert("중복된 승인 요청입니다.")
                      //   }
                      // console.log(error);
                      // });
                  }}>승인</button>
                  <button id={p.id} value="거절" onClick={(event)=>{
                      event.preventDefault();
                      // axios.post(`http://localhost:8080/sportsmate/party/${id}/applyList/${event.target.id}/reject`)
                      // .then(function (response) {
                      // //받는거
                      // if(response.status == 200){
                      //     alert("가입요청을 거절했습니다.")
                      //     location.reload();
                      // }
                      // }).catch(function (error) {
                      //   if(error.response.staus==405){
                      //     alert("중복된 거절 요청입니다.")
                      //   }
                      // console.log(error);
                      // });
                  }}>거절</button>
                  </CommonTableColumn>
                  </CommonTableRow>
                
              )
            })
          }
      </CommonTable>
      
        </div>
                        </div>
                      </div>
                  </Row> 
      </Container>
    </div>
  );
}
