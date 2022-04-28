import Head from "next/head";
import Link from "next/link";
import { Container, Row, Col, Button } from "reactstrap";
import MPList from "../components/custom/mypartylist";
import PList from "../components/custom/partylist";
import {useState} from 'react'



export default function Party () {
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
      <Link href="/party/mkparty">
            <a className="btn btn-danger m-r-20 btn-md m-t-30 ">
            파티만들기
            </a>
          </Link>
          </div>
      </Row>
      </Container>
      {content}
          
    </div>
  );
};