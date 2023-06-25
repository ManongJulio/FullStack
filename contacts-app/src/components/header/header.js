import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const Header = () => {
    return <Container sx={{ mt: 1, mb: 2 }}><AppBar position="static">
        <Toolbar variant="dense">
            <Typography variant="h6" color="inherit" component="div">
                Exam
            </Typography>
        </Toolbar>
    </AppBar>
        </Container>
}
export default Header;