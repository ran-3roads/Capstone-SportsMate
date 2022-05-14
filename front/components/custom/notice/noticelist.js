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
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
const NoticeList = () => {
  const router = useRouter();
  const [notices, setNotices] = useState([]);
  useEffect(() => {
    axios
      .get(`/notice`)
      .then(function (response) {
        if (response.status == 200) {
          setNotices(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  /*
    useEffect(() => {
        axios.get("/party/myparty")
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
  const [currentPage1, setCurrentPage1] = useState(0); //안읽음
  const handleClick1 = (e, index) => {
    e.preventDefault();
    setCurrentPage1(index);
  };
  const [currentPage2, setCurrentPage2] = useState(0); //읽음
  const handleClick2 = (e, index) => {
    e.preventDefault();
    setCurrentPage2(index);
  };
  const pageSize = 5;
  const pagesCount1 = Math.ceil(
    notices.filter((n) => n.noticeStatus == "UNCONFIRM").length / pageSize
  );
  const pagesCount2 = Math.ceil(
    notices.filter((n) => n.noticeStatus == "CONFIRM").length / pageSize
  );
  let content1 = null; //안읽음
  let content2 = null; //읽음
  if (notices.filter((n) => n.noticeStatus == "UNCONFIRM").length == 0) {
    //안읽음
    content1 = (
      <div style={{ height: 500, display: "flex", width: "100%" }}>
        <div style={{ margin: "auto" }}>
          <h1>확인하지않은 알림이 없습니다.</h1>
        </div>
      </div>
    );
  }
  if (notices.filter((n) => n.noticeStatus == "CONFIRM").length == 0) {
    //읽음
    content2 = (
      <div style={{ height: 500, display: "flex", width: "100%" }}>
        <div style={{ margin: "auto" }}>
          <h1>확인한 알림이 없습니다.</h1>
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
              <h1 className="title font-bold">알림</h1>
              <h6 className="subtitle">알림목록</h6>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row className="noticerow">
            <Col className="noticecol">
              <h3>새로운 알림</h3>
              <div style={{ height: 500, width: "100%" }}>
                <ul className="mList">
                  {notices
                    .filter((n) => n.noticeStatus == "UNCONFIRM")
                    .reverse()
                    .slice(
                      currentPage1 * pageSize,
                      (currentPage1 + 1) * pageSize
                    )
                    .map((n) => {
                      if (n.noticeType == "APPLY")
                        return (
                          <a
                            onClick={() => {
                              axios
                                .post(`/notice/${n.noticeId}`)
                                .then(function (response) {
                                  if (response.status == 200) {
                                    router.push(`/party/${n.partyId}/manage`);
                                  }
                                })
                                .catch(function (error) {
                                  console.log(error);
                                });
                            }}
                          >
                            <li className="mItem" key={n.noticeId}>
                              <div className="mUri">
                                <div className="mName">
                                  <strong className="name">
                                    <a>{n.sender}님이 가입요청을 했습니다.</a>
                                  </strong>
                                  <a>시간:{n.sinceDate}</a>
                                </div>
                              </div>
                            </li>
                          </a>
                        );
                      else if (n.noticeType == "MATCHAPPLY")
                        return (
                          <a
                            onClick={() => {
                              axios
                                .post(`/notice/${n.noticeId}`)
                                .then(function (response) {
                                  if (response.status == 200) {
                                    // router.push(`/party/${n.partyId}/manage`)
                                    console.log(response.data);
                                  }
                                })
                                .catch(function (error) {
                                  console.log(error);
                                });
                            }}
                          >
                            <li className="mItem" key={n.noticeId}>
                              <div className="mUri">
                                <div className="mName">
                                  <strong className="name">
                                    <a>
                                      {n.sender}님이 용병 가입요청을 했습니다.
                                    </a>
                                  </strong>
                                  <a>시간:{n.sinceDate}</a>
                                </div>
                              </div>
                            </li>
                          </a>
                        );
                      else if (n.noticeType == "COMPLETEREPLY")
                        return (
                          <a
                            onClick={() => {
                              axios
                                .post(`/notice/${n.noticeId}`)
                                .then(function (response) {
                                  if (response.status == 200) {
                                    console.log(response.data);
                                  }
                                })
                                .catch(function (error) {
                                  console.log(error);
                                });
                            }}
                          >
                            <li className="mItem" key={n.noticeId}>
                              <div className="mUri">
                                <div className="mName">
                                  <strong className="name">
                                    <a>
                                      {n.sender} 파티의 모임이 성사되었습니다.
                                    </a>
                                  </strong>
                                  <a>시간:{n.sinceDate}</a>
                                </div>
                              </div>
                            </li>
                          </a>
                        );
                      else if (n.noticeType == "MATCHREPLY")
                        return (
                          <a
                            onClick={() => {
                              axios
                                .post(`/notice/${n.noticeId}`)
                                .then(function (response) {
                                  if (response.status == 200) {
                                    console.log(response.data);
                                  }
                                })
                                .catch(function (error) {
                                  console.log(error);
                                });
                            }}
                          >
                            <li className="mItem" key={n.noticeId}>
                              <div className="mUri">
                                <div className="mName">
                                  <strong className="name">
                                    <a>
                                      {n.sender} 파티의 용병신청이
                                      수락되었습니다.
                                    </a>
                                  </strong>
                                  <a>시간:{n.sinceDate}</a>
                                </div>
                              </div>
                            </li>
                          </a>
                        );
                      else if (n.state == "BANISH")
                        return (
                          <a
                            onClick={() => {
                              axios
                                .post(`/notice/${n.noticeId}`)
                                .then(function (response) {
                                  if (response.status == 200) {
                                    // router.push(`/party/${n.partyId}/manage`)
                                    console.log(response.data);
                                  }
                                })
                                .catch(function (error) {
                                  console.log(error);
                                });
                            }}
                          >
                            <li className="mItem" key={n.noticeId}>
                              <div className="mUri">
                                <div className="mName">
                                  <strong className="name">
                                    <a>{n.sender}파티에서 추방되었습니다</a>
                                  </strong>
                                  <a>시간:{n.sinceDate}</a>
                                </div>
                              </div>
                            </li>
                          </a>
                        );
                      else
                        return (
                          <a
                            onClick={() => {
                              axios
                                .post(`/notice/${n.noticeId}`)
                                .then(function (response) {
                                  if (response.status == 200) {
                                    router.push(`/party/${n.partyId}/info`);
                                  }
                                })
                                .catch(function (error) {
                                  console.log(error);
                                });
                            }}
                          >
                            <li className="mItem" key={n.noticeId}>
                              <div className="mUri">
                                <div className="mName">
                                  <strong className="name">
                                    <a>
                                      {n.sender}파티 가입신청이 {n.state}
                                      되었습니다.
                                    </a>
                                  </strong>
                                  <a>시간:{n.sinceDate}</a>
                                </div>
                              </div>
                            </li>
                          </a>
                        );
                    })}
                </ul>
                {content1}
              </div>
              <div className="pagination-wrapper">
                <Pagination aria-label="Page navigation example">
                  <PaginationItem disabled={currentPage1 <= 0}>
                    <PaginationLink
                      onClick={(e) => handleClick1(e, currentPage1 - 1)}
                      previous
                      href="#"
                    />
                  </PaginationItem>

                  {[...Array(pagesCount1)].map((page, i) => (
                    <PaginationItem active={i === currentPage1} key={i}>
                      <PaginationLink
                        onClick={(e) => handleClick1(e, i)}
                        href="#"
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  <PaginationItem disabled={currentPage1 >= pagesCount1 - 1}>
                    <PaginationLink
                      onClick={(e) => handleClick1(e, currentPage1 + 1)}
                      next
                      href="#"
                    />
                  </PaginationItem>
                </Pagination>
              </div>
            </Col>
            <Col className="noticecol">
              <h3>확인한 알림</h3>
              <div style={{ height: 500, width: "100%" }}>
                <ul className="mList">
                  {notices
                    .filter((n) => n.noticeStatus == "CONFIRM")
                    .reverse()
                    .slice(
                      currentPage2 * pageSize,
                      (currentPage2 + 1) * pageSize
                    )
                    .map((n) => {
                      if (n.noticeType == "APPLY")
                        return (
                          <a
                            onClick={() => {
                              router.push(`/party/${n.partyId}/manage`);
                            }}
                          >
                            <li className="mItem" key={n.noticeId}>
                              <div className="mUri">
                                <div className="mName">
                                  <strong className="name">
                                    <a>{n.sender}님이 가입요청을 했습니다.</a>
                                  </strong>
                                  <a>시간:{n.sinceDate}</a>
                                </div>
                              </div>
                            </li>
                          </a>
                        );
                      else if (n.noticeType == "MATCHAPPLY")
                        return (
                          <a
                            onClick={() => {
                              // router.push(`/party/${n.partyId}/manage`)
                            }}
                          >
                            <li className="mItem" key={n.noticeId}>
                              <div className="mUri">
                                <div className="mName">
                                  <strong className="name">
                                    <a>{n.sender}님이 용병 요청했습니다.</a>
                                  </strong>
                                  <a>시간:{n.sinceDate}</a>
                                </div>
                              </div>
                            </li>
                          </a>
                        );
                      else if (n.state == "BANISH")
                        return (
                          <li className="mItem" key={n.noticeId}>
                            <div className="mUri">
                              <div className="mName">
                                <strong className="name">
                                  <a>{n.sender}파티에서 추방되었습니다</a>
                                </strong>
                                <a>시간:{n.sinceDate}</a>
                              </div>
                            </div>
                          </li>
                        );
                      else if (n.noticeType == "COMPLETEREPLY")
                        return (
                          <a
                            onClick={() => {
                              router.push(`/mymatch`);
                            }}
                          >
                            <li className="mItem" key={n.noticeId}>
                              <div className="mUri">
                                <div className="mName">
                                  <strong className="name">
                                    <a>
                                      {n.sender} 파티의 모임이 성사되었습니다.
                                    </a>
                                  </strong>
                                  <a>시간:{n.sinceDate}</a>
                                </div>
                              </div>
                            </li>
                          </a>
                        );
                      else if (n.noticeType == "MATCHREPLY")
                        return (
                          <a
                            onClick={() => {
                              router.push(`/mymatch`);
                            }}
                          >
                            <li className="mItem" key={n.noticeId}>
                              <div className="mUri">
                                <div className="mName">
                                  <strong className="name">
                                    <a>
                                      {n.sender}파티의 용병신청이
                                      수락되었습니다.
                                    </a>
                                  </strong>
                                  <a>시간:{n.sinceDate}</a>
                                </div>
                              </div>
                            </li>
                          </a>
                        );
                      else
                        return (
                          <a
                            onClick={() => {
                              router.push(`/party/${n.partyId}/info`);
                            }}
                          >
                            <li className="mItem" key={n.noticeId}>
                              <div className="mUri">
                                <div className="mName">
                                  <strong className="name">
                                    <a>
                                      {n.sender}파티 가입신청이 {n.state}
                                      되었습니다.
                                    </a>
                                  </strong>
                                  <a>시간:{n.sinceDate}</a>
                                </div>
                              </div>
                            </li>
                          </a>
                        );
                    })}
                </ul>
                {content2}
              </div>
              <div className="pagination-wrapper">
                <Pagination aria-label="Page navigation example">
                  <PaginationItem disabled={currentPage2 <= 0}>
                    <PaginationLink
                      onClick={(e) => handleClick2(e, currentPage2 - 1)}
                      previous
                      href="#"
                    />
                  </PaginationItem>

                  {[...Array(pagesCount2)].map((page, i) => (
                    <PaginationItem active={i === currentPage2} key={i}>
                      <PaginationLink
                        onClick={(e) => handleClick2(e, i)}
                        href="#"
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  <PaginationItem disabled={currentPage2 >= pagesCount2 - 1}>
                    <PaginationLink
                      onClick={(e) => handleClick2(e, currentPage2 + 1)}
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
};

export default NoticeList;
