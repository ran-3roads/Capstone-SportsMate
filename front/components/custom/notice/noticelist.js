
import React from "react";
import Link from "next/link";
import { Pagination, PaginationItem, PaginationLink, Container, Row, Col } from 'reactstrap';
import { useState,useEffect } from "react";
import axios from "axios";

const NoticeList = () => {
    const exnotice = [
        {
            id:1,
            noticesStatus:"CONFIRM",
            noticeType:"APPLY",
            sinceDate:"2022-05-02 18:38:35"
        },
        {
            id:2,
            noticesStatus:"CONFIRM",
            noticeType:"PARTYREPLY",
            sinceDate:"2022-05-02 18:40:35"
        },
        {
            id:3,
            noticesStatus:"CONFIRM",
            noticeType:"PARTYREPLY",
            sinceDate:"2022-05-02 18:42:35"
        },
        {
            id:4,
            noticesStatus:"CONFIRM",
            noticeType:"APPLY",
            sinceDate:"2022-05-02 18:44:35"
        },
        {
            id:5,
            noticesStatus:"UNCONFIRM",
            noticeType:"APPLY",
            sinceDate:"2022-05-02 19:40:35"
        },
        {
            id:6,
            noticesStatus:"UNCONFIRM",
            noticeType:"PARTYREPLY",
            sinceDate:"2022-05-02 19:42:35"
        },
        {
            id:7,
            noticesStatus:"UNCONFIRM",
            noticeType:"APPLY",
            sinceDate:"2022-05-02 19:44:35"
        },
        
    ]
    const [notices,setNotices]=useState(exnotice);
    /*
    useEffect(() => {
        axios.get("http://localhost:8080/sportsmate/party/myparty")
                                .then(function (response) {
                                    if(response.status == 200){
                                        setPartys(response.data)
                                        console.log(partys)
                                    }
                            }).catch(function (error) {
                                    if(error.response.status==401)
                                    setIslogerror(true)
                                    else
                                    console.log(error);
                                });
    }, [])
    */
    const[currentPage1,setCurrentPage1]=useState(0);//안읽음
    const handleClick1=(e, index)=>{
        e.preventDefault();   
        setCurrentPage1(index);
    }
    const[currentPage2,setCurrentPage2]=useState(0);//읽음
    const handleClick2=(e, index)=>{
        e.preventDefault();   
        setCurrentPage2(index);
    }
    const pageSize = 5;
    const pagesCount1 = Math.ceil(notices.filter(n=>n.noticesStatus=="UNCONFIRM").length / pageSize);
    const pagesCount2 = Math.ceil(notices.filter(n=>n.noticesStatus=="CONFIRM").length / pageSize);
    let content1=null;//안읽음
    let content2=null;//읽음
    if(notices.filter(n=>n.noticesStatus=="UNCONFIRM").length==0){//안읽음
        content1=<div style={{height:500,display:"flex",width:"100%"}}><div style={{margin:"auto"}}><h1>확인하지않은 알림이 없습니다.</h1></div></div>
    }
    if(notices.filter(n=>n.noticesStatus=="CONFIRM").length==0){//읽음
        content2=<div style={{height:500,display:"flex",width:"100%"}}><div style={{margin:"auto"}}><h1>확인한 알림이 없습니다.</h1></div></div>
    }

    return (
        <div>
            <div className="spacer" id="pagination-component">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="7" className="text-center">
                            <h1 className="title font-bold">알림</h1>
                            <h6 className="subtitle">알림목록</h6>
                        </Col>
                    </Row>
                </Container>
                <Container>
                <Row className="noticerow">
                    <Col className="noticecol">
                    <h3>새로운 알림</h3>
                <div style={{height:500,width:"100%"}}>
                <ul className='mList'>
                {
                    notices.filter(n=>n.noticesStatus=="UNCONFIRM").slice(
                        currentPage1*pageSize,
                        (currentPage1+1)*pageSize
                    ).map(n => {
                        if(n.noticeType=="APPLY")
                        return (
                            <Link href={`/party/${n.id}/info`}>
                            <li className='mItem' key={n.id}>
                                    <div className='mUri' >
                                        <div className="mName">
                                            <strong className="name"><a>가입요청이 왔습니다.</a></strong>
                                            <a>시간:{n.sinceDate}</a>
                                        </div>
                                    </div>
                            </li>
                            </Link>
                        )
                        else
                        return (
                            <Link href={`/party/${n.id}/info`}>
                            <li className='mItem' key={n.id}>
                                    <div className='mUri' >
                                        <div className="mName">
                                            <strong className="name"><a>가입신청이 승인or거절되었습니다.</a></strong>
                                            <a>시간:{n.sinceDate}</a>
                                        </div>
                                    </div>
                            </li>
                            </Link>
                        )
                    })
                }
                </ul>
                {content1}
                </div>
                <div className="pagination-wrapper">
          
                <Pagination aria-label="Page navigation example">
                    
                    <PaginationItem disabled={currentPage1 <= 0}>
                    
                    <PaginationLink
                        onClick={e => handleClick1(e, currentPage1 - 1)}
                        previous
                        href="#"
                    />
                    
                    </PaginationItem>

                    {[...Array(pagesCount1)].map((page, i) => 
                    <PaginationItem active={i === currentPage1} key={i}>
                        <PaginationLink onClick={e => handleClick1(e, i)} href="#">
                        {i + 1}
                        </PaginationLink>
                    </PaginationItem>
                    )}

                    <PaginationItem disabled={currentPage1 >= pagesCount1 - 1}>
                    
                    <PaginationLink
                        onClick={e => handleClick1(e, currentPage1 + 1)}
                        next
                        href="#"
                    />
                    
                    </PaginationItem>
                    
                </Pagination>
                </div>
                </Col>
                <Col className="noticecol">
                <h3>확인한 알림</h3>
                <div style={{height:500,width:"100%"}}>
                <ul className='mList'>
                {
                    notices.filter(n=>n.noticesStatus=="CONFIRM").slice(
                        currentPage2*pageSize,
                        (currentPage2+1)*pageSize
                        ).map(n => {
                            if(n.noticeType=="APPLY")
                            return (
                                <Link href={`/party/${n.id}/info`}>
                                <li className='mItem' key={n.id}>
                                        <div className='mUri' >
                                            <div className="mName">
                                                <strong className="name"><a>가입요청이 왔습니다.</a></strong>
                                                <a>시간:{n.sinceDate}</a>
                                            </div>
                                        </div>
                                </li>
                                </Link>
                            )
                            else
                            return (
                                <Link href={`/party/${n.id}/info`}>
                                <li className='mItem' key={n.id}>
                                        <div className='mUri' >
                                            <div className="mName">
                                                <strong className="name"><a>가입신청이 승인or거절되었습니다.</a></strong>
                                                <a>시간:{n.sinceDate}</a>
                                            </div>
                                        </div>
                                </li>
                                </Link>
                            )
                        })
                }
                </ul>
                {content2}
                </div>
                <div className="pagination-wrapper">
          
                <Pagination aria-label="Page navigation example">
                    
                    <PaginationItem disabled={currentPage2 <= 0}>
                    
                    <PaginationLink
                        onClick={e => handleClick2(e, currentPage2 - 1)}
                        previous
                        href="#"
                    />
                    
                    </PaginationItem>

                    {[...Array(pagesCount2)].map((page, i) => 
                    <PaginationItem active={i === currentPage2} key={i}>
                        <PaginationLink onClick={e => handleClick2(e, i)} href="#">
                        {i + 1}
                        </PaginationLink>
                    </PaginationItem>
                    )}

                    <PaginationItem disabled={currentPage2 >= pagesCount2 - 1}>
                    
                    <PaginationLink
                        onClick={e => handleClick2(e, currentPage2 + 1)}
                        next
                        href="#"
                    />
                    
                    </PaginationItem>
                    
                </Pagination>
                </div>
                </Col>
                </Row>
            </Container>
            </div>
        </div>
    );
}

export default NoticeList;
