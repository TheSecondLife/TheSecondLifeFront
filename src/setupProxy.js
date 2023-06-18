// module import -> npm install http-proxy-middleware
// src/setupProxy.js
// import { createProxyMiddleware } from "http-proxy-middleware";
const { createProxyMiddleware } = require("http-proxy-middleware");

// src/setupProxy.js
module.exports = function (app) {
    app.use(
        createProxyMiddleware("/api", {
            target: "http://localhost:8080",
            changeOrigin: true,
        })
    );
};
