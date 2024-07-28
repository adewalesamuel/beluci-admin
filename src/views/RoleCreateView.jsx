//'use client'
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Services } from '../services';
import { Components } from '../components';
import { Hooks } from '../hooks';
import { useError } from '../hooks/useError';

export function RoleCreateView() {
    let abortController = new AbortController();
    const errorHandler = useError();

    const navigate = useNavigate();

    const useRole = Hooks.useRole();

    
    const [errorMessages, setErrorMessages] = useState([]);

    const handleFormSubmit = async e => {
        e.preventDefault();
        useRole.setIsDisabled(true);
        setErrorMessages([]);
        
        try {
            await useRole.createRole(abortController.signal);

            navigate('/roles');
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
            
        } catch (error) {
            errorHandler.setError(error); 
        } finally {
            useRole.setIsDisabled(false);
        }
    }, [])

    useEffect(() => {
        init()
    }, [init])

    return (
        <>
            <h3>Créer Role</h3>

            <Components.ErrorMessages>
                {errorMessages}
            </Components.ErrorMessages>
            <Components.RoleForm useRole={useRole}
            isDisabled={useRole.isDisabled} handleFormSubmit={handleFormSubmit}/>
        </>
    )
}
