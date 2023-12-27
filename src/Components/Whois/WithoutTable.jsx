// import { useState, useEffect, useMemo } from 'react';
// import './Whois.css';
// import data from './data.json';
// import {
//     Accordion, AccordionDetails, AccordionSummary, Box, Grid, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableRow
// } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// const Whois = () => {

//     const rows = [
//         { label: 'Name', value: data.name },
//         { label: 'Status', value: data.status },
//         { label: 'Nameserver', value: data.nameserver.join(', ') },
//         { label: 'IPs', value: data.ips },
//         { label: 'Creation Date:', value: data.created },
//         { label: 'Updated Date', value: data.changed },
//         { label: 'Registry Expiry Date', value: data.expires },
//         { label: 'Registered', value: data.registered ? 'Yes' : 'No' },
//         { label: 'DNSSEC', value: data.dnssec.join(', ') },
//         { label: 'Registrar ID', value: data.registrar.id },
//         { label: 'Registrar Name', value: data.registrar.name },
//         { label: 'Registrar Email', value: data.registrar.email.join(', ') },
//         { label: 'Registrar URL', value: data.registrar.url },
//         { label: 'Registrar Phone', value: data.registrar.phone.join(', ') },
//     ];


//     return (
//         <Box m={2}>
//             <Grid container spacing={2} justifyContent="center">
//                 <Grid item xs={12} md={6}>
//                     <Paper elevation={3}>
//                         <Box p={2} color='var(--text-color)' style={{ overflowWrap: 'break-word' }}>


//                             <TableContainer>
//                                 <Table >
//                                     <TableBody>
//                                         {rows.map((row) => (
//                                             <TableRow key={row.label} hover>
//                                                 <TableCell>{row.label}</TableCell> {/*First column*/}
//                                                 <TableCell>{row.value}</TableCell> {/*Second column*/}
//                                             </TableRow>
//                                         ))}
//                                     </TableBody>
//                                 </Table>
//                             </TableContainer>

//                             <Typography variant="h5" gutterBottom>WHOIS Lookup Results</Typography>
//                             <Typography variant='subtitle1' gutterBottom>Domain Name: {data.name || 'Null'}</Typography>
//                             <Typography variant='subtitle1' gutterBottom>Domain Status: </Typography>
//                             {/* Array is used if there are multiple values in state property */}
//                             {Array.isArray(data.status)
//                                 ? data.status.map((status, index) => (
//                                     <Typography variant='subtitle1' key={index}>{status || 'Null'}<br /></Typography>
//                                 ))
//                                 : <Typography variant='subtitle1' gutterBottom>{data.status || 'Null'}</Typography>
//                             }
//                             <Typography variant='subtitle1' >Nameserver:</Typography>
//                             <ul>
//                                 {data.nameserver.map((ns, index) => (
//                                     <li key={index}>{ns || 'Null'}</li>
//                                 ))}
//                             </ul>
//                             <Typography variant='subtitle1' gutterBottom>IP Address: {data.ips || 'Null'}</Typography>
//                             <Typography variant='subtitle1' gutterBottom>Creation Date: {data.created || 'Null'}</Typography>
//                             <Typography variant='subtitle1' gutterBottom>Updated Date: {data.changed || 'Null'}</Typography>
//                             <Typography variant='subtitle1' gutterBottom>Registry Expiry Date: {data.expires || 'Null'}</Typography>
//                             <Typography variant='subtitle1' gutterBottom>Is Registred: {data.registered ? "True" : "False"}</Typography>
//                             <Typography variant='subtitle1' style={{ whiteSpace: "break-spaces" }} gutterBottom >DNSEC: {data.dnssec || 'Null'}</Typography>
//                             <Typography variant='subtitle1' gutterBottom>Contact Details: </Typography>
//                             {Object.entries(data.contacts).map(([contactType, contactTypeDetail]) => (
//                                 <Accordion key={contactType}>
//                                     <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                                         <Typography variant='subtitle1' gutterBottom>{contactType.charAt(0).toUpperCase() + contactType.slice(1)}</Typography>
//                                     </AccordionSummary>
//                                     {contactTypeDetail.map((detail, index) => (
//                                         <AccordionDetails key={index}>
//                                             <Typography variant="subtitle1" gutterBottom>Name: {detail.name || 'Null'}</Typography>
//                                             <Typography variant="subtitle1" gutterBottom>Organization: {detail.organization || 'Null'}</Typography>
//                                             <Typography variant="subtitle1" gutterBottom>Email: {detail.email || 'Null'}</Typography>
//                                             <Typography variant="subtitle1" gutterBottom>Phone: {detail.phone || 'Null'}</Typography>
//                                             <Typography variant='subtitle1' gutterBottom>Type: {detail.type || 'Null'}</Typography>
//                                             <Typography variant='subtitle1' gutterBottom>Address: {detail.address || 'Null'}</Typography>
//                                             <Typography variant='subtitle1' gutterBottom>City: {detail.city || 'Null'}</Typography>
//                                             <Typography variant='subtitle1' gutterBottom>Zip Code: {detail.zipcode || 'Null'}</Typography>
//                                             <Typography variant='subtitle1' gutterBottom>Country: {detail.country || 'Null'}</Typography>
//                                             <Typography variant='subtitle1' gutterBottom>Fax: {detail.fax || 'Null'}</Typography>
//                                             <Typography variant='subtitle1' gutterBottom>Creation Date: {detail.created || 'Null'}</Typography>
//                                             <Typography variant='subtitle1' gutterBottom>Updated Date: {detail.changed || 'Null'}</Typography>
//                                         </AccordionDetails>
//                                     ))}
//                                 </Accordion>
//                             ))}
//                             <Typography variant='subtitle1' gutterBottom>Registrar Name: {data.registrar.name}</Typography>
//                             <Typography variant='subtitle1' gutterBottom>Registrar IANA ID: {data.registrar.id}</Typography>
//                             <Typography variant='subtitle1' gutterBottom>Registrar URL: {data.registrar.url}</Typography>
//                             <Typography variant='subtitle1' gutterBottom>Registrar Email: {data.registrar.iana_id}</Typography>
//                             {Array.isArray(data.registrar.email)
//                                 ? data.registrar.email.map((email, index) => (
//                                     <Typography variant='subtitle1' key={index}>{email}<br /></Typography>
//                                 ))
//                                 : <Typography variant='subtitle1' gutterBottom>{data.registrar.email}</Typography>
//                             }
//                             <Typography variant='subtitle1' gutterBottom>Registrar Phone: </Typography>
//                             {Array.isArray(data.registrar.phone)
//                                 ? data.registrar.phone.map((phone, index) => (
//                                     <Typography variant='subtitle1' key={index}>{phone}<br /></Typography>
//                                 ))
//                                 : <Typography variant='subtitle1' gutterBottom>{data.registrar.phone}</Typography>
//                             }
//                             <Typography variant='subtitle1'>Raw Data:</Typography>
//                             <pre style={{ whiteSpace: "break-spaces" }}>{data.rawdata}</pre>
//                         </Box>
//                     </Paper>
//                 </Grid>
//             </Grid>
//         </Box>
//     );
// }
// export default Whois;
