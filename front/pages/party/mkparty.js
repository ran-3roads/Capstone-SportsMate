import Head from "next/head";
import Components from "../../components/basic/AllComponents";
import MkpartyForm from "../../components/custom/mkpartyform";

export default function Mkparty() {
  return (
    <div>
      <Head>
        <title>Sports Mate</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MkpartyForm>
      </MkpartyForm>
    </div>
  );
}
