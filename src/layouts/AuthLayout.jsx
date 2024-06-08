import { useEffect } from "react"
import { Utils } from "../utils"
import { useNavigate } from "react-router-dom";
import cardImg from '../assets/svg/components/card-6.svg';
import logo from '../assets/logo.jpg';

export function AuthLayout({children}) {
    const navigate = useNavigate();
    const {isLoggedIn} = Utils.Auth

    useEffect(() => {
        if (isLoggedIn())
            return navigate('/', {replace: true})

        window.document.body.className = "";
    }, []);

    if (isLoggedIn()) return null;

    return (
        <main id="content" role="main" className="main">
            <div className="position-fixed top-0 end-0 start-0 bg-img-start" style={{
                height: "32rem",
                backgroundImage: `url('${cardImg}')`
            }}>
                <div className="shape shape-bottom zi-1">
                    <svg preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 1921 273">
                    <polygon fill="#fff" points="0,273 1921,273 1921,0 " />
                    </svg>
                </div>
            </div>
            <div className="container py-5 py-sm-7">
            <span className="d-flex justify-content-center mb-5" href="./index.html">
                <img className="zi-2 img-fluid" src={logo} width={100}/>
            </span>
                <div className="mx-auto" style={{maxWidth: "30rem"}}>
                    <div className="card card-lg mb-5">
                        <div className="card-body">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}