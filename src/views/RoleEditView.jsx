//'use client'
import { useCallback, useEffect, useState } from 'react';
import { Components } from '../components';
import { Hooks } from '../hooks';
import { useParams } from 'react-router-dom';
import { Services } from '../services';
import { useError } from '../hooks/useError';

export function RoleEditView() {
    let abortController = new AbortController();
    const errorHandler = useError();

    const {id} = useParams();

    const useRole = Hooks.useRole();

    
    const [errorMessages, setErrorMessages] = useState([]);

    const handleFormSubmit = async e => {
        e.preventDefault();
        useRole.setIsDisabled(true);
        setErrorMessages([]);
        
        try {
            await useRole.updateRole(
            	id, abortController.signal);
        } catch (error) {
            if ('message' in error) setErrorMessages([error.message]);
            if (!('messages' in error)) return;

            const messages = await error.messages;

            setErrorMessages(messages);
        } finally {
            useRole.setIsDisabled(false);
        }
    }

    const init = useCallback(async () => {
        useRole.setIsDisabled(true);

        try {
            await useRole.getRole(id, abortController.signal);
            
            
        } catch (error) {
            errorHandler.setError(error); 
        } finally{
            useRole.setIsDisabled(false);
        }
    }, [])

    useEffect(() => {
        init();
    }, [init])

    return (
        <>
            <h3>Modifier Role</h3>

            <Components.ErrorMessages>
                {errorMessages}
            </Components.ErrorMessages>
            <Components.RoleForm useRole={useRole}
            isDisabled={useRole.isDisabled} handleFormSubmit={handleFormSubmit}/>
        </>
    )
}
