import React from 'react';
import { List } from '@material-ui/core';
import CommentFeedItem from './CommentFeedItem'

class CommentFeed extends React.Component {

    render() {
        const commentFeed = this.props.comments.map((comment, index) => {
            return (<CommentFeedItem comment={comment} user={this.props.user} key={index} />);
        })
        return(
            <List>
                {commentFeed}
            </List>
        );
    }
}

export default CommentFeed;