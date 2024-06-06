//'use client'
import { useCallback, useEffect, useState } from 'react';
import { Components } from '../components';
import { Hooks } from '../hooks';
import { useParams } from 'react-router-dom';
import { Services } from '../services';

export function EventEditView() {
    let abortController = new AbortController();

    const {id} = useParams();

    const useEvent = Hooks.useEvent();

    
    const [errorMessages, setErrorMessages] = useState([]);

    const handleFormSubmit = async e => {
        e.preventDefault();
        useEvent.setIsDisabled(true);
        setErrorMessages([]);
        
        try {
            await useEvent.updateEvent(
            	id, abortController.signal);
        } catch (error) {
            if ('message' in error) setErrorMessages([error.message]);
            if (!('messages' in error)) return;

            const messages = await error.messages;

            setErrorMessages(messages);
        } finally {
            useEvent.setIsDisabled(false);
        }
    }

    const init = useCallback(async () => {
        useEvent.setIsDisabled(true);

        try {
            await useEvent.getEvent(id, abortController.signal);
            
            
        } catch (error) {
            console.log(error);
        } finally{
            useEvent.setIsDisabled(false);
        }
    }, [])

    useEffect(() => {
        init();
    }, [init])

    return (
        <>
            <h3>Modifier Event</h3>

            <Components.ErrorMessages>
                {errorMessages}
            </Components.ErrorMessages>
            <Components.EventForm useEvent={useEvent}
            isDisabled={useEvent.isDisabled} handleFormSubmit={handleFormSubmit}/>
        </>
    )
}
