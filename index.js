function getLocation() {
    const successCallBack = (position) => {
            const map = new google.maps.Map(document.getElementById('map'), {
                zoom: 8,
                center: { lat: position.coords.latitude, lng: position.coords.longitude }
            });
    };
    const errorCallBack = (error) => {
            console.error(error);
    };
    navigator.geolocation.getCurrentPosition(successCallBack, errorCallBack)
}

function getReportLocation() {
    const successCallBack = (position) => {
       center: { lat: position.coords.latitude, lng: position.coords.longitude }
    };
    const errorCallBack = (error) => {
            console.error(error);
    };
    navigator.geolocation.getCurrentPosition(successCallBack, errorCallBack)
}
// import fs from 'fs';
// import { Pool } from 'pg';

// Configure the database connection.

// const config = {
//   user: "joying",
//   password: "A1#stayinasafespace",
//   host: 'free-tier.gcp-us-central1.cockroachlabs.cloud',
//   database: "happy-lamb-1147.reports",
//   port: 26257,
//   // ssl: {
//   //   rejectUnauthorized: false,
//   // },
//   //For secure connection:
//   ssl: {
//         ca: fs.readFileSync('certs/cc-ca.crt')
//             .toString()
//     }
// };

// Create a connection pool
//
// const pool = new Pool(config);
//
// var VerbalLocations = [
//   { lat: -40.618124, lng: 175.963181 },
//   { lat: -40.88124, lng: 176.963181 }
// ];
// var StalkLocations;
// var PhysicalLocations;

function initMap(){
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: ,
        // center: {lat: 49.2827, lng: -123.1207}
        center: { lat: -25.344, lng: 131.036 }
    });
    // const client = await pool.connect();
    // const resp = client.query("SELECT lat, lng FROM reports.stalk");

    const data = {
      'type': 'verbal',
      'lat': -33.827293,
      'lng': 150.202919,
      'time': '02/19/2021 11:33',
      'context': 'goddd'
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    fetch('http://localhost:5000', options);


    fetch("http://localhost:5000", { referrerPolicy: 'no-referrer-when-downgrade' })
      .then(resp => resp.json())
      .then(resp=> {
          const StalkLocations = resp.stalkLocations;
          const StalkImage =
          "http://maps.google.com/mapfiles/ms/icons/green-dot.png" ;
          const StalkMarkers = StalkLocations.map((location, i) => {
              return new google.maps.Marker({
                  position: location,
                  icon: StalkImage,
                  map: map,
              });
          });

          const PhysicalLocations = resp.physicalLocations;
          const PhysicalImage =
          "http://maps.google.com/mapfiles/ms/icons/red-dot.png" ;
          const PhysicalMarkers = PhysicalLocations.map((location, i) => {
              return new google.maps.Marker({
                  position: location,
                  icon: PhysicalImage,
                  map: map,
              });
          });

          const VerbalLocations = resp.verbalLocations;
          const VerbalImage =
          "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" ;
          const VerbalMarkers = VerbalLocations.map((location, i) => {
              return new google.maps.Marker({
                  position: location,
                  icon: VerbalImage,
                  map: map,
              });
          });
        })


    //StalkLocations = resp.rows.map(({ lat, lng }) => ({ lat: parseFloat(lat), lng: parseFloat(lng) }));
    // const VerbalImage =
    // "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" ;
    // const VerbalMarkers = VerbalLocations.map((location, i) => {
    //     return new google.maps.Marker({
    //         position: location,
    //         icon: VerbalImage,
    //         map: map,
    //     });
    // });
    //
    // const PhysicalImage =
    // "http://maps.google.com/mapfiles/ms/icons/red-dot.png" ;
    // const PhysicalMarkers = PhysicalLocations.map((location, i) => {
    //     return new google.maps.Marker({
    //         position: location,
    //         icon: PhysicalImage,
    //         map: map,
    //     });
    // });


}


//
// pool.connect(function(err) {
//   if (err) throw err;
//   pool.query("SELECT lat, lng FROM reports.stalk", function (err, result, fields) {
//     if (err) throw err;
//     StalkLocations = result.rows.map(({ lat, lng }) => ({ lat: parseFloat(lat), lng: parseFloat(lng) }));
//   });
//   pool.query("SELECT lat, lng FROM reports.physical", function (err, result, fields) {
//     if (err) throw err;
//     PhysicalLocations = result.rows.map(({ lat, lng }) => ({ lat: parseFloat(lat), lng: parseFloat(lng) }));
//   });
//   pool.query("SELECT lat, lng FROM reports.verbal", function (err, result, fields) {
//     if (err) throw err;
//     VerbalLocations = result.rows.map(({ lat, lng }) => ({ lat: parseFloat(lat), lng: parseFloat(lng) }));
//   });
// });
// setTimeout(() => {  console.log(StalkLocations); }, 2000);

