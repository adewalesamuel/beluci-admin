//'use client'
import { useCallback, useEffect, useState } from 'react';
import { Components } from '../components';
import { Hooks } from '../hooks';
import { Route, Routes, useParams } from 'react-router-dom';
import { Views } from '.';
import { useError } from '../hooks/useError';

export function EventEditView() {
    let abortController = new AbortController();
    const errorHandler = useError();

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
            errorHandler.setError(error); 
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
            <div className="row">
                <div className="col-12 col-md-6">
                    <Components.ErrorMessages>
                        {errorMessages}
                    </Components.ErrorMessages>
                    <Components.EventForm useEvent={useEvent}
                    isDisabled={useEvent.isDisabled} handleFormSubmit={handleFormSubmit}/>
                </div>
                <div className="col-12 col-md-6">
                    <Routes>
                        <Route path="" element={<Views.GalleryListView />} />
                        <Route path="create" element={<Views.GalleryCreateView />} />
                        <Route path=":galleryId/edit" element={<Views.GalleryEditView />} />
                    </Routes>
                </div>
            </div>
        </>
    )
}
