import { IconButton, Tooltip } from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const Copy = ({ value }) => {

    const handleClick = () => {
        navigator.clipboard.writeText(value);
    };

    return (
        <Tooltip title="Copy to Clipboard">
            <IconButton aria-label="copy" onClick={handleClick} style={copyBtnCss}>
                <ContentCopyIcon />
            </IconButton>
        </Tooltip>
    );
};
export default Copy;

const copyBtnCss = {
    position: "absolute",
    right: "13px",
    top: "13px",
}