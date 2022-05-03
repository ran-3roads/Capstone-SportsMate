
import Head from "next/head";
import Link from "next/link";
import { Container, Row, Col, Button } from "reactstrap";
import axios from "axios";
import { useState, useEffect } from "react";
import { loadTossPayments } from '@tosspayments/payment-sdk'
import { useRouter } from "next/router";
import got from 'react-got';
var uuid = require("uuid").v4;
var secretKey = "test_ak_ZORzdMaqN3wQd5k6ygr5AkYXQGwy";

export default function Success() {
    const router = useRouter();
    const { orderId,paymentKey,amount } = router.query;
    console.log(orderId,paymentKey,amount);
    useEffect(() => {
      axios.post("https://api.tosspayments.com/v1/payments/" + paymentKey, {
        headers: {
          Authorization:
            "Basic " + Buffer.from(secretKey + ":").toString("base64"),
          "Content-Type": "application/json",
        },
        json: {
          orderId: orderId,
          amount: amount,
        },
        responseType: "json",
      })
      .then(function (response) {
          if(response.status == 202){
          axios.defaults.headers.common['Authorization'] = response.headers.authorization;
         return axios.post("http://localhost:8080/sportsmate/member/deposit",{
          credit : amount
        });
      }
      });
    }, []);
    return (
  
      <div className="static-slider-head">
      </div>
    );
  };