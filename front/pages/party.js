import Head from "next/head";
import Link from "next/link";
import { Container, Row, Col, Button } from "reactstrap";

export default function Party () {
  return (
    <div className="static-slider-head">
      <Head>
        <title>Party</title>
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
            <a className="btn btn-danger m-r-20 btn-md m-t-30 ">
            스포츠
              </a>
              <a className="btn btn-danger m-r-20 btn-md m-t-30 ">
              날짜
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