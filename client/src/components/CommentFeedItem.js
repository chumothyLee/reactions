import React from 'react';
import classNames from 'classnames';
import { ListItem, Avatar, ListItemText, Collapse, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import CommentIcon from '@material-ui/icons/Comment';
import CommentFeed from './CommentFeed';
import CommentInput from './CommentInput';

const styles = theme => ({
    nested: {
      paddingLeft: theme.spacing.unit * 4,
    },
    button: {
        margin: theme.spacing.unit,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    iconSmall: {
        fontSize: 20,
    },
  });
  
class CommentFeedItem extends React.Component {

    constructor(props) {
        super(props)
        
        this.state = { collapsed : false };
    }

    handleExpandClicked = () => {
        this.setState({ collapsed: !this.state.collapsed });
    };

    getCommentAvatar() {
        const usernameSplit = this.props.comment.user.username.split(" ");
        if (usernameSplit.length === 1) {
            return usernameSplit[0][0];
        }
        else {
            return usernameSplit[0][0] + usernameSplit[usernameSplit.length - 1][0];
        }
    }

    render() {
        const { classes } = this.props
        const avatar = this.getCommentAvatar();

        return(
            <div>
                <ListItem >
                    <Avatar>
                        {avatar}
                    </Avatar>
                    <ListItemText   primary={this.props.comment.user.username} 
                                    secondary={this.props.comment.content} />
                </ListItem>
                <div justify="center">
                    <Button className={classes.button} size="small">
                        <ArrowUpwardIcon    className={classNames(classes.leftIcon, classes.iconSmall)}
                                            color="action" />
                        {this.props.comment.upvotes}
                    </Button>
                    <Button className={classes.button} size="small">
                        <ArrowDownwardIcon  className={classNames(classes.leftIcon, classes.iconSmall)}
                                            color="action" />
                        {this.props.comment.downvotes}
                    </Button>
                    <Button className={classes.button} size="small" onClick={this.handleExpandClicked}>
                        <CommentIcon    className={classNames(classes.leftIcon, classes.iconSmall)}
                                        color="action" />
                        {this.props.comment.replies.length || '0'}
                    </Button>
                </div>
                <Collapse in={this.state.collapsed} timeout="auto" unmountOnExit> 
                    <div className={classes.nested}> 
                        <CommentFeed comments={this.props.comment.replies}/>
                        <CommentInput user={this.props.user} />
                    </div>
                </Collapse>
            </div>
        );
    }
}


  
export default withStyles(styles)(CommentFeedItem);