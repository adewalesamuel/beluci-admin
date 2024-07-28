//'use client'
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Services } from '../services';
import { Components } from '../components';
import { Hooks } from '../hooks';
import { useError } from '../hooks/useError';

export function MemberCreateView() {
    let abortController = new AbortController();
    const errorHandler = useError();

    const navigate = useNavigate();

    const useMember = Hooks.useMember();

    const [members, setMembers] = useState([]);
	
    const [errorMessages, setErrorMessages] = useState([]);

    const handleFormSubmit = async e => {
        e.preventDefault();
        useMember.setIsDisabled(true);
        setErrorMessages([]);
        
        try {
            await useMember.createMember(abortController.signal);

            navigate('/members');
        } catch (error) {
            if ('message' in error) setErrorMessages([error.message]);
            if (!('messages' in error)) return;

            const messages = await error.messages;

            setErrorMessages(messages);
        } finally {
            useMember.setIsDisabled(false);
        }
    }

    const init = useCallback(async () => {
        useMember.setIsDisabled(true);

        try {
            const { members } = await Services.MemberService
			.getAll(abortController.signal);
			setMembers(members);

			
        } catch (error) {
            errorHandler.setError(error); 
        } finally {
            useMember.setIsDisabled(false);
        }
    }, [])

    useEffect(() => {
        init()
    }, [init])

    return (
        <>
            <h3>Créer Member</h3>

            <Components.ErrorMessages>
                {errorMessages}
            </Components.ErrorMessages>
            <Components.MemberForm useMember={useMember}
            members={members} setMembers={setMembers}
			isDisabled={useMember.isDisabled} handleFormSubmit={handleFormSubmit}/>
        </>
    )
}
