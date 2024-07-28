//'use client'
import { useCallback, useEffect, useState } from 'react';
import { Components } from '../components';
import { Hooks } from '../hooks';
import { useParams } from 'react-router-dom';
import { Services } from '../services';
import { useError } from '../hooks/useError';

export function MenuEditView() {
    let abortController = new AbortController();
    const errorHandler = useError();

    const {id} = useParams();

    const useMenu = Hooks.useMenu();

    
    const [errorMessages, setErrorMessages] = useState([]);

    const handleFormSubmit = async e => {
        e.preventDefault();
        useMenu.setIsDisabled(true);
        setErrorMessages([]);
        
        try {
            await useMenu.updateMenu(
            	id, abortController.signal);
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
            await useMenu.getMenu(id, abortController.signal);
            
            
        } catch (error) {
            errorHandler.setError(error); 
        } finally{
            useMenu.setIsDisabled(false);
        }
    }, [])

    useEffect(() => {
        init();
    }, [init])

    return (
        <>
            <h3>Modifier Menu</h3>

            <Components.ErrorMessages>
                {errorMessages}
            </Components.ErrorMessages>
            <Components.MenuForm useMenu={useMenu}
            isDisabled={useMenu.isDisabled} handleFormSubmit={handleFormSubmit}/>
        </>
    )
}
