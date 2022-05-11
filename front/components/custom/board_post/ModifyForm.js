import React from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Popup from '../popup';
import Link from "next/link";
import { useRouter } from 'next/router';



const ModifyForm = (props) => {
    const[write,setWrite]=useState({});
    const router = useRouter();
    const { id } = router.query;
    const { board_id } = router.query;
useEffect(() => {
    if(!router.isReady)return;
    console.log(id,board_id)
    axios.get(`http://localhost:8080/sportsmate/party/${id}/partyboard/${board_id}`)
  .then(function (response) {
    if(response.status == 200){
      setWrite(response.data);
    }})
    .catch(function (error) {
       console.log(error);
      });
}, [router.isReady])

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
            <Container>
                <Row>
                    <Col md="12">
                        <Form className="col" id="ModifyForm" onSubmit={function (event) {
                            event.preventDefault();
                            if(event.target.title.value==""||event.target.contents.value==""||event.target.category.value==""){
                                if(event.target.title.value==""){
                                    alert("제목을 입력해주세요")
                                }
                                else if(event.target.category.value==""){
                                    alert("카테고리를 선택해주세요")
                                }
                                else if(event.target.contents.value==""){
                                    alert("내용을 입력해주세요")
                                }
                            }
                            else{
                                axios.post(`http://localhost:8080/sportsmate/party/${id}/partyboard/${board_id}/modify`, {
                                    title: event.target.title.value,
                                    contents: event.target.contents.value,
                                    category: event.target.category.value
                                })
                                .then(function (response) {
                                    //받는거
                                    if(response.status == 200){
                                        alert("수정 성공");
                                        document.location.href=`/party/${id}/board/${board_id}/info`
                                }
                            }).catch(function (error) {
                                    //error
                                    console.log(error);
                                });
                            }
                        }}>
                            <FormGroup className="col-md-6">
                                <Label htmlFor="title">제목을 입력해주세요</Label>
                                <Input type="text" className="form-control" id="title" placeholder={write.title} value={title} onChange={onchangeTitle}/>
                            </FormGroup>
                            <FormGroup className="col-md-6">
                                <Label htmlFor="category">활동 선택</Label>
                                <Input type="select" name="category" placeholder={write.category} value={category} onChange={onchangeCategory}>
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
                                <Link href={`/party/${id}/board/${board_id}/info`}>
                                      <Button type="reset" className="btn btn-inverse waves-effect waves-light">취소</Button>
                                </Link>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default ModifyForm;