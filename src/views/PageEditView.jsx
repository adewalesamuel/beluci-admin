//'use client'
import { useCallback, useEffect, useState } from 'react';
import { Components } from '../components';
import { Hooks } from '../hooks';
import { useParams } from 'react-router-dom';
import { useError } from '../hooks/useError';

export function PageEditView() {
    let abortController = new AbortController();
    const errorHandler = useError();

    const {id} = useParams();

    const usePage = Hooks.usePage();

    
    const [errorMessages, setErrorMessages] = useState([]);

    const handleFormSubmit = async e => {
        e.preventDefault();
        usePage.setIsDisabled(true);
        setErrorMessages([]);
        
        try {
            await usePage.updatePage(
            	id, abortController.signal);
        } catch (error) {
            if ('message' in error) setErrorMessages([error.message]);
            if (!('messages' in error)) return;

            const messages = await error.messages;

            setErrorMessages(messages);
        } finally {
            usePage.setIsDisabled(false);
        }
    }

    const init = useCallback(async () => {
        usePage.setIsDisabled(true);

        try {
            await usePage.getPage(id, abortController.signal);
            
            
        } catch (error) {
            errorHandler.setError(error); 
        } finally{
            usePage.setIsDisabled(false);
        }
    }, [])

    useEffect(() => {
        init();
    }, [init])

    return (
        <>
            <h3>Modifier Page</h3>

            <Components.ErrorMessages>
                {errorMessages}
            </Components.ErrorMessages>
            <Components.PageForm usePage={usePage}
            isDisabled={usePage.isDisabled} handleFormSubmit={handleFormSubmit}/>
        </>
    )
}
