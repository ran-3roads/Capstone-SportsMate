import React from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Popup from '../popup';
import { useRouter } from 'next/router';



const ModifyForm = () => {
    const router = useRouter();
    const { id } = router.query;
    const { board_id } = router.query;

    const[write,setWrite]=useState({});
useEffect(() => {
    axios.get(`http://localhost:8080/sportsmate/party/${id}/partyboard/${board_id}`)
  .then(function (response) {
    if(response.status == 200){
      setWrite(response.data);
    }})
    .catch(function (error) {
       console.log(error);
      });
}, [])

    const [popup, setPopup] = useState({open: false, title: "", message: "", callback: false});
    
    const[title,setTitle]=useState(write.title);
    const[contents,setContents]=useState(write.contents);
    const[category,setCategory]=useState(write.category);

    
    const onchangeTitle = (e) =>{
        console.log(e.target.value)
        setTitle(e.target.value)
    }
    const onchangeContents = (e) =>{
        console.log(e.target.value)
        setContents(e.target.value)
    }

    const onchangeCategory = (e) =>{
        console.log(e.target.value)
        setCategory(e.target.value)
    }

    return (
        <div>
            <h2 align="center">게시글 수정</h2>
            <Popup open = {popup.open} setPopup = {setPopup} message = {popup.message} title = {popup.title} callback = {popup.callback}/>
            <Container>
                <Row>
                    <Col md="12">
                        <Form className="col" id="ModifyForm" onSubmit={function (event) {
                            event.preventDefault();
                                console.log()
                                axios.post(`http://localhost:8080/sportsmate/party/${id}/partyboard/${board_id}/modify`, {
                                    title: event.target.title.value,
                                    content: event.target.content.value,
                                    category: event.target.category.value
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
                                <Label htmlFor="category">활동 선택</Label>
                                <Input type="select" name="category" value={category} onChange={onchangeCategory}>
                                                    <option value="" selected disabled>
                                                            카테고리 선택
                                                    </option>
                                                  <option value="BASIC">
                                                            기본
                                                    </option>
                                          <option value="NOTICE">
                                                            공지
                                                    </option>
                                       
                                </Input>
                            </FormGroup>
                            <FormGroup className="col-md-6">
                                <Label htmlFor="contents">내용을 입력해주세요</Label>
                                <textarea  rows="10" cols="60" id="contents" placeholder={write.contents} value={contents} onChange={onchangeContents}/>
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