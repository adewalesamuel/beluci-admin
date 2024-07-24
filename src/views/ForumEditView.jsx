//'use client'
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Components } from '../components';
import { Services } from '../services';
import { Hooks } from '../hooks';
import { useError } from '../hooks/useError';

export function ForumEditView() {
    let abortController = new AbortController();

    const {id} = useParams();
    const errorHandler = useError();

    const useForum = Hooks.useForum();

    const [members, setMembers] = useState([]);
	const [forum_categorys, setForum_categorys] = useState([]);
	

    const handleFormSubmit = async e => {
        e.preventDefault();
        useForum.setIsDisabled(true);
        errorHandler.setErrorMessages([]);
        
        try {
            await useForum.updateForum(
            	id, abortController.signal);
        } catch (error) {
            errorHandler.setError(error); 
        } finally {
            useForum.setIsDisabled(false);
        }
    }

    const init = useCallback(async () => {
        useForum.setIsDisabled(true);

        try {
            await useForum.getForum(id, abortController.signal);
            
            const { members } = await Services.MemberService
			.getAll(abortController.signal);
			setMembers(members);

			const { forum_categorys } = await Services.ForumCategoryService
			.getAll(abortController.signal);
			setForum_categorys(forum_categorys);

			
        } catch (error) {
            errorHandler.setError(error); 
        } finally{
            useForum.setIsDisabled(false);
        }
    }, [])

    useEffect(() => {
        init();
    }, [init])

    return (
        <>
            <h3>Modifier Forum</h3>

            <Components.ErrorMessages>
                {errorHandler.errorMessages}
            </Components.ErrorMessages>
            <Components.ForumForm useForum={useForum}
            members={members} setMembers={setMembers}
			forum_categorys={forum_categorys} setForum_categorys={setForum_categorys}
			isDisabled={useForum.isDisabled} handleFormSubmit={handleFormSubmit}/>
        </>
    )
}
