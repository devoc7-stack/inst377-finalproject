# inst377-finalproject
My final project for inst377
This is a game in which the player needs to try to guess as many pokemon as they can without repeating
The game should work on any browser, since it doesn't use any complicated formatting
Dev manual below:


Dev Manual - 
Necessary installs and dependencies: to install, run npm install express body-parser @supabase/supabase-js dotenv autocompleter nodemon
to run on server, simply run node index.js or ndm start
No tests written

API Calls- 
/pokemon function: calls PokeAPI to get a list of all pokemon, processed into a list of the names of every pokemon. Cuts 
at 1025 since those are all the pokemon. Adding all forms of pokemon would be too complicated
/getScores function: calls supabase to get a list of all the scores of people who have played the game before.
used for getting a list of the top 10 scores to be graphed. 
/score: calls supabase to post a new score that has been added to the database. Used to add new scores to be graphed

Known bugs - 
No way to retry without refresh, game gets around this by forcing you to redirect to leaderboard after every play


Future development -
Make the game more interesting by adding randomly generated conditions to each answer, i.e. learns given move, has given ability, is given type
Add a page in between game and leaderboard telling you what score you had and if you were on the leaderboard



