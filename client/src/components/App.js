import React, { Component } from 'react';
import CommentFeed from './CommentFeed';
import CommentInput from './CommentInput';
import CommentCard from './CommentCard';
import { Grid, Paper } from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';

class App extends Component {
  
  render() {
    const styles = {

      Box: {
        margin: '20px'
      },
      commentCard: {
        float: 'right'
      },
      commentFeed: {
        overflowY: 'scroll',
        height:'80vh',
        position:'relative'
      }
    };

    const user = generateUser();

    return (
      <div>
        <Grid container>
          <Grid item xs={12} lg={6}>
            <Paper style={styles.Box}>
              <div style={styles.commentFeed}>
                <CommentFeed comments={generateSession().comments} user={user} />
              </div>
                <Paper>
                <CommentInput user={user} />
                </Paper>
            </Paper>
          </Grid>
          <Grid item xs={12} lg={6}>
            <div style={styles.Box}>
              <div style={styles.commentCard}>
                <CommentCard user={user}/>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;

/** OBJECT DEFINITIONS 
  * ======================================================================= 
  *     - Comment { 
  *         - user        (User)      : comment owner or "Anonymous"
  *         - content     (string)    : comment content
  *         - commentType (string)    : "Question" or "Comment" (replies can only be comments)
  *         - replies     ([Comment]) : list of comment object "replies"
  *         - upvotes     (int)       : number of upvotes on comment
  *         - downvotes   (int)       : number of downvotes on comment
  *     }
  * =======================================================================
  *     - User {
  *         - username  (string)  : user username, used for display 
  *         - id        (string)  : unique user identifier, randomly generated but persisted
  *         - userType  (string)  : "Professor", "TeachersAssistant", "Student"
  *     }
  * =======================================================================
  *     - Session {
  *         - id        (string)    : unique session identifier, randomly generated but persisted
  *         - users     ([User])    : list of user participants
  *         - comments  ([Comment]) : list of comment records
  *     }
  * =======================================================================
  **/

 function generateSession() {
  const users     = generateUsers(Math.floor(Math.random() * 50) + 1);
  const comments  = generateCommentsForUsers(users, Math.floor(Math.random() * 100) + 1);
  const session = { id        : 0,
                    users     : users,
                    comments  : comments }

  console.log(session);
  return session    
}

function generateUsers(numUsers) {
  const users = [];

  for (var i = 0; i < numUsers; i++) {
    users.push(generateUser());
  }

  return users;
}

function generateUser() {
  const studentUsernames    = ["Luis Llobrera", "Tiffany Huang", "Patrick Hu", "Crystal Yung", "Jed Tadios", "Sherman Lee", "Vanessa Chou", "Katie Lau", "Jeremy Siocon", "Arvind Kalithil", "Jonathan Perapalanunt"];
  const profUsernames       = ["Joseph Pasquale", "Leo Porter", "Rick Ord", "Gary Gillespie", "Janine Tiefenbruck", "Isaac Chu", "Thomas Powell", "Christine Alvarado", "Mia Minnes", "Diba Mirza"];
  const assistantUsernames  = ["Kendrick Lamar", "Childish Gambino", "Chance the Rapper", "Kanye West", "Tyler the Creator", "Goldlink", "Vince Staples"];

  const users = [studentUsernames, profUsernames, assistantUsernames];
  const pick  = Math.floor(Math.random() * 3);

  const user = { username : "",
                 id       : "",
                 userType : "" }

  switch(pick) {
    case 0:
      user.username = users[0][Math.floor(Math.random() * users[0].length)];
      user.userType = "Student";
      user.id       = user.username.replace(/\s/g, '') + user.userType;
      break;
    case 1:
      user.username = users[1][Math.floor(Math.random() * users[1].length)];
      user.userType = "Professor";
      user.id       = user.username.replace(/\s/g, '') + user.userType;
      break;
    default:
      user.username = users[2][Math.floor(Math.random() * users[2].length)];
      user.userType = "Teacher'sAssistant";
      user.id       = user.username.replace(/\s/g, '') + user.userType;
      break;
  }
  return user;
}

function generateCommentsForUsers(users, numComments) {
  const comments = [];

  for (var i = 0; i < numComments; i++) {
    comments.push(generateCommentForUser(users[Math.floor(Math.random() * users.length)]))
  }

  return comments;
}

function generateCommentForUser(user) {
  const content     = "The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog.";
  const commentType = generateCommentType(); 
  const replies     = [];
  const totalVotes  = Math.floor(Math.random() * 50);
  const upvotes     = Math.floor(Math.random() * 50);
  const downvotes   = Math.abs(totalVotes - upvotes);

  const comment = { user,
                    content,
                    commentType,
                    replies,
                    upvotes,
                    downvotes
                  }
  return comment;
}

function generateCommentType() {
  switch(Math.floor(Math.random() * 3)) {
    case 0:
      return "Question";
     default:
      return "Comment";
  }
}