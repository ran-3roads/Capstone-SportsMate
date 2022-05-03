/* eslint-disable */
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Pagination, PaginationItem, PaginationLink, Container, Row, Col } from 'reactstrap';
import footballimg from "../../assets/images/landingpage/football.png";
import { useState,useEffect } from "react";
import axios from "axios";

const MatchList = () => {
    const [matchs,setMatchs]=useState([]);
    const [islogerror,setIslogerror]=useState(false);
    useEffect(() => {
        axios.get("http://localhost:8080/sportsmate/match/my")
                                .then(function (response) {
                                    if(response.status == 200){
                                        setMatchs(response.data)
                                        console.log(matchs)
                                    }
                            }).catch(function (error) {
                                    if(error.response.status==401)
                                    setIslogerror(true)
                                    else
                                    console.log(error);
                                });
    }, [])
    const[currentPage,setCurrentPage]=useState(0);
    const handleClick=(e, index)=>{
        e.preventDefault();   
        setCurrentPage(index);
    }
    const pageSize = 4;
    const pagesCount = Math.ceil(matchs.length / pageSize);
    let content=null;
    if(matchs.length==0){
        if(islogerror){
            content=<div style={{height:500,display:"flex",width:"100%"}}><div style={{margin:"auto"}}><h1>로그인후 파티를 이용해보세요</h1></div></div>
        }
        else
    content=<div style={{height:500,display:"flex",width:"100%"}}><div style={{margin:"auto"}}><h1>현재 남은 경기가 없습니다.</h1></div></div>
    }
    return (
        <div>
            <div className="spacer" id="pagination-component">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="7" className="text-center">
                            <h1 className="title font-bold">My Match</h1>
                            <h6 className="subtitle">나의 경기 목록</h6>
                        </Col>
                    </Row>
                </Container>
                <Container>
            <ul className='mList'>
                <div style={{height:500,width:"100%"}}>
                {
                    matchs.slice(
                        currentPage*pageSize,
                        (currentPage+1)*pageSize
                    ).map(p => {
                        return (
                            <li className='mItem'>
                                <Link href={`/mymatch/${p.id}/info`}>
                                    <div className='mUri' >
                                        <div class ="mcover">
                                            <div className='mImage'>
                                                <span className='mInner'>
                                                <Image src={footballimg} alt="모임소개사진"/>
                                                </span>
                                            </div>
                                        </div>
                                        <div class ="mName">
                                            <strong class="name"><a>{'종목:'+p.sportsName}</a></strong>
                                            <strong class="name"><a>{'지역:'+p.location}</a></strong>
                                            <p className="pSubTxt">{'경기시간: '+ p.startTime + ~ + p.endTime}</p>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        )
                    })
                }
                {content}
                </div>
            </ul>
            <div className="pagination-wrapper">
          
                <Pagination aria-label="Page navigation example">
                    
                    <PaginationItem disabled={currentPage <= 0}>
                    
                    <PaginationLink
                        onClick={e => handleClick(e, currentPage - 1)}
                        previous
                        href="#"
                    />
                    
                    </PaginationItem>

                    {[...Array(pagesCount)].map((page, i) => 
                    <PaginationItem active={i === currentPage} key={i}>
                        <PaginationLink onClick={e => handleClick(e, i)} href="#">
                        {i + 1}
                        </PaginationLink>
                    </PaginationItem>
                    )}

                    <PaginationItem disabled={currentPage >= pagesCount - 1}>
                    
                    <PaginationLink
                        onClick={e => handleClick(e, currentPage + 1)}
                        next
                        href="#"
                    />
                    
                    </PaginationItem>
                    
                </Pagination>
            </div>
            </Container>
            </div>
        </div>
    );
}

export default MatchList;
