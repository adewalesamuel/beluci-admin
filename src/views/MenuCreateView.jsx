//'use client'
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Services } from '../services';
import { Components } from '../components';
import { Hooks } from '../hooks';
import { useError } from '../hooks/useError';

export function MenuCreateView() {
    let abortController = new AbortController();
    const errorHandler = useError();

    const navigate = useNavigate();

    const useMenu = Hooks.useMenu();

    
    const [errorMessages, setErrorMessages] = useState([]);

    const handleFormSubmit = async e => {
        e.preventDefault();
        useMenu.setIsDisabled(true);
        setErrorMessages([]);
        
        try {
            await useMenu.createMenu(abortController.signal);

            navigate('/menus');
        } catch (error) {
            if ('message' in error) setErrorMessages([error.message]);
            if (!('messages' in error)) return;

            const messages = await error.messages;

            setErrorMessages(messages);
        } finally {
            useMenu.setIsDisabled(false);
        }
    }

    const init = useCallback(async () => {
        useMenu.setIsDisabled(true);

        try {
            
        } catch (error) {
            errorHandler.setError(error); 
        } finally {
            useMenu.setIsDisabled(false);
        }
    }, [])

    useEffect(() => {
        init()
    }, [init])

    return (
        <>
            <h3>Créer Menu</h3>

            <Components.ErrorMessages>
                {errorMessages}
            </Components.ErrorMessages>
            <Components.MenuForm useMenu={useMenu}
            isDisabled={useMenu.isDisabled} handleFormSubmit={handleFormSubmit}/>
        </>
    )
}
