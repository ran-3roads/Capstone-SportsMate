import Head from "next/head";
import MymatchInfoForm from "../../../components/custom/mymatchinfoform";

export default function MymatchInfo() {
  return (
    <div>
      <Head>
        <title>Sports Mate</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MymatchInfoForm>
      </MymatchInfoForm>
    </div>
  );
}