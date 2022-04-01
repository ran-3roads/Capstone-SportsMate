import Head from "next/head";
import Components from "../components/basic/AllComponents";
import SignupForm from "../components/custom/signupform";

export default function Signup() {
  return (
    <div>
      <Head>
        <title>Sports Mate</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SignupForm>
      </SignupForm>
    </div>
  );
}
