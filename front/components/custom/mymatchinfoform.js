/* global kakao */
import React from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useState, useEffect, useRef} from 'react';
import axios from 'axios';
import Popup from './popup';
import Image from "next/image";
import mapimg from "../../assets/images/landingpage/mapimg.png";
import { useRouter } from 'next/router';


const recruitinfo = {
    title: '성풋모',
    sportsName: '풋살',
    date:'2022-4-5',
    num:'2',
    location:'성북구',
    infoimg: mapimg
}
const request = {
    'contents' : '',
}

const MymatchInfoForm = () => {
    const router=useRouter();
    const { id } = router.query;

    const[mymatchs,setMymatchs]=useState({});

    const container = useRef();
    const [kakaoMap, setKakaoMap] = useState(null);
    const [, setMarkers] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/sportsmate/match/board/${id}`)
      .then(function (response) {
        if(response.status == 200){
            console.log(response.data);
          setMymatchs(response.data);
          return response.data;
        }})
        .then((data) => {
            const script = document.createElement("script");
            script.src ="https://dapi.kakao.com/v2/maps/sdk.js?appkey=3dbb4a851361084c24a23040d0abd3c6&autoload=false";
            document.head.appendChild(script);
        
            script.onload = () => {
              kakao.maps.load(() => {
                const center = new kakao.maps.LatLng(data.mapX,data.mapY);
                const options = {
                  center,
                  level: 3
                };
                const map = new kakao.maps.Map(container.current, options);
                setKakaoMap(map);
              });
            };
          })
        .catch(function (error) {
           console.log(error);
          });
    }, [])
      useEffect(() => {
        if (kakaoMap === null) {
          return;
        }
    
        // save center position
        const center = kakaoMap.getCenter();
    
        // relayout and...
        kakaoMap.relayout();
        // restore
        kakaoMap.setCenter(center);
        let marker = new kakao.maps.Marker({
            position: center,
        });
        marker.setMap(kakaoMap);
      }, [kakaoMap]);
      

    const [popup, setPopup] = useState({open: false, title: "", message: "", callback: false});
 


    return (
        <div>
            <Popup open = {popup.open} setPopup = {setPopup} message = {popup.message} title = {popup.title} callback = {popup.callback}/>
            <div className="spacer" id="forms-component">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="7" className="text-center">
                            <h1 className="title font-bold">My Match</h1>
                            <h6 className="subtitle">나의 경기 정보를 확인하세요</h6>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Container>
                <Row>
                    <Col md="12">
                        <Form className="col" id="matchinfoForm">
                            <FormGroup className="col-md-6">
                                <Label htmlFor="title">파티명: {mymatchs.title}</Label>
                            </FormGroup>
                            <FormGroup className="col-md-6">
                                <Label htmlFor="sprotsName">종목: {mymatchs.sportsName}</Label>
                            </FormGroup>
                            <FormGroup className="col-md-6">
                            <Label htmlFor="members">인원: {mymatchs.maxMember}명</Label>
                            </FormGroup>
                            <FormGroup className="col-md-6">
                                <Label htmlFor="sincedate">시작 시간: {mymatchs.startTime}</Label>
                            </FormGroup>
                            <FormGroup className="col-md-6">
                                <Label htmlFor="sincedate">종료 시간: {mymatchs.endTime}</Label>
                            </FormGroup>
                            <FormGroup className="col-md-6">
                                <Label htmlFor="location">장소: {mymatchs.location}</Label>
                                <span className='mInner'>
                                <div id="container" ref={container} style={{width:"500px", height:"400px"}}/>
                                </span>
                            </FormGroup>
                            <FormGroup className="col-md-6">
                                <Button type="submit" className="btn btn-success waves-effect waves-light m-r-10">신청</Button>
                                <Button type="reset" className="btn btn-inverse waves-effect waves-light">취소</Button>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
export default MymatchInfoForm;