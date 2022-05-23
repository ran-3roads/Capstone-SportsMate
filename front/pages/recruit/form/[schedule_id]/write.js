import React from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import { useState } from "react";
import axios from "axios";
import Popup from "../../../../components/custom/popup";
import { useRouter } from "next/router";

const write = {
  title: "",
  contents: "",
};

const Write = () => {
  const router = useRouter();
  const { schedule_id } = router.query;
  const [popup, setPopup] = useState({
    open: false,
    title: "",
    message: "",
    callback: false,
  });

  const [title, setTitle] = useState(write.title);
  const [contents, setContents] = useState(write.contents);

  const onchangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const onchangeContents = (e) => {
    setContents(e.target.value);
  };

  return (
    <div>
      <h2 align="center">용병모집글 작성</h2>
      <Popup
        open={popup.open}
        setPopup={setPopup}
        message={popup.message}
        title={popup.title}
        callback={popup.callback}
      />
      <Container>
        <Row>
          <Col md="12">
            <Form
              className="col"
              id="WirteForm"
              onSubmit={function (event) {
                event.preventDefault();
                if (
                  event.target.title.value == "" ||
                  event.target.contents.value == ""
                ) {
                  if (event.target.title.value == "") {
                    alert("제목을 입력해주세요");
                  } else if (event.target.contents.value == "") {
                    alert("내용을 입력해주세요");
                  }
                } else {
                  axios
                    .post(`/match/board/create/${schedule_id}`, {
                      title: event.target.title.value,
                      contents: event.target.contents.value,
                    })
                    .then(function (response) {
                      //받는거
                      if (response.status == 200) {
                        setPopup({
                          open: true,
                          title: "Confirm",
                          message: "작성완료!",
                          callback: function () {
                            router.push(`/recruit`);
                          },
                        });
                      }
                    })
                    .catch(function (error) {
                      //error
                      console.log(error.status);
                    });
                }
              }}
            >
              <FormGroup className="col-md-6">
                <Label htmlFor="title">제목을 입력해주세요</Label>
                <Input
                  type="text"
                  className="form-control"
                  id="title"
                  placeholder="제목"
                  value={title}
                  onChange={onchangeTitle}
                />
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label htmlFor="phoneNumber">내용을 입력해주세요</Label>
                <textarea
                  rows="10"
                  cols="60"
                  id="contents"
                  placeholder="내용"
                  value={contents}
                  onChange={onchangeContents}
                />
              </FormGroup>
              <FormGroup className="col-md-6">
                <Button
                  type="submit"
                  className="btn btn-success waves-effect waves-light m-r-10"
                >
                  저장
                </Button>
                <Button
                  type="reset"
                  className="btn btn-inverse waves-effect waves-light"
                >
                  취소
                </Button>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Write;
