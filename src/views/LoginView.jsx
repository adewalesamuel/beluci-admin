import { useState } from "react";
import { Layouts } from "../layouts";
import { Services } from "../services";
import { Utils } from "../utils";
import { useNavigate } from "react-router-dom";
import { Components } from "../components";

export function LoginView() {
    const abortController = new AbortController();
    
    const navigate = useNavigate();

    const {setSessionToken, setUser} = Utils.Auth;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);``
    const [errorMessages, setErrorMessages] = useState([]);

    const handleLoginSubmit = async e => {
        e.preventDefault();
        setIsDisabled(true);
        setErrorMessages([]);

        try {
            const payload = {email, password};
            
            const {user, token} = await Services.AuthService.login(
                JSON.stringify(payload), abortController.signal);

            setSessionToken(token);
            setUser(user);
            navigate('/');
        } catch(error) {
            if ('message' in error) setErrorMessages([error.message]);
            if (!('messages' in error)) return;

            const messages = await error.messages;

            setErrorMessages(messages);
            setIsDisabled(false);
        }
    }
    return (
        <Layouts.AuthLayout>
            <form className="js-validate needs-validation" onSubmit={handleLoginSubmit}>
                <div className="text-center">
                    <div className="mb-5">
                        <h1 className="display-5">Connexion</h1>
                    </div>
                </div>
                <Components.ErrorMessages>
                    {errorMessages}
                </Components.ErrorMessages>
                <div className="mb-4">
                    <label className="form-label" htmlFor="signinSrEmail">
                        Email
                    </label>
                    <input type="email" className="form-control form-control-lg" 
                    disabled={isDisabled} name="email" id="signinSrEmail" 
                    value={email}onChange={e => setEmail(e.target.value)}
                    placeholder="email@address.com" required />
                </div>
                <div className="mb-4">
                    <label className="form-label w-100" htmlFor="signupSrPassword">
                        <span className="d-flex justify-content-between align-items-center">
                            <span>Mot de passe</span>
                        </span>
                    </label>

                    <div className="input-group input-group-merge">
                    <input type="password" className="js-toggle-password form-control 
                    form-control-lg" disabled={isDisabled} name="password" 
                    id="signupSrPassword" required value={password} 
                    onChange={e => setPassword(e.target.value)}/>
                    </div>
                </div>
                
                <div className="form-check mb-4">
                    <input className="form-check-input" type="checkbox" value="" id="termsCheckbox" />
                    <label className="form-check-label" htmlFor="termsCheckbox">
                        Se souvenir de moi
                    </label>
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary btn-lg" disabled={isDisabled}>
                        {isDisabled ? "Chargement..." : 'Connexion'}
                    </button>
                </div>
            </form>
        </Layouts.AuthLayout>
    )
}