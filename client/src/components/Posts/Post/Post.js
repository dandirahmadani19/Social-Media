import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./styles";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import { ThumbUpAlt, Delete, MoreHoriz } from "@material-ui/icons";
import moment from "moment";
import { deletePost, setCurrentId } from "../../../store/actions/posts";

const Post = ({ post }) => {
  const classes = useStyles();
  const dispatch = useDispatch()
  // const { scrollToForm } = useSelector((state) => state.posts)

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={post.selectedFile}
        title={post.title}
      >
        <div className={classes.overlay}>
          <Typography variant="h6">{post.creator}</Typography>
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        <div className={classes.overlay2}>
          <Button style={{ color: "#fff" }} size="small" onClick={() => {
            // scrollToForm.current.scrollIntoView({ behavior: "smooth" });
            dispatch(setCurrentId(post))
          }}>
            <MoreHoriz fontSize="medium" />
          </Button>
        </div>
      </CardMedia>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <CardContent>
        <Typography className={classes.title} variant="h5" gutterBottom>
          {post.message}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" onClick={() => {}}>
          <ThumbUpAlt fontSize="small"/>
          Like
          {post.likeCount}
        </Button>
        <Button size="small" color="primary" onClick={() => {dispatch(deletePost(post._id))}}>
          <Delete fontSize="small"/>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
