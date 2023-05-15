import './Header.css';
import React from 'react';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const Header = (props) => {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    //  For Mobile View 
    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };
    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2,color:'inherit', textDecoration:'none',userSelect:'none' }}>
                <Link to="/" id='title'>Domain Info</Link>
            </Typography>
            <Divider />
            <List>
                <Stack spacing={1.5} className='resp_nav_btn' mt={1.5}>
                    <Link to='/'>
                        <Button variant='outlined' sx={{
                            width: '95%', margin: '0 5px', color: '#000', textTransform: 'capitalize', border: '1px solid #3A3E49', '&:hover': {
                                backgroundColor: 'var(--orange-color)',
                                textShadow: '0 0 15px var(--orange-color)',
                                transition: 'all 0.5s ease'
                            }
                        }}>Whois Info</Button>
                    </Link>
                    <Link to="/dns" >
                        <Button variant='outlined' sx={{
                            width: '95%', margin: '0 5px', color: '#000', textTransform: 'capitalize', border: '1px solid #3A3E49', '&:hover': {
                                backgroundColor: 'var(--orange-color)',
                                textShadow: '0 0 15px var(--orange-color)',
                                transition: 'all 0.5s ease'
                            }
                        }}>DNS Info
                        </Button>
                    </Link>
                </Stack>
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar component="nav" className='navbar' sx={{ height: { xs: 'unset', sm: 'unset', md: 'unset' } }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, fontWeight: 'bold' }}
                    > <Link to="/" id='title'>Domain Info</Link></Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <List>
                            <ListItem disablePadding>
                                <Stack direction="row" spacing={2}>
                                    <Link to='/'>
                                        <Button variant='outlined'>Whois Info</Button>
                                    </Link>
                                    <Link to="/dns">
                                        <Button variant='outlined' >DNS Info
                                        </Button>
                                    </Link>
                                </Stack>
                            </ListItem>
                        </List>
                    </Box>
                </Toolbar>
            </AppBar>

            <Box component="nav">
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>

        </Box>
    );
}

export default Header;