import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";

const PostView = ({ history }) => {
  const[exam,setExam]=useState({});
  const[iswriter,setIswriter]=useState(false);
  const router = useRouter();
  const { id } = router.query;
  const { board_id } = router.query;
  useEffect(() => {
    if(!router.isReady)return;
    axios.get(`http://localhost:8080/sportsmate/party/${id}/partyboard/${board_id}`)
  .then(function (response) {
    if(response.status == 200){
      setExam(response.data);
    }})
    .catch(function (error) {
       console.log(error);
      });
}, [router.isReady])
useEffect(() => {
  if(!router.isReady)return;
  axios.get(`http://localhost:8080/sportsmate/party/${id}/partyboard/${board_id}/isWriter`)
.then(function (response) {
  if(response.status == 200){
    setIswriter(response.data);
  }})
  .catch(function (error) {
     console.log(error);
    });
}, [router.isReady])
    let category = undefined;
            if(exam.category=="NOTICE")
              category = "공지";
            else if(exam.category=="BASIC")
              category = "자유";
    let writercontent1 = null;
    let writercontent2 = null;
    if(iswriter){
        writercontent1=<Link href={`/party/${id}/board/${board_id}/modify`}>
          <a className="btn btn-md m-t-30  btn-outline-light bg-warning ">
            수정
          </a>
        </Link> 
        writercontent2=<a className="btn btn-md m-t-30  btn-outline-light bg-danger "onClick={(event)=>{
          event.preventDefault();
           axios.delete(`http://localhost:8080/sportsmate/party/${id}/partyboard/${board_id}`)
            .then(function (response) {
            //받는거
            if(response.status == 200){
            alert("게시글이 삭제되었습니다.")
            location.href=`/party/${id}/board`
            }
            }).catch(function (error) {
            //error
            console.log(error);
            console.log(error.response.data);
            });
             /*
            event.target.id 이용해서 권한확인후삭제
            */
            }}>
            삭제
          </a>
      }


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
                <label>작성자</label>
                <label>{ exam.nickName }</label>
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
        <Link href={`/party/${id}/board`}>
              <a className="btn btn-md m-t-30  btn-outline-light bg-primary ">
                목록으로 돌아가기
              </a>
        </Link>
        
        {writercontent1}
        {writercontent2}
      </div>
    </div>
  )
}

export default PostView;