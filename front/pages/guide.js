import Head from "next/head";
import { Container, Row, Col, Button } from "reactstrap";
import Image from "next/image";
import hand from "../assets/images/logos/hand.png";
import watch from "../assets/images/logos/watch.png";
import money from "../assets/images/logos/money.png";
import rocket from "../assets/images/logos/rocket.png";

export default function Guide() {
  return (
  <div>
       <Head>
        <title>Guide</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div id="guide">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="7" className="text-center">
                            <h1 className="title font-bold">Sports-Mate Guide</h1>
                            <h6 className="subtitle">Sports-Mate는 장소 대여 및 결제를 동시에 지원해주는 스포츠 모임 서비스입니다.</h6>
                            <hr/>
                        </Col>
                        </Row> 
                        <Row className="justify-content-center">
                        <div className="guideimage-wrapper">
                          <Image src={rocket}></Image>
                        </div>  
                        <div className="guide-font">                     
                         <details>
                       <summary><strong>파티</strong>를 통해 각자 취미 활동인 팀 스포츠를 가진 사람들과 교류하세요!</summary>
                        <div className="tpt">
                          -<strong>파티장</strong>으로 시작한다면, 파티를 만들어 회원들을 모집해보세요.<br/>
                          -<strong>파티원</strong>으로 시작한다면, 원하는 파티에 가입해 활동을 시작하세요!
                        </div> 
                       </details>   
                       </div>      
                       </Row>
                       <Row className="justify-content-center">  
                       <div className="guideimage-wrapper">
                          <Image src={hand}></Image>
                        </div>
                      <div className="guide-font">   
                       <details>
                       <summary>파티를 이용하지 않고 스포츠 활동을 즐기고 싶다면 <strong>용병</strong>을 이용해보세요!</summary>
                        <div className="tpt">
                          -<strong>용병</strong> 페이지로 이동해 원하는 활동에 참가해보세요!
                        </div>
                       </details>
                       </div>   
                       </Row>
                       <Row className="justify-content-center">  
                       <div className="guideimage-wrapper">
                          <Image src={watch}></Image>
                        </div>
                      <div className="guide-font">     
                       <details>
                       <summary><strong>Sports-Mate</strong>를 통해 원하는 장소와 시간에 활동을 즐기세요</summary>
                        <div className="tpt">
                          -<strong>파티원</strong>은 매 모임활동마다 귀찮게 송금하지 않아도 돼요.<br/>
                          -<strong>파티장</strong>은 참가인원들에게 송금해달라고 하지 않아도 돼요.<br/>
                          -직접 장소를 대여하지 않아도  <strong>일정 예약</strong>을 통해 알아서 대여해줍니다!
                        </div>
                       </details>
                       </div>  
                       </Row>
                       <Row className="justify-content-center">  
                       <div className="guideimage-wrapper">
                          <Image src={money}></Image>
                        </div>
                      <div className="guide-font">     
                       <details>
                       <summary>Toss 간편송금으로 <strong>Point</strong>를 충전하세요!</summary>
                        <div className="tpt">
                        -Sports-Mate는 간편 송금 앱 Toss와 함께합니다.<br/>
                        -안전한 Point 충전,결제 Sports-Mate로 함께 시작해요.
                        </div>
                       </details>
                       </div>  
                       </Row>
                </Container>
          
       </div>
          
  </div>
  );
};