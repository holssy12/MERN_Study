const express = require("express");
const bodyParser = require("body-parser");

const placesRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());

app.use("/api/places", placesRoutes); // => /api/places/...
app.use("/api/users", usersRoutes); // => /api/users/...

// 응답받지 못하는 요청이 있을 때 실행되는 미들웨어
app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  // res.headerSent : 응답이 이미 전송되었는지 확인하는 프로퍼티이다.
  if (res.headerSent) {
    return next(error);
  }

  // 전달되는 error 객체에서 상태 코드(code) 이미 정의되어 있다면 해당 상태 코드가 반환되고,
  // 그렇지 않다면 500이 반환된다.
  // 그리고 error 객체에서 메시지(message)가 이미 정의되어 있다면 해당 메시지가 반환되고,
  // 그렇지 않다면 "An unknown error occurred!"가 반환된다.
  // 이렇게 오류 메시지를 클라이언트가 받을 수 있도록 하는 게 관습이다.
  res
    .status(error.code || 500)
    .json({ message: error.message || "An unknown error occurred!" });
});

// 2023.03.27 kjh
// /home URL에 대한 GET 요청이 들어오면, 200 상태 코드와 함께 JSON 데이터를 반환한다.
// 이렇게 하면, 클라이언트가 /home URL에 대한 GET 요청을 보내면, JSON 데이터를 받을 수 있다.
app.get("/home", (req, res, next) => {
  res.status(200).json({ message: "This is the home page!" });
});

app.listen(5000);
