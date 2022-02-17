import { Link, useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import './view.css'
import { Button, Typography, Box, makeStyles, Paper, IconButton, TableContainer, Table, TableBody, TableHead, TableCell, TableRow, Tooltip, TextareaAutosize } from "@material-ui/core"
import { useState, useEffect } from 'react';
import EditIcon from "@material-ui/icons/Edit";

function View() {
    const history = useHistory()
    const { id } = useParams()



    const [blogs, setBlogs] = useState([])


    useEffect(() => {

        getAllBlogs();
    }, [id]);
    async function getAllBlogs() {
        try {
            const blogs = await axios.get(
                ` https://61c412cff1af4a0017d9927b.mockapi.io/blogapp/${id}`
            );
            setBlogs(blogs.data);
        } catch (error) {
            console.log("Opps something went wrong!!");
        }
    }

    return (
        <>

            <div className="blogItemsView" key={id}>
                <h2>{blogs.title}</h2>
                <img src={blogs.image} alt="" />
                <p className="viewdescription">{blogs.description}</p>
                <p className="category">{blogs.category}</p>
                <br />
                <Button onClick={() => history.push("/blogs")} color="primary" variant="contained"> Back to Blogs</Button>
            </div>

        </>
    )
}

export default View;
