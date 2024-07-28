//'use client'
import { useCallback, useEffect, useState } from 'react';
import { Components } from '../components';
import { Hooks } from '../hooks';
import { useParams } from 'react-router-dom';
import { Services } from '../services';
import { useError } from '../hooks/useError';

export function SiteEditView() {
    let abortController = new AbortController();
    const errorHandler = useError();

    const {id} = useParams();

    const useSite = Hooks.useSite();

    
    const [errorMessages, setErrorMessages] = useState([]);

    const handleFormSubmit = async e => {
        e.preventDefault();
        useSite.setIsDisabled(true);
        setErrorMessages([]);
        
        try {
            await useSite.updateSite(
            	id, abortController.signal);
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
            await useSite.getSite(id, abortController.signal);
            
            
        } catch (error) {
            errorHandler.setError(error); 
        } finally{
            useSite.setIsDisabled(false);
        }
    }, [])

    useEffect(() => {
        init();
    }, [init])

    return (
        <>
            <h3>Modifier Site</h3>

            <Components.ErrorMessages>
                {errorMessages}
            </Components.ErrorMessages>
            <Components.SiteForm useSite={useSite}
            isDisabled={useSite.isDisabled} handleFormSubmit={handleFormSubmit}/>
        </>
    )
}
