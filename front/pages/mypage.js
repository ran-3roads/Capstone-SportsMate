import Head from "next/head";
import Link from "next/link";
import { Container, Row, Col, Button } from "reactstrap";

export default function Mypage() {
  return (
    <div className="static-slider-head">
      <Head>
        <title>My Party</title>
        <meta
          name="description"
          content="The page you are looking for is not found go back to the homepage"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Row className="justify-content-center">
          <Col lg="8" md="6" className="align-self-center text-center">
            <h1 className="title">My Information</h1>
            <Link href="/party">
            <a className="btn btn-danger m-r-20 btn-md m-t-30 ">
            나의 파티 확인하기
              </a>
              </Link>
              <a className="btn btn-danger m-r-20 btn-md m-t-30 ">
              나의 정보 확인하기
              </a>
            <Link href="/">
              <Button className="btn btn-md m-t-30 btn-info-gradiant font-14">
                Back to Homepage
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};