import React from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton, Tooltip } from "@material-ui/core";
import "./Blogs.css";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import MarkChatUnreadIcon from "@mui/icons-material/MarkChatUnread";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import PsychologyIcon from "@mui/icons-material/Psychology";
import { useParams, useHistory } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import Card from "@mui/material/Card";
export function Blogs() {
  const history = useHistory();
  const [search, setSearch] = useState("");

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function getAllBlogs() {
      try {
        const blogs = await axios.get(
          "https://61c412cff1af4a0017d9927b.mockapi.io/blogapp"
        );
        setBlogs(blogs.data);
      } catch (error) {
        console.log("Opps something went wrong!!");
      }
    }
    getAllBlogs();
  }, []);

  //deleteting

  const handleDelete = async (id) => {
    await axios.delete(
      `https://61c412cff1af4a0017d9927b.mockapi.io/blogapp/${id}`
    );

    //after deleting show remaining one
    var newBlogs = blogs.filter((item) => {
      return item.id !== id;
    });
    setBlogs(newBlogs);
  };

  return (
    <div className="main">
      {/* <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            blogs
          </Typography>
        </AppBar>
      </Box> */}
      <div className="search-flex">
        <span className="searchicon">
          <SearchIcon />
        </span>

        <TextField
          label="Type Blog Title..."
          variant="outlined"
          style={{ marginBottom: 20, width: "100%" }}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div ClassName="blog-add">
        <HistoryEduIcon color="primary" />
        What's in Your Mind? Write Something Here. 👉
        <Button onClick={() => history.push("/add")}>Write Blog</Button>
        <PsychologyIcon color="primary" className="add" />
      </div>

      <div className="inputformblog"></div>
      <div className="blogList">
        {/* filter  used to activate search bar */}
        {blogs
          .filter((val) => {
            if (search === "") {
              return val;
            } else if (val.title.toLowerCase().includes(search.toLowerCase())) {
              return val;
            }
          })
          .map((item, i) => {
            return (
              <Card className="BlogItems" key={i} elevation={24}>
                <h4>
                  {" "}
                  <MarkChatUnreadIcon color="primary" /> {item.title}
                </h4>
                <hr />
                <img src={item.image} alt="" />
                <hr />
                <Button className="category">{item.category}</Button>
                <p className="description">{item.description}</p>

                <Tooltip title="View">
                  <IconButton>
                    <Link to={`/view/${item.id}`}>
                      <AutoStoriesIcon color="primary" />
                    </Link>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit">
                  <IconButton>
                    <Link to={`/edit/${item.id}`}>
                      <EditIcon color="secondary" />
                    </Link>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton onClick={() => handleDelete(item.id)}>
                    <Link>
                      <DeleteIcon color="error" />
                    </Link>
                  </IconButton>
                </Tooltip>
              </Card>
            );
          })}
      </div>
    </div>
  );
}
