import './Header.css';
import { useState } from 'react';
import { Stack, AppBar, Box, Divider, Drawer, IconButton, List, ListItem, Toolbar, Button, Typography } from '@mui/material/';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const Header = (props) => {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);

    //  For Mobile View 
    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };
    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2, color: 'inherit', textDecoration: 'none', }}>
                <Link to="/" id='title'>Menu</Link>
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
                    <Link to="/history" >
                        <Button variant='outlined' sx={{
                            width: '95%', margin: '0 5px', color: '#000', textTransform: 'capitalize', border: '1px solid #3A3E49', '&:hover': {
                                backgroundColor: 'var(--orange-color)',
                                textShadow: '0 0 15px var(--orange-color)',
                                transition: 'all 0.5s ease'
                            }
                        }}>URL History
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
                        sx={{ mr: 2, display: { sm: 'none' } }}>
                        <MenuIcon />
                    </IconButton>
                    <Link to="/" id='title'> <Typography variant="h6" component="div"
                        sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'flex' }, fontWeight: 'bold' }}>
                        <img src="/favicon-32x32.png" alt='Header_Icon' style={{ paddingRight: "5px" }}
                            width={"30px"} height={"30px"} />
                        Domain Info
                    </Typography></Link>
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
                                    <Link to="/history">
                                        <Button variant="outlined">
                                            URL History
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