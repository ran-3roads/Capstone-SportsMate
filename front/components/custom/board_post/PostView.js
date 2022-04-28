import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useRouter } from "next/router";

const PostView = ({board_id},{ history }) => {
  const[exam,setExam]=useState({});
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    axios.get(`http://localhost:8080/sportsmate/party/${id}/partyboard/${board_id}`)
  .then(function (response) {
    if(response.status == 200){
      setExam(response.data);
    }})
    .catch(function (error) {
       console.log(error);
      });
}, [])
    let category = undefined;
            if(exam.category=="NOTICE")
              category = "공지";
            else if(exam.category=="BASIC")
              category = "자유";
  return (
    <div>
      <h2 align="center">게시글 상세정보</h2>

      <div className="post-view-wrapper">
        {
            <div>
              <div className="post-view-row">
                <label>게시글 번호</label>
                <label>{ exam.id }</label>
              </div>
              <div className="post-view-row">
                <label>제목</label>
                <label>{ exam.title }</label>
              </div>
              <div className="post-view-row">
                <label>작성일</label>
                <label>{ exam.sinceDate }</label>
              </div>
              <div className="post-view-row">
                <label>카테고리</label>
                <label>{ category }</label>
              </div>
              <div className="post-view-row">
                <label>내용</label>
                <div>
                  {
                    exam.contents
                  }
                </div>
              </div>
            </div>
          }
        <button className="post-view-go-list-btn"
        onClick={(event)=>{
          event.preventDefault();
          location.href=`/party/${id}/board`
          }}>
        목록으로 돌아가기</button>
        <button className="post-view-delete-btn"
        onClick={(event)=>{
          event.preventDefault();
          location.href=`/party/${id}/board/modify`
          }}>
        수정</button>
        <button className="post-view-delete-btn"
        onClick={(event)=>{
          event.preventDefault();
          }}>
        삭제</button>
      </div>
    </div>
  )
}

export default PostView;