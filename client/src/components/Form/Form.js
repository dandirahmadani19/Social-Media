import React, { useEffect, useState, useRef } from "react";
import FileBase from "react-file-base64";
import useStyles from "./styles";
import { Paper, TextField, Typography, Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { createPost, setCurrentId } from "../../store/actions/posts";
import { updatePost, scrollToForm } from "../../store/actions/posts";

const Form = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.posts);
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const ref = useRef(null);
  const scrollToFormEdit = () => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (post) {
      setPostData({
        creator: post.creator,
        title: post.title,
        message: post.message,
        tags: post.tags,
        selectedFile: post.selectedFile,
      });
      scrollToFormEdit();
      // dispatch(scrollToForm(ref))
    }
  }, [post, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (post) {
      dispatch(updatePost(post._id, postData));
    } else {
      dispatch(createPost(postData));
    }
    clear();
  };
  const clear = () => {
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
    dispatch(setCurrentId(null));
  };
  return (
    <Paper className={`${classes.root} ${classes.paper}`} ref={ref}>
      <form
        autoComplete="off"
        noValidate
        className={classes.form}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {post ? "Editing" : "Creating"} a Memory
        </Typography>
        <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
        />
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => {
              // console.log(base64);
              setPostData({ ...postData, selectedFile: base64 });
            }}
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button variant="contained" color="secondary" fullWidth onClick={clear}>
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
