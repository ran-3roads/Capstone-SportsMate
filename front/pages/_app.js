import "../styles/scss/style.scss";
import Layout from "../layout/Layout";
import axios from "axios";
import cookie from "react-cookies";
import cookies from "next-cookies";

const coa = cookie.loadAll();
const allCookies = cookies(coa);
const refreshTokenByCookie = allCookies["refreshToken"];
axios.defaults.withCredentials = true;
// axios.defaults.baseURL = "http://15.164.164.248:8080/sportsmate";
//axios.defaults.baseURL = "http://localhost:8080/sportsmate";
axios.defaults.baseURL = "https://sportsmate.tk/sportsmate";
let isTokenRefreshing = false;
let refreshSubscribers = [];

const onTokenRefreshed = (accessToken) => {
  refreshSubscribers.map((callback) => callback(accessToken));
};

const addRefreshSubscriber = (callback) => {
  refreshSubscribers.push(callback);
};

axios.interceptors.response.use(
  (response) => {
    // axios.interceptors.response.eject();
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;
    const originalRequest = config;
    if (status === 401) {
      if (!isTokenRefreshing && refreshTokenByCookie != undefined) {
        // isTokenRefreshing이 false인 경우에만 token refresh 요청
        isTokenRefreshing = true;
        setTimeout(async () => {
          try {
            const { headers } = await axios.post(`/member/public/reissue`); // token refresh api
            // 새로운 토큰 저장
            const accessToken = headers.authorization;
            axios.defaults.headers.common["Authorization"] = accessToken;
            // 새로운 토큰으로 지연되었던 요청 진행
            onTokenRefreshed(accessToken);
          } catch (e) {
            if (e.response.status == 408) {
              alert("세션이 만료되었습니다.");
            }
          }
        }, 0);
      }
      // token이 재발급 되는 동안의 요청은 refreshSubscribers에 저장
      const retryOriginalRequest = new Promise((resolve) => {
        addRefreshSubscriber((accessToken) => {
          resolve(axios(originalRequest));
        });
      });
      return retryOriginalRequest;
    }
    return Promise.reject(error);
  }
);

let MyApp = ({ Component, pageProps }) => (
  <Layout>
    <Component {...pageProps} />
  </Layout>
);

export default MyApp;
