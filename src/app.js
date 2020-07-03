// NPM modules
const path = require("path");
const express = require("express");
const hbs = require("hbs");
const request = require("postman-request");

// Custom utils
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

const app = express();

// Setup handlebars and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

const name = "Dom Schweyer";

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name,
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "This is the help page.",
    name,
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    message: "About me",
    name,
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please enter a location.",
    });
  } else {
    const address = req.query.address;
    geocode(address, (error, { lat, long, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      console.log("Weather for", location);
      forecast(lat, long, (error, forecastData = {}) => {
        if (error) {
          return res.send({ error });
        }
        console.log(forecastData);
        res.send({
          address: req.query.address,
          location,
          forecastData
        });
      });
    });
  }
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Missing help article",
    name,
    message: "Go back to the help page!",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Page not found.",
    name,
    message: "Go back home...",
  });
});

app.listen(3000, () => {
  console.log("Running...");
});
