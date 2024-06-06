//'use client'
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Services } from '../services';
import { Components } from '../components';
import { Hooks } from '../hooks';

export function PermissionCreateView() {
    let abortController = new AbortController();

    const navigate = useNavigate();

    const usePermission = Hooks.usePermission();

    
    const [errorMessages, setErrorMessages] = useState([]);

    const handleFormSubmit = async e => {
        e.preventDefault();
        usePermission.setIsDisabled(true);
        setErrorMessages([]);
        
        try {
            await usePermission.createPermission(abortController.signal);

            navigate('/permissions');
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
            
        } catch (error) {
            console.log(error);
        } finally {
            usePermission.setIsDisabled(false);
        }
    }, [])

    useEffect(() => {
        init()
    }, [init])

    return (
        <>
            <h3>Créer Permission</h3>

            <Components.ErrorMessages>
                {errorMessages}
            </Components.ErrorMessages>
            <Components.PermissionForm usePermission={usePermission}
            isDisabled={usePermission.isDisabled} handleFormSubmit={handleFormSubmit}/>
        </>
    )
}
