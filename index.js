const express = require('express');
const bodyParser = require('body-parser');
const supabaseClient = require('@supabase/supabase-js');
const dotenv = require('dotenv');
var autocomplete = require("autocompleter");

const app = express();
const port = 3000;
dotenv.config();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey);

app.get('/', (req,res) => {
    res.sendFile('public/home.html', {root: __dirname});
});
app.get('/game', (req,res) => {
    res.sendFile('public/game.html', {root: __dirname});
});
app.get('/about', (req,res) => {
    res.sendFile('public/about.html', {root: __dirname});
});
app.get('/leaderboard', (req,res) => {
    res.sendFile('public/leaderboard.html', {root: __dirname});
});

app.get('/pokemon', async (req, res) => {
  console.log('Attempting to get all pokemon!');

   const url = "https://pokeapi.co/api/v2/pokemon?limit=1025&offset=0";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    
    res.json(result);
  } catch (error) {
    console.error(error.message);
  }
});

app.get('/getScores', async (req, res) => {
  console.log('Attempting to get all scores!');

  const { data, error } = await supabase.from('scores').select();

  if (error) {
    console.log(`Error: ${error}`);
    res.statusCode = 500;
    res.send(error);
  } else {
    console.log('Recieved Data:', data);
    res.json(data);
  }
});


app.post('/score', async (req, res) => {
  console.log('Adding score');
  console.log(`Request: ${JSON.stringify(req.body)}`);

  const playerScore = req.body.playerScore;

  const { data, error } = await supabase
    .from('scores')
    .insert({
      score: playerScore
    })
    .select();

  if (error) {
    console.log(`Error: ${error.message}`);
    res.statusCode = 500;
    res.send(error);
  } else {
    res.json(data);
  }
});

app.listen(port, () => {
  console.log(`App is so available on port: ${port}`);
});
