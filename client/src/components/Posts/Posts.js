import React from "react";
import Post from "./Post/Post";
import useStyles from "./styles";

import { useSelector } from "react-redux";
import { CircularProgress, Grid, Typography } from "@material-ui/core";

const Posts = () => {
  const classes = useStyles();
  const { posts, loading } = useSelector((state) => state.posts);
  
  if (!posts.length) {
    return <Typography className={classes.actionDiv} variant="h5" color="primary">
      No Post Available
    </Typography>
  }
  
  return loading ? (
    <div className={classes.loading}>
      <CircularProgress />
    </div>
  ) : (
    <Grid
      className={classes.mainContainer}
      container
      alignItems="stretch"
      spacing={2}
    >
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} md={6} sm={6}>
          <Post post={post}/>
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
