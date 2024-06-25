//'use client'
import { useCallback, useEffect, useState } from 'react';
import { Components } from '../components';
import { Hooks } from '../hooks';
import { useParams } from 'react-router-dom';

export function GalleryTypeEditView() {
    let abortController = new AbortController();

    const {id} = useParams();

    const useGalleryType = Hooks.useGalleryType();

    const [errorMessages, setErrorMessages] = useState([]);

    const handleFormSubmit = async e => {
        e.preventDefault();
        useGalleryType.setIsDisabled(true);
        setErrorMessages([]);
        
        try {
            await useGalleryType.updateGalleryType(
                id, abortController.signal);
        } catch (error) {
            if ('message' in error) setErrorMessages([error.message]);
            if (!('messages' in error)) return;

            const messages = await error.messages;

            setErrorMessages(messages);
        } finally {
            useGalleryType.setIsDisabled(false);
        }
    }

    const init = useCallback(async () => {
        useGalleryType.setIsDisabled(true);

        try {
            await useGalleryType.getGalleryType(id, abortController.signal);
        } catch (error) {
            console.log(error);
        } finally{
            useGalleryType.setIsDisabled(false);
        }
    }, [])

    useEffect(() => {
        init();
    }, [init])

    return (
        <>
            <h3>Modifier type gallery</h3>

            <Components.ErrorMessages>
                {errorMessages}
            </Components.ErrorMessages>
            <Components.GalleryTypeForm useGalleryType={useGalleryType}
            isDisabled={useGalleryType.isDisabled} handleFormSubmit={handleFormSubmit}/>
        </>
    )
}
