//'use client'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Components } from '../components';
import { Hooks } from '../hooks';

export function GalleryTypeCreateView() {
    let abortController = new AbortController();

    const navigate = useNavigate();

    const useGalleryType = Hooks.useGalleryType();


    const [errorMessages, setErrorMessages] = useState([]);

    const handleFormSubmit = async e => {
        e.preventDefault();
        useGalleryType.setIsDisabled(true);
        setErrorMessages([]);
        
        try {
            await useGalleryType.createGalleryType(abortController.signal);

            navigate('/gallery-types');
        } catch (error) {
            if ('message' in error) setErrorMessages([error.message]);
            if (!('messages' in error)) return;

            const messages = await error.messages;

            setErrorMessages(messages);
        } finally {
            useGalleryType.setIsDisabled(false);
        }
    }

    return (
        <>
            <h3>Créer GalleryType</h3>

            <Components.ErrorMessages>
                {errorMessages}
            </Components.ErrorMessages>
            <Components.GalleryTypeForm useGalleryType={useGalleryType}
            isDisabled={useGalleryType.isDisabled} handleFormSubmit={handleFormSubmit}/>
        </>
    )
}
