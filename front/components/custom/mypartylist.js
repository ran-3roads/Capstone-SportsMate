/* eslint-disable */
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Pagination, PaginationItem, PaginationLink, Container, Row, Col } from 'reactstrap';
import footballimg from "../../assets/images/landingpage/football.png";
import { useState } from "react";


const MPList = () => {
    const[currentPage,setCurrentPage]=useState(0);
    const handleClick=(e, index)=>{
        e.preventDefault();   
        setCurrentPage(index);
    }
    const pageSize = 4;
    const partys = [
        {
            party_id:1 ,
            sports_name:'풋살',
            intro:'성북구 풋살을 좋아하고 모임에 관심있는분들 같이파티해요',
            location: '성북구',
            since_date:'2022-4-18',
            title: '성풋모1', 
            infoimg: footballimg
        },
        {
            party_id:2 ,
            sports_name:'풋살',
            intro:'성북구 풋살을 좋아하고 모임에 관심있는분들 같이파티해요',
            location: '성북구',
            since_date:'2022-4-18',
            title: '성풋모2', 
            infoimg: footballimg
        },
        {
            party_id:3 ,
            sports_name:'풋살',
            intro:'성북구 풋살을 좋아하고 모임에 관심있는분들 같이파티해요',
            location: '성북구',
            since_date:'2022-4-18',
            title: '성풋모3', 
            infoimg: footballimg
            },
        {
            party_id:4 ,
            sports_name:'풋살',
            intro:'성북구 풋살을 좋아하고 모임에 관심있는분들 같이파티해요',
            location: '성북구',
            since_date:'2022-4-18',
            title: '성풋모4', 
            infoimg: footballimg
        },
        {
           party_id:5 ,
            sports_name:'풋살',
            intro:'성북구 풋살을 좋아하고 모임에 관심있는분들 같이파티해요',
            location: '성북구',
            since_date:'2022-4-18',
            title: '성풋모5', 
            infoimg: footballimg
        },
        {
            party_id:6 ,
             sports_name:'풋살',
             intro:'성북구 풋살을 좋아하고 모임에 관심있는분들 같이파티해요',
             location: '성북구',
             since_date:'2022-4-18',
             title: '성풋모6', 
             infoimg: footballimg
         },
         {
            party_id:7 ,
             sports_name:'풋살',
             intro:'성북구 풋살을 좋아하고 모임에 관심있는분들 같이파티해요',
             location: '성북구',
             since_date:'2022-4-18',
             title: '성풋모7', 
             infoimg: footballimg
         },
         {
            party_id:8 ,
             sports_name:'풋살',
             intro:'성북구 풋살을 좋아하고 모임에 관심있는분들 같이파티해요',
             location: '성북구',
             since_date:'2022-4-18',
             title: '성풋모8', 
             infoimg: footballimg
         },
         {
            party_id:9 ,
             sports_name:'풋살',
             intro:'성북구 풋살을 좋아하고 모임에 관심있는분들 같이파티해요',
             location: '성북구',
             since_date:'2022-4-18',
             title: '성풋모9', 
             infoimg: footballimg
         },
         {
            party_id:10 ,
             sports_name:'풋살',
             intro:'성북구 풋살을 좋아하고 모임에 관심있는분들 같이파티해요',
             location: '성북구',
             since_date:'2022-4-18',
             title: '성풋모10', 
             infoimg: footballimg
         },
         {
            party_id:11 ,
             sports_name:'풋살',
             intro:'성북구 풋살을 좋아하고 모임에 관심있는분들 같이파티해요',
             location: '성북구',
             since_date:'2022-4-18',
             title: '성풋모11', 
             infoimg: footballimg
         },
         {
            party_id:12 ,
             sports_name:'풋살',
             intro:'성북구 풋살을 좋아하고 모임에 관심있는분들 같이파티해요',
             location: '성북구',
             since_date:'2022-4-18',
             title: '성풋모12', 
             infoimg: footballimg
         },
         {
            party_id:13 ,
             sports_name:'풋살',
             intro:'성북구 풋살을 좋아하고 모임에 관심있는분들 같이파티해요',
             location: '성북구',
             since_date:'2022-4-18',
             title: '성풋모13', 
             infoimg: footballimg
         },
         {
            party_id:14 ,
             sports_name:'풋살',
             intro:'성북구 풋살을 좋아하고 모임에 관심있는분들 같이파티해요',
             location: '성북구',
             since_date:'2022-4-18',
             title: '성풋모14', 
             infoimg: footballimg
         },
         {
            party_id:15 ,
             sports_name:'풋살',
             intro:'성북구 풋살을 좋아하고 모임에 관심있는분들 같이파티해요',
             location: '성북구',
             since_date:'2022-4-18',
             title: '성풋모15', 
             infoimg: footballimg
         },
    ];

    const pagesCount = Math.ceil(partys.length / pageSize);

    
    return (
        <div>
            <div className="spacer" id="pagination-component">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="7" className="text-center">
                            <h1 className="title font-bold">My Party</h1>
                            <h6 className="subtitle">내가가입한 파티목록</h6>
                        </Col>
                    </Row>
                </Container>
                <Container>
            <ul className='mList'>
                {
                    partys.slice(
                        currentPage*pageSize,
                        (currentPage+1)*pageSize
                    ).map(p => {
                        return (
                            <li className='mItem'>
                                <Link href={`/party/${p.party_id}/board`}>
                                    <div className='mUri' >
                                        <div class ="mcover">
                                            <div className='mImage'>
                                                <span className='mInner'>
                                                <Image src={p.infoimg} alt="모임소개사진"/>
                                                </span>
                                            </div>
                                        </div>
                                        <div class ="mName">
                                            <strong class="name"><a>{p.title}</a></strong>
                                            <a>{'종목:'+p.sports_name+'  지역:'+p.location}</a>
                                            <p className="pSubTxt">{p.intro}</p>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        )
                    })
                }
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

export default MPList;
