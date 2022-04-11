import Head from "next/head";
import CustomComponents from "../components/custom/Custom-components";
import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";



axios.defaults.baseURL = "https://localhost:8080/sportsmate";
axios.defaults.withCredentials = true;

export default function Home() {
  console.log(axios.defaults.headers.common['Authorization']);

  return (
    
    <div>
      <Head>
        <title>Sports Mate</title>
        <meta
          name="description"
          content="NextJs UI kit | Free UI kit built with bootstrap"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CustomComponents />
    </div>
  );
}