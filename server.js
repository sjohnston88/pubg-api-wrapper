
const fetch = require('node-fetch');
const express = require('express');
const https = require('https');
const app = express();

const players = [
  "NunquamParatus",
  "Yangeance",
  "SonOfLawrence",
  "Shanners",
  "TrackerPad",
  "TarJay",
  "Pundrick",
  "Kathoga",
  "LukeOcean",
  "Potts",
  "Karangz",
  "ShaN-MaN"
];

const host = 'https://api.playbattlegrounds.com/shards/pc-eu/players';
const season = '2018-04';
const region = 'eu';
const mode = 'squad'
const filter = `?filter[playerNames]=${players}`

const headers = {
  'accept': 'application/vnd.api+json',
  'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI1YTdlYTc1MC0xYjAyLTAxMzYtNTY0YS0wMmQ4YTIwZTk4MjQiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNTIyOTM0NTY2LCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6InNhbWpvaG5zdG9ucHViZyIsInNjb3BlIjoiY29tbXVuaXR5IiwibGltaXQiOjEwfQ.5VxcMpZY4MNALdP_7RDJxz7DXZ0V1qNIYaWj7kzAGvg'
};

const getPlayerData = () => {
  return fetch(`${host}${filter}`, {headers: headers})
    .then(response => response.json())
    .then(jsonResponse => {
        console.log(jsonResponse.data);
        return jsonResponse.data;
    })
    .catch(error => console.error(error))
}

// async await function
async function getPlayerDataAsync() {
  let response = await fetch(`${host}${filter}`, {headers: headers});
  let data = await response.json();
  console.log(data);
  return [data];
}

app.get('/api/players', function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.type('application/json');
  res.json(getPlayerDataAsync());
});

app.listen(1234, () => console.log('Application listening on port 1234!'))