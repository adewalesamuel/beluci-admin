import { Navigate } from "react-router-dom";
import { Utils } from "../utils";

export function PrivateView(props) {
    return (!Utils.Auth.isLoggedIn() ? 
        <Navigate replace to='/connexion' /> : <props.View {...props} />)
}