import './Whois.css';
import axios from 'axios';
import { useState, useEffect, useMemo } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableRow, CircularProgress } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Copy from '../CopyToClipboard';

const Whois = (props) => {

    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const apiUrl = `https://zozor54-whois-lookup-v1.p.rapidapi.com/?domain=${props.url}&format=json&_forceRefresh=0`;
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
        { label: 'Domain Name', value: result.name },
        // Checking if there are more than one values in result.status
        {
            label: 'Domain Status', value: Array.isArray(result.status) && result.status.length > 1 ? Object.entries(result.status).map((status) => {
                let [key, value] = status;
                return <span key={key}>{value}<br /></span>;
            }) : result.status || 'Not Available'
        },
        {
            label: 'Nameservers',
            value: result.nameserver ?
                Object.entries(result.nameserver).map((ns) => {
                    let [key, value] = ns;
                    return <span key={key}>{value}<br /></span>;
                }) :
                'Not Available'
        },
        { label: 'IP Address', value: result.ips },
        { label: 'Creation Date:', value: result.created || 'Not Available' },
        { label: 'Updated Date', value: result.changed || 'Not Available' },
        { label: 'Whois Server', value: result.whoisserver || 'Not Available' },
        { label: 'Registry Expiry Date', value: result.expires || 'Not Available' },
        { label: 'Registered', value: result.registered ? 'Yes' : 'No' },
        { label: 'DNSSEC', value: typeof result.dnssec === 'boolean' ? (result.dnssec ? 'Yes' : 'No') : result.dnssec },
        { label: 'Registrar Name', value: (result.registered && result.registrar.name) || 'Not Available' },
        { label: 'Registrar ID', value: (result.registered && result.registrar.id) || 'Not Available' },
        { label: 'Registrar Email', value: (result.registered && result.registrar.email) || 'Not Available' },
        // { label: 'Registrar Email', value: result.registrar.email.length > 1 ? result.registrar.email.map((email, index) => { return <span key={index}>{email}<br /></span> }) || 'Not Available': result.registrar.email || 'Not Available' },
        { label: 'Registrar URL', value: (result.registered && result.registrar.url) || 'Not Available' },
        { label: 'Registrar Phone', value: (result.registered && result.registrar.phone) || 'Not Available' }
        // { label: 'Registrar Phone', value:result.registrar.phone.length>1? result.registrar.phone.map((phone, index) => { return <span key={index}>{phone}<br /></span> }) || 'Not Available': result.registrar.phone || 'Not Available' },
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
                                    <Typography variant="h5" gutterBottom>Whois Lookup Results</Typography>
                                    <TableContainer sx={{ marginBottom: '1rem' }}>
                                        <Table>
                                            {result && (
                                                <TableBody>
                                                    {rows.map((row) => (
                                                        <TableRow key={row.label} hover>
                                                            <TableCell sx={{ color: 'var(--text-color) !important' }}>{row.label}</TableCell>{/*First column*/}
                                                            <TableCell sx={{ color: 'var(--text-color) !important' }}>{row.value}</TableCell>{/*Second column*/}
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            )}
                                        </Table>
                                    </TableContainer>
                                    <Typography variant='subtitle1' gutterBottom>Contact Details: </Typography>
                                    {Object.entries(result.contacts).length === 0 ? /*check If there is no contact details*/
                                        (<Typography variant='subtitle1' gutterBottom >Not Available</Typography>)
                                        :
                                        /*If details are there, then showing them*/
                                        Object.entries(result.contacts).map(([contactType, contactTypeDetail]) => (
                                            <Accordion key={contactType} sx={{
                                                '& .MuiAccordionSummary-root': {
                                                    backgroundColor: '#f2f2f2',
                                                    '& .MuiAccordionSummary-content': {
                                                        margin: '0 !important',
                                                    },
                                                },
                                            }}>
                                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                                    <Typography variant='subtitle1' gutterBottom>{contactType.charAt(0).toUpperCase() + contactType.slice(1)}</Typography>
                                                </AccordionSummary>
                                                {contactTypeDetail.map((detail, index) => (
                                                    <AccordionDetails key={index}>
                                                        <Typography variant="subtitle1" gutterBottom>Name: {detail.name || 'Not Available'}</Typography>
                                                        <Typography variant="subtitle1" gutterBottom>Organization: {detail.organization || 'Not Available'}</Typography>
                                                        <Typography variant="subtitle1" gutterBottom>Email: {detail.email || 'Not Available'}</Typography>
                                                        <Typography variant="subtitle1" gutterBottom>Phone: {detail.phone || 'Not Available'}</Typography>
                                                        <Typography variant='subtitle1' gutterBottom>Type: {detail.type || 'Not Available'}</Typography>
                                                        <Typography variant='subtitle1' gutterBottom>Address: {detail.address || 'Not Available'}</Typography>
                                                        <Typography variant='subtitle1' gutterBottom>City: {detail.city || 'Not Available'}</Typography>
                                                        <Typography variant='subtitle1' gutterBottom>Zip Code: {detail.zipcode || 'Not Available'}</Typography>
                                                        <Typography variant='subtitle1' gutterBottom>Country: {detail.country || 'Not Available'}</Typography>
                                                        <Typography variant='subtitle1' gutterBottom>Fax: {detail.fax || 'Not Available'}</Typography>
                                                        <Typography variant='subtitle1' gutterBottom>Creation Date: {detail.created || 'Not Available'}</Typography>
                                                        <Typography variant='subtitle1' gutterBottom>Updated Date: {detail.changed || 'Not Available'}</Typography>
                                                    </AccordionDetails>
                                                ))}
                                            </Accordion>
                                        ))}
                                    <Typography variant='subtitle1'>Raw Data:</Typography>
                                    <pre style={{ whiteSpace: "break-spaces" }}>{result.rawdata} <Copy value={result.rawdata} /></pre>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            )}
        </>
    );
}
export default Whois;