// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});



app.get("/api/:date", function (req, res) {
  let dateParam = req.params.date
  let isValidDate = Date.parse(dateParam);
  let isValidUnixNumber = /^[0-9]+$/.test(dateParam)

  let unix_output = 0;
  let utc_output = "";

  if (isValidDate) {
    unix_output = new Date(dateParam);
    utc_output = unix_output.toUTCString();
    return res.json({ unix: unix_output.valueOf(), utc: utc_output });
  }
  else if (isNaN(isValidDate) && isValidUnixNumber) {
    unix_output = new Date(parseInt(dateParam));
    utc_output = unix_output.toUTCString();
    return res.json({ unix: unix_output.valueOf(), utc: utc_output });
  }
  else {
    res.json({ error: "Invalid Date" });
  }
});

app.get("/api", (req, res) => {
  unix_output = new Date();
  utc_output = unix_output.toUTCString();
  return res.json({ unix: unix_output.valueOf(), utc: utc_output });
})




// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
