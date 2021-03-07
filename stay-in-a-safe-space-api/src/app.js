const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const fs = require('fs');
const { Pool } = require('pg');

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();



// Configure the database connection.

const config = {
  user: "joying",
  password: "A1#stayinasafespace",
  host: 'free-tier.gcp-us-central1.cockroachlabs.cloud',
  database: "happy-lamb-1147.reports",
  port: 26257,
  // ssl: {
  //   rejectUnauthorized: false,
  // },
  //For secure connection:
  ssl: {
        ca: fs.readFileSync('certs/cc-ca.crt')
            .toString()
    }
};

// Create a connection pool

const pool = new Pool(config);

// pool.connect(async function(err) {
//   if (err) throw err;
//   await pool.query("SELECT lat, lng FROM reports.stalk", function (err, result, fields) {
//     if (err) throw err;
//     stalk = result.rows;
//   });
//   await pool.query("SELECT lat, lng FROM reports.physical", function (err, result, fields) {
//     if (err) throw err;
//     physical = result.rows;
//   });
//   await pool.query("SELECT lat, lng FROM reports.verbal", function (err, result, fields) {
//     if (err) throw err;
//     verbal = result.rows;
//   });
// });

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
  const client = await pool.connect();
  const resp = await client.query("SELECT lat, lng FROM reports.stalk");
  StalkLocations = resp.rows.map(({ lat, lng }) => ({ lat: parseFloat(lat), lng: parseFloat(lng) }));
  console.log(StalkLocations);
  const resp2 = await client.query("SELECT lat, lng FROM reports.physical");
  PhysicalLocations = resp2.rows.map(({ lat, lng }) => ({ lat: parseFloat(lat), lng: parseFloat(lng) }));

  const resp3 = await client.query("SELECT lat, lng FROM reports.verbal");
  VerbalLocations = resp3.rows.map(({ lat, lng }) => ({ lat: parseFloat(lat), lng: parseFloat(lng) }));
  res.json({
    stalkLocations: StalkLocations,
    physicalLocations: PhysicalLocations,
    verbalLocations: VerbalLocations
  });
});

app.post('/', async (request, response) => {
  console.log(request.body);
  const client = await pool.connect();
  var type_danger = request.body.type;
  var lat = request.body.lat;
  var lng = request.body.lng;
  var time = request.body.time;
  var context = request.body.context;
  var query_string;
  if (type_danger == 'verbal') {
    console.log(type_danger);
    query_string = "INSERT INTO reports.verbal (lat, lng, time, context) VALUES (" + String(lat) + ", " + String(lng) + ", '" + String(time) + "', '" + String(context) + "');";
    const resp3 = await client.query("SELECT lat, lng FROM reports.verbal");
  } else if (type_danger == 'physical') {
    query_string = "INSERT INTO reports.physical (lat, lng, time, context) VALUES (" + String(lat) + ", " + String(lng) + ", '" + String(time) + "', '" + String(context) + "');";
  } else {
    query_string = "INSERT INTO reports.stalk (lat, lng, time, context) VALUES (" + String(lat) + ", " + String(lng) + ", '" + String(time) + "', '" + String(context) + "');";
  }
  console.log(query_string);
  await client.query(query_string);
});

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
