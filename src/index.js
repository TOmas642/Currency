const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
  var formular = "<form action='/' method='post'>";
  formular +=
    "<input type='text' name='amount' placeholder='Zadej množství peněz' />";
  formular += "<select name='currencyFrom'>";
  formular += "<option value='CZK'>Česká koruna</option>";
  formular += "<option value='EUR'>Euro</option>";
  formular += "<option value='USD'>Dolar</option>";
  formular += "<option value='GBP'>Libra šterlinků</option>";
  formular += "<option value='RUB'>Ruský rubl</option>";
  formular += "</select>";
  formular += "<select name='currencyTo'>";
  formular += "<option value='CZK'>Česká koruna</option>";
  formular += "<option value='EUR'>Euro</option>";
  formular += "<option value='USD'>Dolar</option>";
  formular += "<option value='GBP'>Libra šterlinků</option>";
  formular += "<option value='RUB'>Ruský rubl</option>";
  formular += "</select>";
  formular += "<button type='submit' name='button'>Převeď!</button>";
  formular += "</form>";
  res.send("<h1>Super Exchange</h1>" + "Množství:" + formular);
});
app.post("/", function(req, res) {
  var url = "https://api.exchangeratesapi.io/latest?base=";
  url += req.body.currencyFrom;

  var options = {
    url: url,
    method: "GET"
  };

  request(options, function(error, response, body) {
    var data = JSON.parse(body);
    var price = data.rates[req.body.currencyTo] * req.body.amount;
    res.send(
      "<h1>Převodník měn</h1>" +
        "Cena " +
        req.body.amount +
        " " +
        req.body.currencyFrom +
        " odpovídá " +
        price.toFixed(3) +
        " " +
        req.body.currencyTo +
        " Dne: " +
        data.date.replace(/-/g, " ")
    );
  });
});

app.listen(8080, function() {
  console.log("Server běží na portu 8080.");
});
