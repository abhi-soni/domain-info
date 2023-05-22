import './DNS.css';
import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Box, Grid, Paper, Typography, Table, TableHead, TableBody, TableCell, TableContainer, TableRow, CircularProgress } from '@mui/material';

const DNS = (props) => {

    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const apiUrl = `https://zozor54-whois-lookup-v1.p.rapidapi.com/nslookup?domain=${props.url}`;
    const apiKey = process.env.REACT_APP_API_KEY;
    const options = useMemo(() => ({
        headers: {
            'X-RapidAPI-Key': `${apiKey}`,
            'X-RapidAPI-Host': 'zozor54-whois-lookup-v1.p.rapidapi.com'
        }
    }), [apiKey]);
    useEffect(() => {
        const fetchData = async () => {
            setError(null);
            setLoading(true);
            try {
                const response = await axios.get(apiUrl, options);
                setResult(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
                setError('An error occurred while fetching the data.');
            }
        };
        if (props.url) {
            fetchData();
        }
    }, [props.url, apiUrl, options]);

    const rows = result === null ? [] : [
        { label: `A`, value: result.A || 'Not Available' },
        { label: `AAAA`, value: result.AAAA || 'Not Available' },
        { label: 'MX Url', value: result.MX.map((mx) => mx.exchange || 'Not Available').join(', ') },
        { label: 'MX Priority', value: result.MX.map((mx) => mx.priority || 'Not Available').join(', ') },
        { label: 'NS', value: result.NS.map((ns, index) => { return <span key={index}>{ns}<br /></span> }) },
        {
            label: 'SOA', value:
                Object.entries(result.SOA).map((soa) => {
                    const [key, value] = soa;
                    return <span key={key}>{key.charAt(0).toUpperCase() + key.slice(1) + ': ' + value}<br /></span>;
                })
        },
        { label: 'TXT', value: result.TXT.map((txt, index) => { return <span key={index}>{txt}+<br /></span> }) },
    ];

    return (
        <>
            {loading && <CircularProgress thickness={2.5} />}
            {error && <span className='apiError'>Error: {error}</span>}
            {result && (
                <Box m={2} id="box_parent">
                    <Grid container spacing={2} justifyContent='center'>
                        <Grid item xs={12} md={6} sx={{ flexBasis: '100% !important', maxWidth: '95% !important', marginTop: '3rem !important' }}>
                            <Paper elevation={3}>
                                <Box p={2} color='var(--text-color)' style={{ overflowWrap: 'break-word' }}>
                                    <Typography variant="h5" gutterBottom>DNS Lookup Results</Typography>
                                    <TableContainer sx={{ marginBottom: '1rem' }}>
                                        <Table>
                                            <TableHead>
                                                <TableRow key={rows.label}>
                                                    <TableCell>Type</TableCell>
                                                    <TableCell>Value</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {rows.map((row) => (
                                                    <TableRow key={row.label} hover>
                                                        <TableCell sx={{ color: 'var(--text-color) !important' }}>{row.label}</TableCell>{/*First column*/}
                                                        <TableCell sx={{ color: 'var(--text-color) !important' }}>{row.value}</TableCell>{/*Second column*/}
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            )}
        </>
    );
}

export default DNS;
