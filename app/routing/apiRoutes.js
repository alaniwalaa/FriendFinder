// import friends.js
var friendData = require("../data/friends.js");
console.log(friendData);
var path = require("path");
module.exports = function(app){

app.get("/api/friends", function(req, res) {
    res.send();
  })
app.post("/api/friends", function(req, res){
  console.log(req.body);
  var userData = req.body;
  var userScores = userData.Scores;
  var totalDiff;
  var bestMatch = {
    name: "", photo: "", friendDiff: 1000
  }
  for (var i=0; i<friendData.length; i++){
    var currentFriend = friendData[i];
    totalDiff = 0;
    for (j=0; j<currentFriend.scores.length; j++){
      var currentFriendScore = currentFriend.scores[j];
      var currentUserScore = userScores[j];
      totalDiff += Math.abs(currentFriendScore - parseInt(currentUserScore));

    }
    if (totalDiff <= bestMatch.friendDiff){
      bestMatch.name = currentFriend.name;
      bestMatch.photo = currentFriend.photo; 
      bestMatch.friendDiff = totalDiff;
    }
  }
  friendData.push(userData);
  res.json(bestMatch);

  // compare request.body questions to friends.js questions

  
    // res.send();

});
}