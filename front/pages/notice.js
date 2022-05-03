import Head from "next/head";
import NoticeList from "../components/custom/notice/noticelist";
import React from "react";

export default function Home() {

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
      <NoticeList />
    </div>
  );
}