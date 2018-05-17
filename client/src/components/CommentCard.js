import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Menu, MenuItem, Card, CardHeader, Avatar, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const styles = theme => ({
    card: {
        width: 400,
    },
});

class CommentCard extends React.Component {

    constructor(props) {
        super(props);

        this.state = { anchorEl : null }
    }

    handleToggle = event => {
        this.setState({ anchorEl: event.currentTarget });
    };
    
    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { classes } = this.props
        const usernameSplit = this.props.user.username.split(" ");
        const avatar =  usernameSplit.length === 1 ? usernameSplit[0][0] : usernameSplit[0][0] + usernameSplit[usernameSplit.length - 1][0];

        return(
            <Card className={classes.card}>
                <CardHeader avatar={<Avatar aria-label="Recipe" className={classes.avatar}>
                                        {avatar}
                                    </Avatar>}
                            title={this.props.user.username}
                            subheader={this.props.user.userType}
                            action={
                                <div>
                                    <IconButton onClick={this.handleToggle} 
                                                aria-owns={this.state.anchorEl ? 'simple-menu' : null}
                                                aria-haspopup="true">
                                        <MoreVertIcon />
                                    </IconButton>
                                    <Menu
                                        anchorEl={this.state.anchorEl}
                                        open={Boolean(this.state.anchorEl)}
                                        onClose={this.handleClose}
                                    >
                                        <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                                        <MenuItem onClick={this.handleClose}>My account</MenuItem>
                                        <MenuItem onClick={this.handleClose}>Logout</MenuItem>
                                    </Menu>
                                </div>
                            }  
                />
            </Card>
        );
    }
}

export default withStyles(styles, { withTheme: true })(CommentCard);
