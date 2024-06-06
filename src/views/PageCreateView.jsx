//'use client'
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Services } from '../services';
import { Components } from '../components';
import { Hooks } from '../hooks';

export function PageCreateView() {
    let abortController = new AbortController();

    const navigate = useNavigate();

    const usePage = Hooks.usePage();

    
    const [errorMessages, setErrorMessages] = useState([]);

    const handleFormSubmit = async e => {
        e.preventDefault();
        usePage.setIsDisabled(true);
        setErrorMessages([]);
        
        try {
            await usePage.createPage(abortController.signal);

            navigate('/pages');
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
            
        } catch (error) {
            console.log(error);
        } finally {
            usePage.setIsDisabled(false);
        }
    }, [])

    useEffect(() => {
        init()
    }, [init])

    return (
        <>
            <h3>Créer Page</h3>

            <Components.ErrorMessages>
                {errorMessages}
            </Components.ErrorMessages>
            <Components.PageForm usePage={usePage}
            isDisabled={usePage.isDisabled} handleFormSubmit={handleFormSubmit}/>
        </>
    )
}
