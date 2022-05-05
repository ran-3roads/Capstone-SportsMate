import React, { useCallback } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useState, useEffect } from 'react';
import { Spin } from 'antd';
import 'antd/dist/antd.css';
import Popup from './popup';
import axios from 'axios';
import { useRouter } from 'next/router';


const PartyModifyForm = () => {
    const router = useRouter();
    const { id } = router.query;
    const[partyinfo,setPartyinfo]=useState({});
    const [image, setImage] = useState({
        image_file: "",
        preview_URL: "img/default_image.png",
      });
      const [loaded, setLoaded] = useState(false);
      let inputRef;

      const saveImage = (e) => {
        e.preventDefault();
        const fileReader = new FileReader();
        
        if(e.target.files[0]){
          setLoaded("loading")
          fileReader.readAsDataURL(e.target.files[0])
        }
        fileReader.onload = () => {
          setImage(
            {
              image_file: e.target.files[0],
              preview_URL: fileReader.result
            }
          )
          setLoaded(true);
        }
        
      }
    
      const deleteImage = () => {
        setImage({
          image_file: "",
          preview_URL: "img/default_image.png",
        });
        setLoaded(false);
      }
      const sendImageToServer = async (id) => {
        if(image.image_file){
          const formData = new FormData();
          formData.append('multipartFile', image.image_file);
          formData.append('id',id);
          formData.append('imageCategory','PARTY');
          await axios.post('/api/image/upload', formData);
          alert("서버에 등록이 완료되었습니다!");
          setImage({
            image_file: "",
            preview_URL: "img/default_image.png",
          });
          setLoaded(false);
        }
        else{
          alert("사진을 등록하세요!")
        }
      }

    useEffect(() => {
        axios.get(`http://localhost:8080/sportsmate/member/my`)
      .then(function (response) {
        if(response.status == 200){
          setPartyinfo(response.data);
        }})
        .catch(function (error) {
           console.log(error);
          });
    }, [])
    const [popup, setPopup] = useState({open: false, title: "", message: "", callback: false});
    
    const[info,setInfo]=useState(partyinfo.info);
 
    
    const onchangeInfo = (e) =>{
        console.log(e.target.value)
        setInfo(e.target.value)
    }

    return (
        <div>
             <Popup open = {popup.open} setPopup = {setPopup} message = {popup.message} title = {popup.title} callback = {popup.callback}/>
            <div className="spacer" id="forms-component">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="7" className="text-center">
                            <h1 className="title font-bold">파티 수정</h1>
                            <h6 className="subtitle">파티 소개를 변경하세요</h6>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Container>
                <Row>
                    <Col md="12">
                    <Form className="col" id="ModifyForm" onSubmit={function (event) {
                            event.preventDefault();
                                console.log()
                                axios.post(`http://localhost:8080/sportsmate/member/my`, {
                                    info: event.target.info.value
                                })
                                .then(function (response) {
                                    sendImageToServer();
                                    if(response.status == 200){
                                        setPopup({
                                            open: true,
                                            title: "Confirm",
                                            message: "변경 완료!", 
                                            callback: function(){
                                                document.location.href=`/party/${id}/info`;
                                            }
                                        });
                                }
                            }).catch(function (error) {
                                    //error
                                    console.log(error);
                                });
                        }}>
                            <FormGroup className="col-md-6">
                                <Label htmlFor="info">파티 정보글</Label>
                                <Input type="text" className="form-control" id="phoneNumber" placeholder={partyinfo.info} value={info} onChange={onchangeInfo}/>
                            </FormGroup>
                            <FormGroup className="col-md-6">
                                <Label htmlFor="image">파티 이미지 변경</Label>
                                <div className="uploader-wrapper">
                                <div className="upload-button">
                                        <Button className="btn btn-success waves-effect waves-light m-r-10" onClick={() => inputRef.click()}>
                                            이미지 가져오기
                                        </Button>
                                        <Button  className="btn btn-success waves-effect waves-light m-r-10" onClick={deleteImage} danger>
                                            이미지 제거
                                        </Button>
                                    </div>
                                    <input type="file" accept="image/*"
                                        onChange={saveImage}
                                        ref={refParam => inputRef = refParam}
                                        style={{ display: "none" }}
                                    />
                                    <div className="img-wrapper">
                                        {loaded === false || loaded === true ? (
                                        <img src={image.preview_URL} />
                                    ) : (
                                        <Spin className="img-spinner" tip = "이미지 불러오는중"/>
                                    )}
                                    </div>
                                 </div>
                            </FormGroup>
                            <FormGroup className="col-md-6">
                                <Button type="submit" className="btn btn-success waves-effect waves-light m-r-10">수정</Button>
                                <Button type="reset" className="btn btn-inverse waves-effect waves-light">취소</Button>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default PartyModifyForm;