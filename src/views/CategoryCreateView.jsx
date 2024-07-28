//'use client'
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Services } from '../services';
import { Components } from '../components';
import { Hooks } from '../hooks';
import { useError } from '../hooks/useError';

export function CategoryCreateView() {
    let abortController = new AbortController();
    const errorHandler = useError();

    const navigate = useNavigate();

    const useCategory = Hooks.useCategory();

    const [categorys, setCategorys] = useState([]);
	
    const [errorMessages, setErrorMessages] = useState([]);

    const handleFormSubmit = async e => {
        e.preventDefault();
        useCategory.setIsDisabled(true);
        setErrorMessages([]);
        
        try {
            await useCategory.createCategory(abortController.signal);

            navigate('/categorys');
        } catch (error) {
            if ('message' in error) setErrorMessages([error.message]);
            if (!('messages' in error)) return;

            const messages = await error.messages;

            setErrorMessages(messages);
        } finally {
            useCategory.setIsDisabled(false);
        }
    }

    const init = useCallback(async () => {
        useCategory.setIsDisabled(true);

        try {
            const { categorys } = await Services.CategoryService
			.getAll(abortController.signal);
			setCategorys(categorys);

			
        } catch (error) {
            errorHandler.setError(error); 
        } finally {
            useCategory.setIsDisabled(false);
        }
    }, [])

    useEffect(() => {
        init()
    }, [init])

    return (
        <>
            <h3>Créer Category</h3>

            <Components.ErrorMessages>
                {errorMessages}
            </Components.ErrorMessages>
            <Components.CategoryForm useCategory={useCategory}
            categorys={categorys} setCategorys={setCategorys}
			isDisabled={useCategory.isDisabled} handleFormSubmit={handleFormSubmit}/>
        </>
    )
}
