//'use client'
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Services } from '../services';
import { Components } from '../components';
import { Hooks } from '../hooks';

export function GalleryCreateView() {
    let abortController = new AbortController();

    const navigate = useNavigate();

    const useGallery = Hooks.useGallery();
    const {id} = useParams();

    const [events, setEvents] = useState([]);
    const [errorMessages, setErrorMessages] = useState([]);


    const handleFormSubmit = async e => {
        e.preventDefault();
        useGallery.setIsDisabled(true);
        setErrorMessages([]);
        
        try {
            await useGallery.createGallery(abortController.signal);

            navigate(-1);
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
        useGallery.setEvent_id(id);
        useGallery.setIsDisabled(true);

        try {
            const {events} = await Services.EventService.getAll(
                {}, abortController.signal
            )
            
            setEvents(events);
        } catch (error) {
            console.log(error);
        } finally {
            useGallery.setIsDisabled(false);
        }
    }, [])

    useEffect(() => {
        init()
    }, [init])

    return (
        <>
            <h3>Ajouter une photo</h3>

            <Components.ErrorMessages>
                {errorMessages}
            </Components.ErrorMessages>
            <Components.GalleryForm useGallery={useGallery} events={events}
            isDisabled={useGallery.isDisabled} handleFormSubmit={handleFormSubmit}/>
        </>
    )
}
