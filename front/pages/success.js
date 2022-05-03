
import Head from "next/head";
import Link from "next/link";
import { Container, Row, Col, Button } from "reactstrap";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

var secretKey = "test_sk_JQbgMGZzorzwlMpMwxk8l5E1em4d";

export default function Success() {
    const router = useRouter();
    const { orderId,paymentKey,amount } = router.query;
    useEffect(() => {
      if(!router.isReady)
        return;
      console.log(`orderId = ${orderId} ,paymentkey = ${paymentKey},amount = ${amount}입니다.`);
      axios.post(`https://api.tosspayments.com/v1/payments/${paymentKey}`,{
        orderId: orderId,
        amount: amount,
      } ,{
        headers: {'Authorization' : `Basic ${Buffer.from(secretKey + ":").toString("base64")}`,
        'Content-Type' : `application/json`
      },
        responseType:'json'
      })
      .then(function (response) {
         return axios.post("http://localhost:8080/sportsmate/member/deposit",{
          credit : response.data.totalAmount
        });
      
      }).catch(((error)=>{
        console.log(error);
      }));
    }, [router.isReady]);
    return (
  
      <div className="static-slider-head">
      </div>
    );
  };