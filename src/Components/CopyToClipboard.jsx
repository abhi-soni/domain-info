import { useState } from "react";
import { IconButton } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const Copy = ({ value }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleClick = () => {
    navigator.clipboard.writeText(value);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2500);
  };

  return (
    <>
      <IconButton aria-label="copy" onClick={handleClick} style={copyBtnCss}>
        {!isCopied && <ContentCopyIcon />}
      </IconButton>
      {isCopied && (
        <span style={copiedTextVisibleCss}>Copied to clipboard</span>
      )}
    </>
  );
};

export default Copy;

const copyBtnCss = {
  position: "absolute",
  right: "13px",
  top: "13px",
};

const copiedTextCss = {
  position: "absolute",
  right: "10px",
  top: "15px",
  backgroundColor: "#FFF",
  padding: "3px 5px",
  borderRadius: "3px",
  fontSize: "12px",
  color: "#555",
  transition: "opacity 0.3s ease-in-out",
  opacity: "0",
};

const copiedTextVisibleCss = {
  ...copiedTextCss,
  opacity: "1",
  transition: "opacity 1.3s ease-in-out",
};
