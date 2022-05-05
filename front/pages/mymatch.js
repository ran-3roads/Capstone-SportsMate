import Head from "next/head";
import { Container, Row, Col, Button } from "reactstrap";
import MatchList from "../components/custom/mymatchlist";



export default function MyMatch () {

  const content = <MatchList/>

  return (
    <div>
      <Head>
        <title>Sports Mate</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
      <Row>
          {content}
      </Row>
      </Container>
    </div>
  );
};