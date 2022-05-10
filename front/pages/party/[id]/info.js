import Head from "next/head";
import { Container, Row, Col, Button } from "reactstrap";
import { useRouter} from 'next/router'
import Link from "next/link";
import React from 'react';
import Image from "next/image";
import footballimg from "../../../assets/images/landingpage/football.png";
import partyimg from "../../../assets/images/landingpage/20.jpg";
import PartySelect from "../../../components/custom/partyselectform";
import axios from "axios";
import { useState,useEffect } from "react";
import cookie from 'react-cookies';
import cookies from "next-cookies";
export default function Info() {
    const coa = cookie.loadAll();
    const allCookies = cookies(coa);
    const refreshTokenByCookie = allCookies['refreshToken'];
    const router = useRouter();
    const { id } = router.query;
    const [party,setParty]=useState([]);
    const [ismember,setIsmember]=useState(false);
    const [ismanager,setIsmanager]=useState(false);
    const [isalreadyapply,setIsalreadyapply]=useState(false);
    const [partyimg, setPartyimg] = useState({});
    let managecontent=null;
    let membercontent=null;
    let memberjoincontent=null;
    let managecontent2=null;
    if(refreshTokenByCookie!=undefined){
    if(ismember){
      membercontent=<PartySelect>
      </PartySelect>
      if(ismanager)
        {
          managecontent=
            <Link href={`/party/${id}/manage`}>
                  <a className="btn btn-md m-t-30  btn-outline-light bg-warning ">
                    파티관리
                  </a>
            </Link>
          managecontent2=<Link href={`/party/${id}/info/modify`}>
          <Button className="btn btn-danger m-t-30 btn-info-gradiant font-14">
          파티 홈 수정하기
          </Button> 
           </Link>
        }
      else{
        memberjoincontent=
        <a className="btn btn-danger m-r-10 btn-md m-t-20 "
        onClick={(event)=>{
          event.preventDefault();
          axios.delete(`http://localhost:8080/sportsmate/party/${id}/member`)
          .then(function (response) {
              if(response.status == 200){
                  alert("파티에서 탈퇴하였습니다.")
                  location.reload();
          }
          }).catch(function (error) {
              console.log(error);
          });
        }}
        >
              파티 탈퇴하기
        </a>
      }
    }
    else{
      if(!isalreadyapply){
      memberjoincontent=<Link href={`/party/${id}/partysignup`}>
      <a className="btn btn-danger m-r-10 btn-md m-t-20 ">
        파티 가입하기
      </a>
      </Link>
      }
      else{
      memberjoincontent=<a className="btn btn-warning m-r-10 btn-md m-t-20 ">
      가입승인 대기중
      </a>
      }
    }
  }
  else{
    memberjoincontent= <a className="btn btn-danger m-r-10 btn-md m-t-20 "onClick={(e)=>{
      e.preventDefault();
      alert("로그인후 이용해주세요");
    }}>
      파티 가입하기
    </a>
  }

    useEffect(() => {
        axios.get(`http://localhost:8080/sportsmate/party/public/${id}/info`)
                            .then(function (response) {
                                    if(response.status == 200){
                      
                                        setParty(response.data);
                                        return axios.get('http://localhost:8080/sportsmate/file/public/image',{ params: { id: id,imageCategory:"PARTY" } })
                                    }
                            })
                            .then(function(response){
                              if(response.status == 200){

                                setPartyimg(response.data);
                                return  axios.get(`http://localhost:8080/sportsmate/party/${id}/isPartyManager`)
                            }
                            })
                            .then(function(response){
                              if(response.status == 200){
                                setIsmanager(response.data)
                                return  axios.get(`http://localhost:8080/sportsmate/party/${id}/isPartyMember`)
                            }
                            })
                            .then(function(response){
                              if(response.status == 200){
                                setIsmember(response.data)
                                return axios.get(`http://localhost:8080/sportsmate/party/${id}/alreadyApply`)
                              }
                            })
                            .then(function(response){
                                setIsalreadyapply(response.data)
                            })
                            .catch(function (error) {
                                    console.log(error);
                                });
    }, [])

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
          {membercontent}
                      <Col md="7" className="text-center">
                          <h1 className="title font-bold">Party Title</h1>
                          <h6 className="subtitle">Party 정보글</h6>
                      </Col>
                    <div className="guide_margin">
                    <Row className="justify-content-center">
                        <Col md="7" className="text-center">
                        {managecontent2}
                        </Col>
                    </Row>
                      <div className="n_guide">
                        <div className="party_infobox" >
                          <div className="my_box">
                            <div className="party_infoboxc">
                              <div className="left_section">
                                <div className="inf_name"><div className="party_font">방장: {party.manager} 님</div></div>
                                <div className="since_date"><div className="party_font">개설일: {party.sinceDate}</div></div>
                                <div className="party_font">멤버수: {party.currentMember}명 </div>
                                <div className="party_font">활동: {party.sportsName}</div>
                                  {memberjoincontent}
                                  {managecontent}
                              </div>
                            </div>
                          </div>
                        </div>                       
                      </div>
                      <Col className="n_guide2">
                        <div className="party_infobox2" >
                        <div className="partyuploader-wrapper">
                          <div className="partyimg-wrapper">
                            <img src={partyimg}></img>
                          </div>
                          </div>
                        </div>
                        <div className="party_write_container">
                        <div className="party_font">
                          {party.info}
                        </div>     
                      </div>
                      </Col>
                    </div>
                  </Row> 
      </Container>
    </div>
  );
}
