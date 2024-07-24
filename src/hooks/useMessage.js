import { useState } from 'react';
import { Services } from '../services';

export const useMessage = () => {
    const [id, setId] = useState('');
	const [content, setContent] = useState('');
	const [member_id, setMember_id] = useState('');
	const [forum_id, setForum_id] = useState('');
	
    const [errors, setErrors] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);

    const getMessage = (messageId, signal) => {        
        return Services.MessageService.getById(messageId, signal)
        .then(response => {
            fillMessage(response.message);
            setIsDisabled(false);

            return response;
        });
    }

    const createMessage = signal => {
        const payload = {
            content,
		member_id,
		forum_id,
		
        };

        return Services.MessageService.create(
        JSON.stringify(payload), signal);
    }
    const updateMessage = (messageId, signal) => {
        const payload = {
            content,
		member_id,
		forum_id,
		
        };

        return Services.MessageService.update(
        	messageId, JSON.stringify(payload), signal);
    }
    const deleteMessage = (messageId, signal) => {
        return Services.MessageService.destroy(messageId, signal);
    }
    const fillMessage = (message) => {
        setId(message.id);
        setContent(message.content ?? '');
		setMember_id(message.member_id ?? '');
		setForum_id(message.forum_id ?? '');
		
    }
    const emptyMessage = () => {
        setId('');
        setContent('');
		setMember_id('');
		setForum_id('');
		
    }

    return {
        id,
        content,
		member_id,
		forum_id,
		
        errors,
        isDisabled,
        setContent,
		setMember_id,
		setForum_id,
		
        setId,
        setErrors,
        setIsDisabled,
        getMessage,
        createMessage,
        updateMessage,
        deleteMessage,
        fillMessage,
        emptyMessage
    };
}