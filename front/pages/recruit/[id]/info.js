import Head from "next/head";
import RecruitSignupForm from "../../../components/custom/recruitsignupform";

export default function RecruitInfo() {
  return (
    <div>
      <Head>
        <title>Sports Mate</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RecruitSignupForm>
      </RecruitSignupForm>
    </div>
  );
}