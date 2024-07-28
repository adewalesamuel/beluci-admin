//'use client'
import { useCallback, useEffect, useState } from 'react';
import { Components } from '../components';
import { Hooks } from '../hooks';
import { useParams } from 'react-router-dom';
import { Services } from '../services';
import { useError } from '../hooks/useError';

export function GalleryEditView() {
    let abortController = new AbortController();
    const errorHandler = useError();

    const {galleryId} = useParams();

    const useGallery = Hooks.useGallery();

    const [events, setEvents] = useState([]);    
    const [errorMessages, setErrorMessages] = useState([]);

    const handleFormSubmit = async e => {
        e.preventDefault();
        useGallery.setIsDisabled(true);
        setErrorMessages([]);
        
        try {
            await useGallery.updateGallery(
                galleryId, abortController.signal);
        } catch (error) {
            if ('message' in error) setErrorMessages([error.message]);
            if (!('messages' in error)) return;

            const messages = await error.messages;

            setErrorMessages(messages);
        } finally {
            useGallery.setIsDisabled(false);
        }
    }

    const init = useCallback(async () => {
        useGallery.setIsDisabled(true);

        try {
            await useGallery.getGallery(galleryId, abortController.signal);
            
            const {events} = await Services.EventService.getAll(
                {}, abortController.signal
            )
            
            setEvents(events);
        } catch (error) {
            errorHandler.setError(error); 
        } finally{
            useGallery.setIsDisabled(false);
        }
    }, [])

    useEffect(() => {
        init();
    }, [init])

    return (
        <>
            <h3>Modifier la photo</h3>

            <Components.ErrorMessages>
                {errorMessages}
            </Components.ErrorMessages>
            <Components.GalleryForm useGallery={useGallery} events={events}
            isDisabled={useGallery.isDisabled} handleFormSubmit={handleFormSubmit}/>
        </>
    )
}
