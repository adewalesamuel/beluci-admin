//'use client'
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Components } from '../components';
import { Services } from '../services';
import { Hooks } from '../hooks';
import { useError } from '../hooks/useError';

export function ForumCategoryEditView() {
    let abortController = new AbortController();

    const {id} = useParams();
    const errorHandler = useError();

    const useForumCategory = Hooks.useForumCategory();

    const [forum_categorys, setForum_categorys] = useState([]);
	

    const handleFormSubmit = async e => {
        e.preventDefault();
        useForumCategory.setIsDisabled(true);
        errorHandler.setErrorMessages([]);
        
        try {
            await useForumCategory.updateForumCategory(
            	id, abortController.signal);
        } catch (error) {
            errorHandler.setError(error); 
        } finally {
            useForumCategory.setIsDisabled(false);
        }
    }

    const init = useCallback(async () => {
        useForumCategory.setIsDisabled(true);

        try {
            await useForumCategory.getForumCategory(id, abortController.signal);
            
            const { forum_categorys } = await Services.ForumCategoryService
			.getAll(abortController.signal);
			setForum_categorys(forum_categorys);

			
        } catch (error) {
            errorHandler.setError(error); 
        } finally{
            useForumCategory.setIsDisabled(false);
        }
    }, [])

    useEffect(() => {
        init();
    }, [init])

    return (
        <>
            <h3>Modifier ForumCategory</h3>

            <Components.ErrorMessages>
                {errorHandler.errorMessages}
            </Components.ErrorMessages>
            <Components.ForumCategoryForm useForumCategory={useForumCategory}
            forum_categorys={forum_categorys} setForum_categorys={setForum_categorys}
			isDisabled={useForumCategory.isDisabled} handleFormSubmit={handleFormSubmit}/>
        </>
    )
}
