//'use client'
import { useCallback, useEffect, useState } from 'react';
import { Components } from '../components';
import { Hooks } from '../hooks';
import { useParams } from 'react-router-dom';
import { Services } from '../services';
import { useError } from '../hooks/useError';

export function PermissionEditView() {
    let abortController = new AbortController();
    const errorHandler = useError();

    const {id} = useParams();

    const usePermission = Hooks.usePermission();

    
    const [errorMessages, setErrorMessages] = useState([]);

    const handleFormSubmit = async e => {
        e.preventDefault();
        usePermission.setIsDisabled(true);
        setErrorMessages([]);
        
        try {
            await usePermission.updatePermission(
            	id, abortController.signal);
        } catch (error) {
            if ('message' in error) setErrorMessages([error.message]);
            if (!('messages' in error)) return;

            const messages = await error.messages;

            setErrorMessages(messages);
        } finally {
            usePermission.setIsDisabled(false);
        }
    }

    const init = useCallback(async () => {
        usePermission.setIsDisabled(true);

        try {
            await usePermission.getPermission(id, abortController.signal);
            
            
        } catch (error) {
            errorHandler.setError(error); 
        } finally{
            usePermission.setIsDisabled(false);
        }
    }, [])

    useEffect(() => {
        init();
    }, [init])

    return (
        <>
            <h3>Modifier Permission</h3>

            <Components.ErrorMessages>
                {errorMessages}
            </Components.ErrorMessages>
            <Components.PermissionForm usePermission={usePermission}
            isDisabled={usePermission.isDisabled} handleFormSubmit={handleFormSubmit}/>
        </>
    )
}
