import { Container, Grid, Button } from "@mui/material";
import { BrowserRouter, Link } from "react-router-dom";
import Router from '../../components/routes/router';
const Body = () => {
    
    return (<>
        <BrowserRouter>
        <Container sx={{mt: 4, mb:10}}>
            <Grid container >
                    <Grid item xs={6} md={6} lg={6}>
                    <Button component={Link} to='/create' variant="contained" sx={{ m: 1 }}> Front-End / Create</Button>
                    <Button component={Link} to='/table' variant="contained" sx={{ m: 1 }}> Front-End / Table</Button>
                </Grid>
                    <Grid item xs={6} md={6} lg={6}>
                        <Button component={Link} to='/netcorecreate' variant="contained" sx={{ m: 1 }}> .Net Core / Create</Button>
                        <Button component={Link} to='/netcoretable' variant="contained" sx={{ m: 1 }}> .Net Core / Table</Button>
                </Grid>
            </Grid>
            </Container>
            <Container sx={{ mt: 4, mb: 2 }}>
                <Router />
            </Container>
        </BrowserRouter>
    </>)
}
export default Body;