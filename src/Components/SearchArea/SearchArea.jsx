import './SearchArea.css';
import { useState } from 'react';
import { TextField, Box, Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import SearchIcon from '@mui/icons-material/Search';
import Whois from '../Whois/Whois';
import DNS from '../DNS/DNS';
import { useLocation } from 'react-router-dom';

const SearchArea = () => {
    const location = useLocation();
    const [domain_url, setdomain_url] = useState('');
    const [error, setError] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const titleText = location.pathname === '/' ? 'Whois' : 'DNS';

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setFormSubmitted(true);

        // save visited url's in session storage
        let urlHistory = JSON.parse(sessionStorage.getItem('URL History')) || [];
        urlHistory.push(domain_url);
        sessionStorage.setItem('URL History', JSON.stringify(urlHistory));
    }
    // Input URL Validition 
    const handleTextFieldChange = (e) => {
        const url = e.target.value;
        setdomain_url(url);
        const regex = /^(?!(?:https?:\/\/))[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+(?:\/[^/]*[^/\s])?$/;
        setError(!regex.test(url));
        setFormSubmitted(false);
    }

    return (
        <div className='hero_section'>
            <Grid container spacing={2} margin={0}>
                {/* margin:0 to fix grid overflow */}
                <Grid xs={12} md={12} lg={12}>
                    <h3 id='hero_title' style={{ userSelect: "none" }}>{titleText} Domain Lookup</h3>
                </Grid>
                <div className='search_area'>
                    <Grid xs={12} md={12}>
                        <Box component="form"
                            sx={{ '& > :not(style)': { width: { xs: '100%', sm: '100%', md: '65ch' } }, }}
                            noValidate className='search_area_flex' onSubmit={handleFormSubmit}
                            autoComplete="off">
                            <TextField id="domain_url" value={domain_url} type='url' label="Enter Domain Name" variant="outlined" error={error} helperText={error ? 'Please enter valid domain name' : "Please enter URL without HTTP, HTTPS"}
                                onChange={handleTextFieldChange} sx={textFieldStyle} />
                            <Button variant="contained" type='submit' endIcon={<SearchIcon />} size="large" disabled={error || domain_url.length < 1} sx={submitButtonStyle}>
                                Submit
                            </Button>
                        </Box>
                    </Grid>
                </div>
            </Grid>
            {formSubmitted && location.pathname === '/' && (<Whois url={domain_url} />)}
            {formSubmitted && location.pathname === '/dns' && (<DNS url={domain_url} />)}
        </div>
    );
}
export default SearchArea;


const textFieldStyle = {
    '& label.Mui-focused': {
        color: 'var(--text-color)',
        // fontWeight:500
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'var(--border-gray-color)',
        },
        '&:hover fieldset': {
            borderColor: 'var(--border-gray-color)',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'var(--border-gray-color)',
        },
    },
};

const submitButtonStyle = {
    backgroundColor: 'var(--orange-color)', color: 'var(--text-color)', width: '7rem !important', height: '3.4rem', marginLeft: '10px',
    '&:hover': {
        backgroundColor: 'var(--orange-color) !important',
    },
    '&:active': {
        backgroundColor: 'var(--orange-color) !important',
    },
    '&:focus': {

    },
    "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
        border: "1px solid #484850 !important",
    },
}