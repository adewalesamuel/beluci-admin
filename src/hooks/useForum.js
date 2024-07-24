import { useState } from 'react';
import { Services } from '../services';

export const useForum = () => {
    const [id, setId] = useState('');
	const [name, setName] = useState('');
	const [slug, setSlug] = useState('');
	const [display_img_url, setDisplay_img_url] = useState('');
	const [description, setDescription] = useState('');
	const [is_pinned, setIs_pinned] = useState('');
	const [member_id, setMember_id] = useState('');
	const [forum_category_id, setForum_category_id] = useState('');
	
    const [errors, setErrors] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);

    const getForum = (forumId, signal) => {        
        return Services.ForumService.getById(forumId, signal)
        .then(response => {
            fillForum(response.forum);
            setIsDisabled(false);

            return response;
        });
    }

    const createForum = signal => {
        const payload = {
            name,
		slug,
		display_img_url,
		description,
		is_pinned,
		member_id,
		forum_category_id,
		
        };

        return Services.ForumService.create(
        JSON.stringify(payload), signal);
    }
    const updateForum = (forumId, signal) => {
        const payload = {
            name,
		slug,
		display_img_url,
		description,
		is_pinned,
		member_id,
		forum_category_id,
		
        };

        return Services.ForumService.update(
        	forumId, JSON.stringify(payload), signal);
    }
    const deleteForum = (forumId, signal) => {
        return Services.ForumService.destroy(forumId, signal);
    }
    const fillForum = (forum) => {
        setId(forum.id);
        setName(forum.name ?? '');
		setSlug(forum.slug ?? '');
		setDisplay_img_url(forum.display_img_url ?? '');
		setDescription(forum.description ?? '');
		setIs_pinned(forum.is_pinned ?? '');
		setMember_id(forum.member_id ?? '');
		setForum_category_id(forum.forum_category_id ?? '');
		
    }
    const emptyForum = () => {
        setId('');
        setName('');
		setSlug('');
		setDisplay_img_url('');
		setDescription('');
		setIs_pinned('');
		setMember_id('');
		setForum_category_id('');
		
    }

    return {
        id,
        name,
		slug,
		display_img_url,
		description,
		is_pinned,
		member_id,
		forum_category_id,
		
        errors,
        isDisabled,
        setName,
		setSlug,
		setDisplay_img_url,
		setDescription,
		setIs_pinned,
		setMember_id,
		setForum_category_id,
		
        setId,
        setErrors,
        setIsDisabled,
        getForum,
        createForum,
        updateForum,
        deleteForum,
        fillForum,
        emptyForum
    };
}