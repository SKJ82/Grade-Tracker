const express = require("express");
const app = express();
const port = 3000;
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/result_management", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("connected to mongodb"));

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded());

var expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
app.set('layout', 'layouts/layout');

const teachRoutes = require("./routes/teacherRoutes");
const studRoutes = require("./routes/studentRoutes");
app.use("/teacher", teachRoutes);
app.use("/student", studRoutes);

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(port, () => {
  console.log(`app listening on http://localhost:${port}`);
});

app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
