import Head from "next/head";
import CustomComponents from "../components/custom/Custom-components";
import React from "react";

export default function Home() {

  return (
    
    <div>
      <Head>
        <title>Sports Mate</title>
        <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/icon.png"></link>
          <link rel="apple-touch-icon" sizes="180x180" href="icon-180x180.png"></link>
          <meta name="theme-color" content="#fff" />
          <meta name="apple-mobile-web-app-capable" content="yes"/>
      </Head>
      <CustomComponents />
    </div>
  );
}