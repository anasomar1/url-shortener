import express from "express";
import mongoose from "mongoose";
import ShortUrl from "./models/shortUrl.js";
import prependHttp from "prepend-http";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://127.0.0.1:5500" }));

mongoose.connect("mongodb://localhost/urlShortener");

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  ShortUrl.find().then((data) => res.send(data));
});

app.post("/shortUrl", (req, res) => {
  const fullUrl = prependHttp(req.body.fullUrl);
  ShortUrl.create({ full: fullUrl }).then((data) => res.send(data));
});

app.get("/:shortUrl", (req, res) => {
  ShortUrl.findOne({ short: req.params.shortUrl })
    .then((url) => res.redirect(url.full))
    .catch(() => res.send("لم يتم العثور على الرابط"));
});

app.listen(PORT, () => console.log("Server is running on port", PORT));
