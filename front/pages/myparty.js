import Head from "next/head";
import Link from "next/link";
import { Container, Row, Col, Button } from "reactstrap";
import MPList from "../components/custom/mypartylist";
import PList from "../components/custom/partylist";
import {useState} from 'react'
import cookie from 'react-cookies';
import cookies from "next-cookies";


export default function Party () {
  const coa = cookie.loadAll();
  const allCookies = cookies(coa);
  const refreshTokenByCookie = allCookies['refreshToken'];
  let mkpartycontent=null;
  if(refreshTokenByCookie!=undefined){
      mkpartycontent=<Link href="/party/mkparty">
      <a className="btn btn-danger m-t-30 btn-md font-14 ">
      파티만들기
      </a>
    </Link>;
  }
  else{
    mkpartycontent=<a className="btn btn-danger m-t-30 btn-md font-14 " onClick={(e)=>{
      e.preventDefault();
      alert("로그인후 이용해주세요");
    }}>
      파티생성하기
    </a>
  }
  const [mode,setMode]=useState('PARTY');
  let content = null;
  if(mode == 'MYPARTY'){
    content = <MPList></MPList>
  }
  else if(mode == 'PARTY'){
    content = <PList></PList>
  }
  return (
    <div>
      <Head>
        <title>Sports Mate</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Row>
      <div>
      <Button className="btn btn-md m-t-30 btn-info-gradiant font-14" onClick={(event)=>{
        event.preventDefault();
        setMode('MYPARTY');
      }}>
                My Party
      </Button>
      </div>
      <div>
      <Button className="btn btn-md m-t-30 btn-info-gradiant font-14" onClick={(event)=>{
        event.preventDefault();
        setMode('PARTY');
      }}>
                파티검색
      </Button>
      </div>
      <div>
        {mkpartycontent}
      </div>
      </Row>
      </Container>
      {content}
          
    </div>
  );
};