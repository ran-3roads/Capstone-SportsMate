/* eslint-disable */
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Pagination, PaginationItem, PaginationLink, Container, Row, Col } from 'reactstrap';
import footballimg from "../../assets/images/landingpage/football.png";
import { useState } from "react";


const PList = () => {
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
                            <h1 className="title font-bold">파티검색</h1>
                            <h6 className="subtitle">파티 목록</h6>
                        </Col>
                    </Row>
                </Container>
                <Container>
                <Row>
                <div>
                                    <span className="ps_box">
                                    <select id="mm" aria-label="종목">
										<option value="">종목선택</option>
										  	 			<option value="축구">
                                                            축구
                                                        </option>
										  	 			<option value="풋살">
                                                            풋살
                                                        </option>
										  	 			<option value="배구">
                                                            배구
                                                        </option>
										  	 			<option value="배드민턴">
                                                            배드민턴
                                                        </option>
										  	 			<option value="농구">
                                                            농구
                                                        </option>
										  	 			<option value="탁구">
                                                            탁구
                                                        </option>
										  	
									</select>
                                    </span>
                                    </div>
                                <div>
                                    <span className="ps_box">
                                    <select id="mm" aria-label="장소">
										<option value="">지역선택</option>
										  	 			<option value="강남구">
                                                            강남구
                                                        </option>
										  	 			<option value="강동구">
                                                            강동구
                                                        </option>
										  	 			<option value="강북구">
                                                            강북구
                                                        </option>
										  	 			<option value="강서구">
                                                            강서구
                                                        </option>
										  	 			<option value="관악구">
                                                            관악구
                                                        </option>
										  	 			<option value="광진구">
                                                            광진구
                                                        </option>
										  	 			<option value="구로구">
                                                            구로구
                                                        </option>
										  	 			<option value="금천구">
                                                            금천구
                                                        </option>
										  	 			<option value="노원구">
                                                            노원구
                                                        </option>
										  	 			<option value="도봉구">
                                                            도봉구
                                                        </option>
										  	 			<option value="동대문구">
                                                            동대문구
                                                        </option>
										  	 			<option value="동작구">
                                                            동작구
                                                        </option>
                                                        <option value="마포구">
                                                            마포구
                                                        </option>
                                                        <option value="서대문구">
                                                            서대문구
                                                        </option>
                                                        <option value="서초구">
                                                            서초구
                                                        </option>
                                                        <option value="성동구">
                                                            성동구
                                                        </option>
                                                        <option value="성북구">
                                                            성북구
                                                        </option>
                                                        <option value="송파구">
                                                            송파구
                                                        </option>
                                                        <option value="양천구">
                                                            양천구
                                                        </option>
                                                        <option value="영등포구">
                                                            영등포구
                                                        </option>
                                                        <option value="용산구">
                                                            용산구
                                                        </option>
                                                        <option value="은평구">
                                                            은평구
                                                        </option>
                                                        <option value="종로구">
                                                            종로구
                                                        </option>
                                                        <option value="중구">
                                                            중구
                                                        </option>
                                                        <option value="중랑구">
                                                            중랑구
                                                        </option>
									</select>
                                    </span>
                                    </div>
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
                                <Link href={`/party/${p.party_id}/intro`}>
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

export default PList;
