const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

let name = "Olya";
const arr = ["test"];

app.get("/", function (req, res) {
  res.render("index", {
    name: name,
    arr: arr,
  });
});
app.get("/create", (req, res) => res.render("create"));
app.post("/create", (req, res) => {
  arr.push(req.body.text);
  res.redirect("/");
});

app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});
