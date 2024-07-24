//'use client'
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Components } from '../components';
import { Services } from '../services';
import { Hooks } from '../hooks';
import { useError } from '../hooks/useError';

export function MessageCreateView() {
    let abortController = new AbortController();

    const navigate = useNavigate();
    const errorHandler = useError();

    const useMessage = Hooks.useMessage();

    const [members, setMembers] = useState([]);
	const [forums, setForums] = useState([]);
	

    const handleFormSubmit = async e => {
        e.preventDefault();
        useMessage.setIsDisabled(true);
        errorHandler.setErrorMessages([]);
        
        try {
            await useMessage.createMessage(abortController.signal);

            navigate('/messages');
        } catch (error) {
            errorHandler.setError(error); 
        } finally {
            useMessage.setIsDisabled(false);
        }
    }

    const init = useCallback(async () => {
        useMessage.setIsDisabled(true);

        try {
            const { members } = await Services.MemberService
			.getAll(abortController.signal);
			setMembers(members);

			const { forums } = await Services.ForumService
			.getAll(abortController.signal);
			setForums(forums);

			
        } catch (error) {
            errorHandler.setError(error); 
        } finally {
            useMessage.setIsDisabled(false);
        }
    }, [])

    useEffect(() => {
        init()
    }, [init])

    return (
        <>
            <h3>Créer Message</h3>

            <Components.ErrorMessages>
                {errorHandler.errorMessages}
            </Components.ErrorMessages>
            <Components.MessageForm useMessage={useMessage}
            members={members} setMembers={setMembers}
			forums={forums} setForums={setForums}
			isDisabled={useMessage.isDisabled} handleFormSubmit={handleFormSubmit}/>
        </>
    )
}