//
// var VerbalLocations = [
//   { lat: -31.56391, lng: 147.154312 },
//   { lat: -33.718234, lng: 150.363181 },
//   { lat: -33.727111, lng: 150.371124 },
//   { lat: -33.848588, lng: 151.209834 },
//   { lat: -33.851702, lng: 151.216968 },
//   { lat: -34.671264, lng: 150.863657 },
//   { lat: -35.304724, lng: 148.662905 },
//   { lat: -36.817685, lng: 175.699196 },
//   { lat: -36.828611, lng: 175.790222 },
//   { lat: -37.75, lng: 145.116667 },
// ];
// var PhysicalLocations = [
//   { lat: -37.759859, lng: 145.128708 },
//   { lat: -37.765015, lng: 145.133858 },
//   { lat: -37.770104, lng: 145.143299 },
//   { lat: -37.7737, lng: 145.145187 },
//   { lat: -37.774785, lng: 145.137978 },
//   { lat: -37.819616, lng: 144.968119 },
//   { lat: -38.330766, lng: 144.695692 },
// ];
// var StalkLocations = [
//   { lat: -39.927193, lng: 175.053218 },
//   { lat: -41.330162, lng: 174.865694 },
//   { lat: -42.734358, lng: 147.439506 },
//   { lat: -42.734358, lng: 147.501315 },
//   { lat: -42.735258, lng: 147.438 },
//   { lat: -43.999792, lng: 170.463352 },
// ];
//
// //
// //For secure connection:
// const fs = require('fs');
// const { Pool } = require("pg");
//
// // Configure the database connection.
//
// const config = {
//   user: "joying",
//   password: "A1#stayinasafespace",
//   host: 'free-tier.gcp-us-central1.cockroachlabs.cloud',
//   database: "happy-lamb-1147.reports",
//   port: 26257,
//   // ssl: {
//   //   rejectUnauthorized: false,
//   // },
//   //For secure connection:
//   ssl: {
//         ca: fs.readFileSync('certs/cc-ca.crt')
//             .toString()
//     }
// };
//
// // Create a connection pool
//
// const pool = new Pool(config);
//
// pool.connect(function(err) {
//   if (err) throw err;
//   con.query("SELECT * FROM reports.report", function (err, result, fields) {
//     if (err) throw err;
//     console.log(result);
//   });
// });
//



// Wrapper for a transaction.  This automatically re-calls the operation with
// the client as an argument as long as the database server asks for
// the transaction to be retried.
//
// async function retryTxn(n, max, client, operation, callback) {
//   await client.query("BEGIN;");
//   while (true) {
//     n++;
//     if (n === max) {
//       throw new Error("Max retry count reached.");
//     }
//     try {
//       await operation(client, callback);
//       await client.query("COMMIT;");
//       return;
//     } catch (err) {
//       if (err.code !== "40001") {
//         return callback(err);
//       } else {
//         console.log("Transaction failed. Retrying transaction.");
//         console.log(err.message);
//         await client.query("ROLLBACK;", () => {
//           console.log("Rolling back transaction.");
//         });
//         await new Promise((r) => setTimeout(r, 2 ** n * 1000));
//       }
//     }
//   }
// }
//
// // This function is called within the first transaction. It creates a table and inserts some initial values.
//
// async function initTable(client, callback) {
//   await client.query(
//     "CREATE TABLE IF NOT EXISTS accounts (id INT PRIMARY KEY, balance INT);",
//     callback
//   );
//   await client.query(
//     "INSERT INTO accounts (id, balance) VALUES (5, 1000), (6, 250);",
//     callback
//   );
//   await client.query("SELECT id, balance FROM accounts;", callback);
// }
//
// async function transferFunds(client, callback) {
//   const from = 1;
//   const to = 2;
//   const amount = 100;
//   const selectFromBalanceStatement = "SELECT balance FROM accounts WHERE id = $1 ;";
//   const selectFromValues = [from];
//   await client.query(selectFromBalanceStatement, selectFromValues, (err, res) => {
//     if (err) {
//       return callback(err);
//     } else if (res.rows.length === 0) {
//       console.log("account not found in table");
//       return callback(err);
//     }
//     var acctBal = res.rows[0].balance;
//     if (acctBal < amount) {
//       return callback(new Error("insufficient funds"));
//     }
//   });
//
//   const updateFromBalanceStatement = "UPDATE accounts SET balance = balance - $1 WHERE id = $2 ;";
//   const updateFromValues = [amount, from];
//   await client.query(updateFromBalanceStatement, updateFromValues, callback);
//
//   const updateToBalanceStatement = "UPDATE accounts SET balance = balance + $1 WHERE id = $2 ;";
//   const updateToValues = [amount, to];
//   await client.query(updateToBalanceStatement, updateToValues, callback);
//
//   const selectBalanceStatement = "SELECT id, balance FROM accounts;";
//   await client.query(selectBalanceStatement, callback);
// }
//
// // Run the transactions in the connection pool
//
// (async () => {
//   // Connect to database
//   const client = await pool.connect();
//
//   // Callback
//   function cb(err, res) {
//     if (err) throw err;
//
//     if (res.rows.length > 0) {
//       console.log("New account balances:");
//       res.rows.forEach((row) => {
//         console.log(row);
//       });
//     }
//   }
//
//   // Initialize table in transaction retry wrapper
//   console.log("Initializing table...");
//   await retryTxn(0, 15, client, initTable, cb);
//
//   // Transfer funds in transaction retry wrapper
//   console.log("Transferring funds...");
//   await retryTxn(0, 15, client, transferFunds, cb);
//
//   // Exit program
//   process.exit();
// })().catch((err) => console.log(err.stack));
