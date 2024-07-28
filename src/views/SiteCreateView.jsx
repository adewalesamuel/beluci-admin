//'use client'
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Services } from '../services';
import { Components } from '../components';
import { Hooks } from '../hooks';
import { useError } from '../hooks/useError';

export function SiteCreateView() {
    let abortController = new AbortController();
    const errorHandler = useError();

    const navigate = useNavigate();

    const useSite = Hooks.useSite();

    
    const [errorMessages, setErrorMessages] = useState([]);

    const handleFormSubmit = async e => {
        e.preventDefault();
        useSite.setIsDisabled(true);
        setErrorMessages([]);
        
        try {
            await useSite.createSite(abortController.signal);

            navigate('/sites');
        } catch (error) {
            if ('message' in error) setErrorMessages([error.message]);
            if (!('messages' in error)) return;

            const messages = await error.messages;

            setErrorMessages(messages);
        } finally {
            useSite.setIsDisabled(false);
        }
    }

    const init = useCallback(async () => {
        useSite.setIsDisabled(true);

        try {
            
        } catch (error) {
            errorHandler.setError(error); 
        } finally {
            useSite.setIsDisabled(false);
        }
    }, [])

    useEffect(() => {
        init()
    }, [init])

    return (
        <>
            <h3>Créer Site</h3>

            <Components.ErrorMessages>
                {errorMessages}
            </Components.ErrorMessages>
            <Components.SiteForm useSite={useSite}
            isDisabled={useSite.isDisabled} handleFormSubmit={handleFormSubmit}/>
        </>
    )
}
