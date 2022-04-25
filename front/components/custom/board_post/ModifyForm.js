import React from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useState } from 'react';
import axios from 'axios';
import Popup from '../popup';



const write = {
    "title": "첫번째 게시글입니다.",
    "content": "첫번째 게시글 내용입니다.",
}


const ModifyForm = () => {

    const [popup, setPopup] = useState({open: false, title: "", message: "", callback: false});
 
    const[title,setTitle]=useState(write.title);
    const[content,setContent]=useState(write.content);

    
    const onchangeTitle = (e) =>{
        console.log(e.target.value)
        setTitle(e.target.value)
    }
    const onchangeContent = (e) =>{
        console.log(e.target.value)
        setContent(e.target.value)
    }

    return (
        <div>
            <h2 align="center">게시글 수정</h2>
            <Popup open = {popup.open} setPopup = {setPopup} message = {popup.message} title = {popup.title} callback = {popup.callback}/>
            <Container>
                <Row>
                    <Col md="12">
                        <Form className="col" id="WirteForm" onSubmit={function (event) {
                            event.preventDefault();
                                console.log()
                                axios.post("http://localhost:8080/sportsmate/member/public/signup", {
                                    title: event.target.title.value,
                                    content: event.target.content.value
                                })
                                .then(function (response) {
                                    //받는거
                                    if(response.status == 200){
                                        setPopup({
                                            open: true,
                                            title: "Confirm",
                                            message: "Join Success!", 
                                            callback: function(){
                                                document.location.href='/';
                                            }
                                        });
                                }
                            }).catch(function (error) {
                                    //error
                                    console.log(error);
                                });
                        }}>
                        <FormGroup className="col-md-6">
                                <Label htmlFor="title">제목을 입력해주세요</Label>
                                <Input type="text" className="form-control" id="title" placeholder={write.title} value={title} onChange={onchangeTitle}/>
                            </FormGroup>
                            <FormGroup className="col-md-6">
                                <Label htmlFor="phoneNumber">내용을 입력해주세요</Label>
                                <textarea  rows="10" cols="60" id="content" placeholder={write.content} value={content} onChange={onchangeContent}/>
                            </FormGroup>
                            <FormGroup className="col-md-6">
                                <Button type="submit" className="btn btn-success waves-effect waves-light m-r-10">저장</Button>
                                <Button type="reset" className="btn btn-inverse waves-effect waves-light">취소</Button>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default ModifyForm;