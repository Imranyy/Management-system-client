import { Link } from "react-router-dom";

const NotFound=()=>{
    return(
        <div>
            <nav className="cyran lighten-2" role="navigation">
            <Link to='/home' id="logo-container" className="brand-logo text-darken-5 customfont center  hide-on-med-and-down">AddMeUp Org</Link>
            <div className="nav-wrapper container">
            <ul className="left">
            <li><Link to='/'>Return</Link></li>
            </ul>
            </div>
        </nav>
            <h1>Page NotFound:)</h1>

        </div>
    )
};

export default NotFound;