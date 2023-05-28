const express = require("express");
const mongoose = require("mongoose");
const ShortUrl = require("./models/shortUrl");

const app = express();

mongoose.connect(
  "mongodb+srv://surya:Surya2302@cluster.wonrx31.mongodb.net/?retryWrites=true&w=majority"
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json())
// app.get("/", async (req, res) => {
//   const shortUrls = await ShortUrl.find();
//   res.json(shortUrls)
// });

app.post("/shortUrls", async (req, res) => {
  const url = await ShortUrl.create({ full: req.body.fullUrl });
  res.json(url)
});

app.get("/:shortUrl", async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
  if (!shortUrl) return res.sendStatus(400);

  res.json(shortUrl.full);
});

app.listen(process.env.PORT || 3001);
