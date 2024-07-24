//'use client'
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Components } from '../components';
import { Services } from '../services';
import { Hooks } from '../hooks';
import { useError } from '../hooks/useError';

export function ForumCategoryCreateView() {
    let abortController = new AbortController();

    const navigate = useNavigate();
    const errorHandler = useError();

    const useForumCategory = Hooks.useForumCategory();

    const [forum_categorys, setForum_categorys] = useState([]);
	

    const handleFormSubmit = async e => {
        e.preventDefault();
        useForumCategory.setIsDisabled(true);
        errorHandler.setErrorMessages([]);
        
        try {
            await useForumCategory.createForumCategory(abortController.signal);

            navigate('/forum-categorys');
        } catch (error) {
            errorHandler.setError(error); 
        } finally {
            useForumCategory.setIsDisabled(false);
        }
    }

    const init = useCallback(async () => {
        useForumCategory.setIsDisabled(true);

        try {
            const { forum_categorys } = await Services.ForumCategoryService
			.getAll(abortController.signal);
			setForum_categorys(forum_categorys);

			
        } catch (error) {
            errorHandler.setError(error); 
        } finally {
            useForumCategory.setIsDisabled(false);
        }
    }, [])

    useEffect(() => {
        init()
    }, [init])

    return (
        <>
            <h3>Créer ForumCategory</h3>

            <Components.ErrorMessages>
                {errorHandler.errorMessages}
            </Components.ErrorMessages>
            <Components.ForumCategoryForm useForumCategory={useForumCategory}
            forum_categorys={forum_categorys} setForum_categorys={setForum_categorys}
			isDisabled={useForumCategory.isDisabled} handleFormSubmit={handleFormSubmit}/>
        </>
    )
}
