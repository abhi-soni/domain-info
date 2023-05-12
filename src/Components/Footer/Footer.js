import './Footer.css';
import { IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
    return (
        <footer>
            <div className='footer_area'>
                <span>Made with ❤️ by Abhishek Soni</span>
                <span className='footer_links'>
                    <IconButton sx={{ color: '#FEFDF8' }}>
                        <a id='github' href='https://github.com/abhi-soni/' title="Github Profile Link" target='_blank' rel="noopener noreferrer"> <GitHubIcon /></a>
                    </IconButton>
                    <IconButton sx={{ color: '#FEFDF8', paddingRight: 0 }}>
                        <a id="linkedin" href='https://www.linkedin.com/in/abhisheksoni2/' title="Linkedin Profile Link" target='_blank' rel="noopener noreferrer"><LinkedInIcon /></a>
                    </IconButton>
                </span>
            </div>
        </footer>
    );
}
export default Footer;
