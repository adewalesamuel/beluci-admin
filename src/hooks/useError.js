import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function useError() {
    const navigate = useNavigate();
    
    const [error, setError] = useState(null);
    const [errorMessages, setErrorMessages] = useState([]);

    const handle = useCallback(async () => { 
        if (!error) return;
        
        if ('status' in error && error.status == 401) return navigate('/connexion');
        if ('message' in error) setErrorMessages([error.message]);
        if (!('messages' in error)) return;
    
        const messages = await error.messages;
    
        setErrorMessages(messages);

        if (import.meta.env.MODE === "development")
            console.log(messages);
    }, [error]);

    useEffect(() => {
        handle();
    }, [handle])

    return {
        setError,
        setErrorMessages,
        errorMessages,
    }
}