import { getToken } from "../utilities/auth";

const config = {
    SERVER_URL: "http://localhost:3050",
    // SERVER_URL: "https://e-shop-backend.skdhar.com",
    headers: {
        headers: {
          Authorization: "Bearer " + getToken(),
          Accept: "application/json",
        },
      }
}
export default config;