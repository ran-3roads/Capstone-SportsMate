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
import Popup from "./popup";
import { Spin } from "antd";
import Link from "next/link";
import "antd/dist/antd.css";

const customer = {
  email: "",
  password: "",
  name: "",
  nickName: "",
  birthDate: "",
  sex: "",
  phoneNumber: "",
};

const SignupForm = () => {
  const [popup, setPopup] = useState({
    open: false,
    title: "",
    message: "",
    callback: false,
  });

  const [email, setEmail] = useState(customer.email);
  const [password, setPassword] = useState(customer.password);
  const [passwordconfirm, setPasswordconfirm] = useState(customer.password);
  const [name, setName] = useState(customer.name);
  const [nickName, setNickname] = useState(customer.nickName);
  const [birthDate, setBirthDate] = useState(customer.birthDate);
  const [sex, setSex] = useState(customer.sex);
  const [phoneNumber, setPhoneNumber] = useState(customer.phoneNumber);
  const [image, setImage] = useState({
    image_file: undefined,
    preview_URL: undefined,
  });
  const [loaded, setLoaded] = useState(false);

  let inputRef;

  const saveImage = (e) => {
    e.preventDefault();
    const fileReader = new FileReader();

    if (e.target.files[0]) {
      setLoaded("loading");
      fileReader.readAsDataURL(e.target.files[0]);
    }
    fileReader.onload = () => {
      setImage({
        image_file: e.target.files[0],
        preview_URL: fileReader.result,
      });
      setLoaded(true);
    };
  };
  const deleteImage = () => {
    setImage({
      image_file: "",
      preview_URL: "img/default_image.png",
    });
    setLoaded(false);
  };
  const sendImageToServer = async (email) => {
    if (image.image_file) {
      const formData = new FormData();
      formData.append("multipartFile", image.image_file);
      formData.append("email", email);
      formData.append("imageCategory", "MEMBER");
      try {
        await axios.post("/file/public/signupimage", formData);
      } catch (error) {
        console.log(error);
        return;
      }
      setPopup({
        open: true,
        title: "Confirm",
        message: "???????????? ??????!",
        callback: function () {
          document.location.href = "/";
        },
      });
    } else {
      alert("????????? ???????????????!");
    }
  };

  const onchangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onchangePassword = (e) => {
    setPassword(e.target.value);
  };
  const onchangePasswordconfirm = (e) => {
    setPasswordconfirm(e.target.value);
  };
  const onchangeName = (e) => {
    setName(e.target.value);
  };
  const onchangeNickName = (e) => {
    setNickname(e.target.value);
  };
  const onchangeBirthDate = (e) => {
    setBirthDate(e.target.value);
  };
  const onchangeSex = (e) => {
    setSex(e.target.value);
  };
  const onchangePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };
  function checkjoin(e) {
    if (e.target.email.value == "") {
      alert("???????????? ??????????????????");
      return false;
    }
    if (password == "") {
      alert("??????????????? ??????????????????");
      return false;
    }
    if (passwordconfirm == "") {
      alert("????????????????????? ??????????????????");
      return false;
    }
    if (passwordconfirm != password) {
      alert("??????????????? ????????? ????????????.");
      return false;
    }
    if (e.target.name.value == "") {
      alert("????????? ??????????????????");
      return false;
    }
    if (e.target.nickName.value == "") {
      alert("????????? ??????????????????");
      return false;
    }
    if (e.target.birthDate.value == "") {
      alert("??????????????? ??????????????????");
      return false;
    }
    if (e.target.sex.value == "") {
      alert("????????? ??????????????????");
      return false;
    }
    if (e.target.phoneNumber.value == "") {
      alert("?????????????????? ??????????????????");
      return false;
    }
    if (e.target.nickName.value == "") {
      alert("????????? ??????????????????");
      return false;
    }
    if (!e.target.checkbox1.checked) {
      alert("????????? ??????????????????");
      return false;
    }
    return true;
  }
  return (
    <div>
      <Popup
        open={popup.open}
        setPopup={setPopup}
        message={popup.message}
        title={popup.title}
        callback={popup.callback}
      />
      <div className="spacer" id="forms-component">
        <Container>
          <Row className="justify-content-center">
            <Col md="7" className="text-center">
              <h1 className="title font-bold">????????????</h1>
              <h6 className="subtitle">
                ??????????????? ?????? Sports Mate??? ??????????????????
              </h6>
            </Col>
          </Row>
        </Container>
      </div>
      <Container>
        <Row>
          <Col md="12">
            <Form
              className="col"
              id="signupForm"
              onSubmit={function (event) {
                event.preventDefault();
                if (checkjoin(event)) {
                  console.log();
                  axios
                    .post("/member/public/signup", {
                      email: event.target.email.value,
                      password: event.target.password.value,
                      name: event.target.name.value,
                      nickName: event.target.nickName.value,
                      birthDate: event.target.birthDate.value,
                      sex: event.target.sex.value,
                      phoneNumber: event.target.phoneNumber.value,
                    })
                    .then(function (response) {
                      if (image.image_file != undefined)
                        sendImageToServer(response.data.email);
                      else
                        setPopup({
                          open: true,
                          title: "Confirm",
                          message: "???????????? ??????!",
                          callback: function () {
                            document.location.href = "/";
                          },
                        });
                    })
                    .catch(function (error) {
                      //error
                      console.log(error);
                    });
                }
              }}
            >
              <FormGroup className="col-md-6">
                <Label htmlFor="email">Email ?????????</Label>
                <Input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={onchangeEmail}
                />
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label htmlFor="password">????????????</Label>
                <Input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={onchangePassword}
                />
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label htmlFor="confirmpwd">???????????? ??????</Label>
                <Input
                  type="password"
                  className="form-control"
                  id="confirmpassword"
                  placeholder="Confirm Password"
                  value={passwordconfirm}
                  onChange={onchangePasswordconfirm}
                />
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label htmlFor="name">??????</Label>
                <Input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter Username"
                  value={name}
                  onChange={onchangeName}
                />
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label htmlFor="nickName">??????</Label>
                <Input
                  type="text"
                  className="form-control"
                  id="nickName"
                  placeholder="Enter Nickname"
                  value={nickName}
                  onChange={onchangeNickName}
                />
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label htmlFor="birthDate">????????????</Label>
                <Input
                  type="date"
                  name="birthDate"
                  placeholder="date placeholder"
                  value={birthDate}
                  onChange={onchangeBirthDate}
                />
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label htmlFor="sex">??????</Label>
                <Input
                  type="select"
                  name="sex"
                  value={sex}
                  onChange={onchangeSex}
                >
                  <option value="MALE">??????</option>
                  <option value="FEMALE">??????</option>
                </Input>
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label htmlFor="phoneNumber">???????????????</Label>
                <Input
                  type="text"
                  className="form-control"
                  id="phoneNumber"
                  placeholder="Enter Phone Number"
                  value={phoneNumber}
                  onChange={onchangePhoneNumber}
                />
              </FormGroup>
              <FormGroup className="col-md-6">
                <Label htmlFor="image">????????? ????????? ?????????</Label>
                <div className="uploader-wrapper">
                  <div className="upload-button">
                    <Button
                      className="btn btn-success waves-effect waves-light m-r-10"
                      onClick={() => inputRef.click()}
                    >
                      ????????? ????????????
                    </Button>
                    <Button
                      className="btn btn-success waves-effect waves-light m-r-10"
                      onClick={deleteImage}
                      danger
                    >
                      ????????? ??????
                    </Button>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={saveImage}
                    ref={(refParam) => (inputRef = refParam)}
                    style={{ display: "none" }}
                  />
                  <div className="img-wrapper">
                    {loaded === false || loaded === true ? (
                      <img src={image.preview_URL} />
                    ) : (
                      <Spin className="img-spinner" tip="????????? ???????????????" />
                    )}
                  </div>
                </div>
              </FormGroup>
              <FormGroup className="col-md-6">
                <Input id="checkbox1" type="checkbox" />
                <Label htmlFor="checkbox1"> ???????????? </Label>
              </FormGroup>
              <FormGroup className="col-md-6">
                <Button
                  type="submit"
                  className="btn btn-success waves-effect waves-light m-r-10"
                >
                  ????????????
                </Button>
                <Link href={`/`}>
                  <Button
                    type="reset"
                    className="btn btn-inverse waves-effect waves-light"
                  >
                    ??????
                  </Button>
                </Link>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignupForm;
