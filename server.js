
const fetch = require('node-fetch');
const express = require('express');
const secrets = require('./secrets.json');
const app = express();

const players = [
  [
    "NunquamParatus", "Yangeance", "Potts",
  ],[
    "Shanners", "ShaN-MaN", "LukeOcean",
  ],[
    "Pundrick", "Kathoga", "TarJay",
  ],[
    "SonOfLawrence", "Karangz", "TrackerPad"
  ]
];

const brokenNames = ["Karangz", "TrackerPad", "TarJay", "SonOfLawrence"];

async function getPlayerDataAsync() {
  let playerData = [];
  const host = 'https://api.playbattlegrounds.com/shards/pc-eu/players?filter[playerNames]=';
  const headers = {
    'accept': 'application/vnd.api+json',
    'Authorization': secrets.API_TOKEN
  }

  for(let i = 0; i < players.length; i++){
    let response = await fetch(`${host}${players[i]}`, {headers: headers});
    let data = await response.json();
    console.log(data);
    playerData.push(data)
  }
  return playerData
}

app.get('/api/players', async function (req, res, next) {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    res.type('application/json');
    res.json( await getPlayerDataAsync() );
  } catch(err) {
    next(err)
  }
});

app.listen(1234, () => console.log('Application listening on port 1234!'))