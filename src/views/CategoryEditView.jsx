//'use client'
import { useCallback, useEffect, useState } from 'react';
import { Components } from '../components';
import { Hooks } from '../hooks';
import { useParams } from 'react-router-dom';
import { Services } from '../services';

export function CategoryEditView() {
    let abortController = new AbortController();

    const {id} = useParams();

    const useCategory = Hooks.useCategory();

    const [categorys, setCategorys] = useState([]);
	
    const [errorMessages, setErrorMessages] = useState([]);

    const handleFormSubmit = async e => {
        e.preventDefault();
        useCategory.setIsDisabled(true);
        setErrorMessages([]);
        
        try {
            await useCategory.updateCategory(
            	id, abortController.signal);
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
            await useCategory.getCategory(id, abortController.signal);
            
            const { categorys } = await Services.CategoryService
			.getAll(abortController.signal);
			setCategorys(categorys);

			
        } catch (error) {
            console.log(error);
        } finally{
            useCategory.setIsDisabled(false);
        }
    }, [])

    useEffect(() => {
        init();
    }, [init])

    return (
        <>
            <h3>Modifier Category</h3>

            <Components.ErrorMessages>
                {errorMessages}
            </Components.ErrorMessages>
            <Components.CategoryForm useCategory={useCategory}
            categorys={categorys} setCategorys={setCategorys}
			isDisabled={useCategory.isDisabled} handleFormSubmit={handleFormSubmit}/>
        </>
    )
}
