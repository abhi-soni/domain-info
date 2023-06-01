import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Dialog, DialogTitle, DialogContent } from '@mui/material/';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const HistoryPopup = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
        minWidth: '350px',
    }
}));

function HistoryPopupTitle(props) {
    const { children, onClose, ...other } = props;
    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

const URLHistory = () => {
    const [open, setOpen] = React.useState(true);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <HistoryPopup
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
        >
            <HistoryPopupTitle id="customized-dialog-title" onClose={handleClose} style={{ color: 'var(--text-color)' }}>
                Explored URL History
            </HistoryPopupTitle>
            <DialogContent dividers>
                {sessionStorage.getItem('URL History') ? sessionStorage.getItem('URL History').replace(/[\\[\]"]/g, '').split(',')
                    .map((url, index) => {
                        return (
                            <li style={{ listStyleType: 'none', color: 'var(--text-color)' }} key={index}>{url}</li>
                        );
                    }) : 'Please explore some URL(s) first'}
            </DialogContent>
        </HistoryPopup>
    );
}
export default URLHistory;