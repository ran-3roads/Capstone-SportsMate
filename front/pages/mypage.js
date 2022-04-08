import Head from "next/head";
import Link from "next/link";
import { Container, Row, Col, Button } from "reactstrap";

export default function Mypage() {
  return (
    <div className="static-slider-head">
      <Head>
        <title>My</title>
        <meta
          name="description"
          content="The page you are looking for is not found go back to the homepage"
        />
        <link rel="icon" href="/favicon.ico" />

      </Head>
        <div className="font_title">My Information</div>
        <div className="my">
          <div className="my_box">
            <div className="my_boxc">
              <div className="left_section">
                <div className="p_image">

                </div>
                <div className="inf_name"><div className="my_font">박경민님</div></div>
                <div className="left_buttons">
                 <div className="logout_button">
                 <div className="my_font">
                 <Link href="/mypage/modify">
                   정보수정
                   </Link>
                   </div>
                 </div>
                <div className="logout_button">
                <div className="my_font">
                <Link href="/my">
                  로그아웃
                  </Link>
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div>
          <Row className="justify-content-center">
          <Col lg="8" md="6" className="align-self-center text-center">
          <Link href="/party">
              <Button className="btn btn-danger m-t-30 btn-info-gradiant font-14">
                My Party 목록
              </Button>
            </Link>
            <Link href="/mymatch">
              <Button className="btn btn-danger m-t-30 btn-info-gradiant font-14">
               My 경기 목록
              </Button>
            </Link>
          </Col>
        </Row>
        </div>
    </div>
  );
};