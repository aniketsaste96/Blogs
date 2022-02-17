import { Button, Typography, Box, makeStyles, TextField, Grid } from "@material-ui/core"
import { deepPurple, green, orange } from '@material-ui/core/colors';
import axios from 'axios';
import { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
// CALL IT ONCE IN YOUR APP
if (typeof window !== "undefined") {
    injectStyle();
}
const AddNewBlog = () => {

    //toastify notification animation
    function notify() {
        toast.success("Password reset Sucessfull 👍,Log In Now!");
    }

    const history = useHistory();

    const [blog, setBlog] = useState({
        title: "",
        image: "",
        category: "",
        description: ""


    });

    //after post rerender home

    const [status, setStatus] = useState()




    //instead of giving onchange event on all fields do this
    function ontextFieldChange(e) {
        //give this values to setStudent
        setBlog({
            //to avoid deleteting the previous values use spread operator
            ...blog,
            [e.target.name]: e.target.value

        })
        console.log(blog);
    }

    async function onFormSubmit(e) {
        e.preventDefault();

        try {
            await axios.post(`https://61c412cff1af4a0017d9927b.mockapi.io/blogapp`, blog);


            setStatus(true)

        } catch (error) {
            console.log("Opps something went wrong!!")


        }
    }

    // return blogs if status is true
    if (status) {
        history.push("/blogs")
        notify()
    }



    return (
        <div>
            <Box textAlign="center"  >
                <Typography variant="h4"> Write Your Blog</Typography>
            </Box>
            <form noValidate >
                <Grid container spacing={4} justify="center">


                    <Grid m={2} mb={2} item xs={4} sm={4}>
                        <TextField
                            onChange={(e) => ontextFieldChange(e)}
                            autoComplete="title" name="title"
                            varient="outlined" required fullWidth id="title"
                            label="title" autoFocus />

                    </Grid>
                    <Grid item xs={4} sm={4}>
                        <TextField

                            onChange={(e) => ontextFieldChange(e)}
                            autoComplete="image" name="image"
                            varient="outlined" required fullWidth id="image"
                            label="image" autoFocus />

                    </Grid>

                    <Grid item xs={4} sm={4}>
                        <TextField

                            onChange={(e) => ontextFieldChange(e)}
                            autoComplete="category" name="category"
                            varient="outlined" required fullWidth id="category"
                            label="category" autoFocus />

                    </Grid>
                    <Grid item xs={4} sm={4}>
                        <TextField

                            onChange={(e) => ontextFieldChange(e)}
                            autoComplete="description" name="description"
                            varient="outlined" required fullWidth id="description"
                            label="Write Something" autoFocus multiline
                            rows={15} />

                    </Grid>


                </Grid>
                <Box m={8}>
                    <Button type="submit" variant="contained" color="primary" fullWidth onClick={(e) => onFormSubmit(e)}>Add Blog</Button>
                </Box>
                <Box m={8}>
                    <Button type="submit" variant="contained" color="primary" fullWidth onClick={() => history.push('/blogs')}>Blogs</Button>
                </Box>

            </form>
            <ToastContainer style={{ background: "darkgreen" }} />
        </div>
    )
}

export default AddNewBlog
