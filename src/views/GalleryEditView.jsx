//'use client'
import { useCallback, useEffect, useState } from 'react';
import { Components } from '../components';
import { Hooks } from '../hooks';
import { useParams } from 'react-router-dom';
import { Services } from '../services';

export function GalleryEditView() {
    let abortController = new AbortController();

    const {id} = useParams();

    const useGallery = Hooks.useGallery();

    
    const [errorMessages, setErrorMessages] = useState([]);

    const handleFormSubmit = async e => {
        e.preventDefault();
        useGallery.setIsDisabled(true);
        setErrorMessages([]);
        
        try {
            await useGallery.updateGallery(
            	id, abortController.signal);
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
            await useGallery.getGallery(id, abortController.signal);
            
            
        } catch (error) {
            console.log(error);
        } finally{
            useGallery.setIsDisabled(false);
        }
    }, [])

    useEffect(() => {
        init();
    }, [init])

    return (
        <>
            <h3>Modifier Gallery</h3>

            <Components.ErrorMessages>
                {errorMessages}
            </Components.ErrorMessages>
            <Components.GalleryForm useGallery={useGallery}
            isDisabled={useGallery.isDisabled} handleFormSubmit={handleFormSubmit}/>
        </>
    )
}
