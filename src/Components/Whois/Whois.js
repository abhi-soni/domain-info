import './Whois.css';

const Whois = (props) => {
    return (
        <div>
            <h1>{props.url}</h1>
            {console.log("Whois Called")}
        </div>
    )
}
export default Whois;