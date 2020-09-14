import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import React from "react";

function Alert(props: any) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface NotifiactionProps {
    message: string,
    severity: 'success' | 'warning' | 'info' | 'error'
    setMessage: any
}

const Notification = ({ message, severity, setMessage }: NotifiactionProps) => (
    <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={!!message.length}
        autoHideDuration={6000}
        onClose={() => setMessage('')} >
    <Alert severity={severity}>
        { message }
        <IconButton size="small" aria-label="close" color="inherit" onClick={() => setMessage('')}>
            <CloseIcon fontSize="small" />
        </IconButton>
    </Alert>
</Snackbar>);

export default Notification;
