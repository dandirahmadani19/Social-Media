import React from "react";
import Post from "./Post/Post";
import useStyles from "./styles";

import { useSelector } from "react-redux";
import { CircularProgress, Grid } from "@material-ui/core";

const Posts = () => {
  const classes = useStyles();
  const { posts, loading } = useSelector((state) => state.posts);
  
  
  return !posts.length || loading ? (
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
        <Grid key={post._id} item xs={12} sm={6}>
          <Post post={post}/>
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
