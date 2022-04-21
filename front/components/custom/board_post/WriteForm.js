import React from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useState } from 'react';
import axios from 'axios';
import Popup from './popup';



const write = {
    'title':'',
    'content' : '',
}


const WriteForm = () => {

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
            <Popup open = {popup.open} setPopup = {setPopup} message = {popup.message} title = {popup.title} callback = {popup.callback}/>
            <Container>
                <Row>
                    <Col md="12">
                        <Form className="col" id="signupForm" onSubmit={function (event) {
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
                                <Input type="text" className="form-control" id="title" placeholder="제목" value={title} onChange={onchangeTitle}/>
                            </FormGroup>
                            <FormGroup className="col-md-6">
                                <Label htmlFor="phoneNumber">내용을 입력해주세요</Label>
                                <Input type="textarea" className="form-control" id="content" placeholder="내용" value={content} onChange={onchangeContent}/>
                            </FormGroup>
                            <FormGroup className="col-md-6">
                                <Button type="submit" className="btn btn-success waves-effect waves-light m-r-10">회원가입</Button>
                                <Button type="reset" className="btn btn-inverse waves-effect waves-light">취소</Button>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default WriteForm;
