import "../styles/scss/style.scss";
import Layout from "../layout/Layout";
import axios from "axios";
import cookie from 'react-cookies';
import cookies from "next-cookies";

axios.defaults.withCredentials = true;

const coa = cookie.loadAll();
const allCookies = cookies(coa);
const refreshTokenByCookie = allCookies['refreshToken'];
if(refreshTokenByCookie!=undefined){
axios.get("http://localhost:8080/sportsmate/member/public/reissue")
.then(function (response) {
  axios.defaults.headers.common['Authorization'] = response.headers.authorization;
}).catch(function (error) {
    //error
    console.log(error);
});
};
function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;