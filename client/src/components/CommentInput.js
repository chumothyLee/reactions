import React from 'react';
import { TextField, Toolbar, Avatar, Grid } from '@material-ui/core';

const CommentInput = (props) => {
    const usernameSplit = props.user.username.split(" ");
    const avatar =  usernameSplit.length === 1 ? usernameSplit[0][0] : usernameSplit[0][0] + usernameSplit[usernameSplit.length - 1][0];
    const styles = {
        extraMargin: {
            margin:'15px'
        }
    }
    return(
            <Toolbar>
                <Grid container spacing={16} style={styles.extraMargin}>
                    <Grid item>
                        <Avatar>
                            {avatar}
                        </Avatar>
                    </Grid>
                    <Grid item xs={10}>
                        <TextField  label="Question or Comment?"
                                    fullWidth
                        />
                    </Grid>
                </Grid>
            </Toolbar>
    );
}

export default CommentInput;