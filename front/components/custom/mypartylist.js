/* eslint-disable */
import Image from "next/image";
import React from "react";
import Link from "next/link";
import {
  Pagination,
  PaginationItem,
  PaginationLink,
  Container,
  Row,
  Col,
} from "reactstrap";
import noimg from "../../assets/images/landingpage/noimg.png";
import { useState, useEffect } from "react";
import axios from "axios";

const MPList = () => {
  const [partys, setPartys] = useState([]);
  const [islogerror, setIslogerror] = useState(false);
  useEffect(() => {
    axios
      .get("/party/myparty")
      .then(function (response) {
        if (response.status == 200) {
          setPartys(response.data);
          console.log(partys);
        }
      })
      .catch(function (error) {
        if (error.response.status == 401) setIslogerror(true);
        else console.log(error);
      });
  }, []);
  const [currentPage, setCurrentPage] = useState(0);
  const handleClick = (e, index) => {
    e.preventDefault();
    setCurrentPage(index);
  };
  const pageSize = 4;
  const pagesCount = Math.ceil(partys.length / pageSize);
  let content = null;
  if (partys.length == 0) {
    if (islogerror) {
      content = (
        <div style={{ height: 500, display: "flex", width: "100%" }}>
          <div style={{ margin: "auto" }}>
            <h1>로그인후 파티를 이용해보세요</h1>
          </div>
        </div>
      );
    } else
      content = (
        <div style={{ height: 500, display: "flex", width: "100%" }}>
          <div style={{ margin: "auto" }}>
            <h1>가입한 파티가 없습니다.</h1>
          </div>
        </div>
      );
  }
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
          <ul className="mList">
            <div style={{ height: 500, width: "100%" }}>
              {partys
                .slice(currentPage * pageSize, (currentPage + 1) * pageSize)
                .map((p) => {
                  let sportsname = undefined;
                  if (p.sportsName == "FOOTBALL") sportsname = "풋볼";
                  else if (p.sportsName == "VALLEYBALL") sportsname = "배구";
                  else if (p.sportsName == "BASKETBALL") sportsname = "농구";
                  else if (p.sportsName == "PINGPONG") sportsname = "탁구";
                  else if (p.sportsName == "SOCCER") sportsname = "축구";
                  else if (p.sportsName == "BADMINTON") sportsname = "배드민턴";
                  return (
                    <li className="mItem">
                      <Link href={`/party/${p.id}/info`}>
                        <div className="mUri">
                          <div class="mcover">
                            <div className="mImage">
                              <span className="mInner">
                                <Image
                                  src={`https://capstonesportsmate.s3.ap-northeast-2.amazonaws.com/party/${p.id}.png`}
                                  unoptimized={true}
                                  onError={(e) => {
                                    e.target.src = noimg.src;
                                  }}
                                  width={80}
                                  height={80}
                                />
                              </span>
                            </div>
                          </div>
                          <div class="mName">
                            <strong class="name">
                              <a>{p.title}</a>
                            </strong>
                            <a>
                              {"종목:" + sportsname + "  지역:" + p.location}
                            </a>
                            <p className="pSubTxt">{p.intro}</p>
                          </div>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              {content}
            </div>
          </ul>
          <div className="pagination-wrapper">
            <Pagination aria-label="Page navigation example">
              <PaginationItem disabled={currentPage <= 0}>
                <PaginationLink
                  onClick={(e) => handleClick(e, currentPage - 1)}
                  previous
                  href="#"
                />
              </PaginationItem>

              {[...Array(pagesCount)].map((page, i) => (
                <PaginationItem active={i === currentPage} key={i}>
                  <PaginationLink onClick={(e) => handleClick(e, i)} href="#">
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem disabled={currentPage >= pagesCount - 1}>
                <PaginationLink
                  onClick={(e) => handleClick(e, currentPage + 1)}
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
};

export default MPList;
