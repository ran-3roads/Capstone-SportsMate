import React, { useCallback } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useState, useEffect } from 'react';
import { Spin } from 'antd';
import 'antd/dist/antd.css';
import Popup from './popup';
import axios from 'axios';


const ModifyForms = () => {
    
    const[my,setMy]=useState({});
    const [image, setImage] = useState({
        image_file: undefined,
        preview_URL: undefined,
      });
      const [loaded, setLoaded] = useState(false);
      let inputRef;

      const saveImage = (e) => {
        e.preventDefault();
        const fileReader = new FileReader();
    
        if (e.target.files[0]) {
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
          formData.append('imageCategory','MEMBER');
          try{
          await axios.post('http://localhost:8080/sportsmate/file/image', formData);
          } catch(error){
              console.log(error);
              return;
          }
          setPopup({
            open: true,
            title: "Confirm",
            message: "정보를 수정하였습니다!",
            callback: function(){
                document.location.href='/mypage';
            }
        });
        }
        else{
          alert("사진을 등록하세요!")
        }
    
      }

    useEffect(() => {
        axios.get(`http://localhost:8080/sportsmate/member/my`)
      .then(function (response) {
        if(response.status == 200){
          setMy(response.data);
        }})
        .catch(function (error) {
           console.log(error);
          });
    }, [])
    const [popup, setPopup] = useState({open: false, title: "", message: "", callback: false});
    
    const[password,setPassword]=useState(my.password);
    const[passwordconfirm,setPasswordconfirm]=useState(my.password);
    const[nickName,setNickName]=useState(my.nickName);
    const[phoneNumber,setPhoneNumber]=useState(my.phoneNumber);

    const onchangePassword = (e) =>{
        console.log(e.target.value)
        setPassword(e.target.value)
    }
    const onchangePasswordconfirm = (e) =>{
        console.log(e.target.value)
        setPasswordconfirm(e.target.value)
    }
    const onchangeNickName = (e) =>{
        console.log(e.target.value)
        setNickName(e.target.value)
    }
    const onchangePhoneNumber = (e) =>{
        console.log(e.target.value)
        setPhoneNumber(e.target.value)
    }

    return (
        <div>
             <Popup open = {popup.open} setPopup = {setPopup} message = {popup.message} title = {popup.title} callback = {popup.callback}/>
            <div className="spacer" id="forms-component">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="7" className="text-center">
                            <h1 className="title font-bold">회원정보 수정</h1>
                            <h6 className="subtitle">회원정보를 변경하세요</h6>
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
                                    nickName: event.target.nickName.value,
                                    password: event.target.password.value,
                                    phoneNumber: event.target.phoneNumber.value
                                })
                                .then(function (response) {
                                    //받는거
                                    if(image.image_file!=undefined)
                                    sendImageToServer(id);
                                    else
                                    setPopup({
                                      open: true,
                                      title: "Confirm",
                                      message: "정보를 수정하였습니다!",
                                      callback: function(){
                                          document.location.href='/mypage';
                                      }
                                  });
                                   
                            }).catch(function (error) {
                                    //error
                                    console.log(error);
                                });
                        }}>
                        <FormGroup className="col-md-6">
                                <Label htmlFor="email">Email 아이디: {my.email}</Label>
                            </FormGroup>
                            <FormGroup className="col-md-6">
                                <Label htmlFor="password">비밀번호</Label>
                                <Input type="password" className="form-control" id="password" placeholder="Password" value={password} onChange={onchangePassword}/>
                            </FormGroup>
                            <FormGroup className="col-md-6">
                                <Label htmlFor="confirmpwd">비밀번호 확인</Label>
                                <Input type="password" className="form-control" id="confirmpassword" placeholder="Confirm Password" value={passwordconfirm} onChange={onchangePasswordconfirm}/>
                            </FormGroup>
                            <FormGroup className="col-md-6">
                                <Label htmlFor="name">이름: {my.name}</Label>
                            </FormGroup>
                            <FormGroup className="col-md-6">
                                <Label htmlFor="nickNsame">별명</Label>
                                <Input type="text" className="form-control" id="nickName" placeholder={my.nickName} value={nickName} onChange={onchangeNickName}/>
                            </FormGroup>
                            <FormGroup className="col-md-6">
                                <Label htmlFor="birthDate">생년월일: {my.birthDate}</Label>   
                            </FormGroup>
                            <FormGroup className="col-md-6">
                                <Label htmlFor="sex">성별: {my.sex}</Label>
                            </FormGroup>
                            <FormGroup className="col-md-6">
                                <Label htmlFor="phoneNumber">핸드폰번호</Label>
                                <Input type="text" className="form-control" id="phoneNumber" placeholder={my.phoneNumber} value={phoneNumber} onChange={onchangePhoneNumber}/>
                            </FormGroup>
                            <FormGroup className="col-md-6">
                                <Label htmlFor="image">파티 이미지 변경</Label>
                                    <div className="uploader-wrapper">
                                        <div className="upload-button">
                                            <Button className="btn btn-success waves-effect waves-light m-r-10" onClick={() => inputRef.click()}>
                                            이미지 가져오기
                                            </Button>
                                            <Button className="btn btn-success waves-effect waves-light m-r-10" onClick={deleteImage} danger>
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
                                            <Spin className="img-spinner" tip="이미지 불러오는중" />
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

export default ModifyForms;