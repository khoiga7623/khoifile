const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressJwt = require("express-jwt");
const errorHandling = require("./middleware/error");
require("pretty-error").start();
if (!process.env.PORT) require("dotenv-flow").config({ path: "environments/" });

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(
  expressJwt({ secret: process.env.JWT_SECRET }).unless({
    path: [
      "/api/login",
      { url: "/api/news", methods: ["GET"] },
      { url: "/api/clubs", methods: ["GET"] },
      { url: "/api/news-by-user", methods: ["GET"] },
      { url: /^\/api\/file\/.*/, methods: ["GET"] },
      { url: /^\/api\/news\/.*/, methods: ["GET"] },
      { url: /^\/api\/user\/.*/, methods: ["GET"] }
    ]
  })
);

// Router
app.use(require("./routes"));

// Error handler, send stacktrace only during development
app.use(errorHandling);

// Run
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Server is running at " + PORT);
});
