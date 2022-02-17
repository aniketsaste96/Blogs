import { Button, Typography, Box, makeStyles, TextField, Grid, TextareaAutosize } from "@material-ui/core"

import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

const EditBlog = () => {
    const { id } = useParams();

    const history = useHistory();

    const [blog, setBlog] = useState({
        title: "",
        image: "",
        price: "",
        category: "",
        description: ""


    });



    useEffect(() => {
        async function getBlog() {
            try {
                const blog = await axios.get(`https://61c412cff1af4a0017d9927b.mockapi.io/blogapp/${id}`);
                setBlog(blog.data)

            } catch (error) {
                console.log("Opps something went wrong!!")

            }
        }
        getBlog();

    }, [id])

    //instead of giving onchange event on all fields do this
    function ontextFieldChange(e) {
        //give this values to setStudent
        setBlog({
            //to avoid deleteting the previous values use spread operator
            ...blog,
            [e.target.name]: e.target.value
            // look target.name  not value 
        })
        console.log(blog);
    }


    //on update here put method with id
    async function onFormUpdate(e) {
        e.preventDefault();
        try {
            await axios.put(`https://61c412cff1af4a0017d9927b.mockapi.io/blogapp/${id}`, blog);
            history.push('/blogs')
        } catch (error) {
            console.log("Opps something went wrong!!")
        }

    }

    // return Home if status is true

    return (
        <div>
            <Box textAlign="center" m={2} p={2} mb={2} >
                <Typography variant="h4"> Edit Blog</Typography>
            </Box>
            <form noValidate >
                <Grid container spacing={4} justify="center">


                    <Grid m={2} mb={2} item xs={6} sm={6}>
                        <TextField
                            onChange={(e) => ontextFieldChange(e)}
                            autoComplete="title" name="title"
                            varient="outlined" required fullWidth id="title"
                            label="title" autoFocus
                            value={blog.title}
                        />

                    </Grid>
                    <Grid item xs={6} sm={6}>
                        <TextField
                            //  onChnage={ontextFieldChange} == no cz it calles emmediatly
                            onChange={(e) => ontextFieldChange(e)}
                            autoComplete="image" name="image"
                            varient="outlined" required fullWidth id="image"
                            label="image" autoFocus
                            value={blog.image} />

                    </Grid>

                    <Grid item xs={6} sm={6}>
                        <TextField
                            //  onChnage={ontextFieldChange} == no cz it calles emmediatly
                            onChange={(e) => ontextFieldChange(e)}
                            autoComplete="category" name="category"
                            varient="outlined" required fullWidth id="category"
                            label="category" autoFocus
                            value={blog.category} />

                    </Grid>
                    <Grid item xs={6} sm={6}>


                        <TextField
                            //  onChnage={ontextFieldChange} == no cz it calles emmediatly
                            onChange={(e) => ontextFieldChange(e)}
                            height="100px"
                            autoComplete="description" name="description"
                            varient="outlined" required fullWidth id="description"
                            label="description" autoFocus
                            value={blog.description} multiline
                            rows={15} />

                    </Grid>


                </Grid>
                <Box m={3}>
                    <Button type="submit" variant="contained" color="primary" fullWidth onClick={(e) => onFormUpdate(e)}>Update</Button>
                </Box>


            </form>
        </div >
    )
}

export default EditBlog
