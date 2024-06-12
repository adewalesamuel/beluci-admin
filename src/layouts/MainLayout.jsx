import { useEffect } from "react"
import { Components } from "../components";
import { Utils } from "../utils";
import { useLocation, useNavigate } from "react-router-dom";

export function MainLayout({children}){
    const {isLoggedIn} = Utils.Auth;

    const navigate = useNavigate();
    const {pathname} = useLocation();

    useEffect(() => {
        if (!isLoggedIn())
            navigate('/connexion', {replace: true})

        window.document.body.className = "has-navbar-vertical-aside navbar-vertical-aside-show-xl";
    }, [pathname]);

    if (!isLoggedIn()) return null;
    return (
        <>
            <Components.MainMenu />
            <main id="content" role="main" className="main">
                <div className="content container-fluid">
                    <Components.PageHeader />
                    {children}        
                </div>
            </main>
        </>
        )
    }