//'use client'
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Services } from '../services';
import { Components } from '../components';
import { Hooks } from '../hooks';
import { useError } from '../hooks/useError';

export function PostCreateView() {
    let abortController = new AbortController();
    const errorHandler = useError();

    const navigate = useNavigate();

    const usePost = Hooks.usePost();

    const [categorys, setCategorys] = useState([]);
	
    const [errorMessages, setErrorMessages] = useState([]);

    const handleFormSubmit = async e => {
        e.preventDefault();
        usePost.setIsDisabled(true);
        setErrorMessages([]);
        
        try {
            await usePost.createPost(abortController.signal);

            navigate('/posts');
        } catch (error) {
            if ('message' in error) setErrorMessages([error.message]);
            if (!('messages' in error)) return;

            const messages = await error.messages;

            setErrorMessages(messages);
        } finally {
            usePost.setIsDisabled(false);
        }
    }

    const init = useCallback(async () => {
        usePost.setIsDisabled(true);

        try {
            const { categorys } = await Services.CategoryService
			.getAll(abortController.signal);
			setCategorys(categorys);

			
        } catch (error) {
            errorHandler.setError(error); 
        } finally {
            usePost.setIsDisabled(false);
        }
    }, [])

    useEffect(() => {
        init()
    }, [init])

    return (
        <>
            <h3>Créer Post</h3>

            <Components.ErrorMessages>
                {errorMessages}
            </Components.ErrorMessages>
            <Components.PostForm usePost={usePost}
            categorys={categorys} setCategorys={setCategorys}
			isDisabled={usePost.isDisabled} handleFormSubmit={handleFormSubmit}/>
        </>
    )
}
