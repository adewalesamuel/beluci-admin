import { useState } from 'react';
import { Services } from '../services';

export const useForumCategory = () => {
    const [id, setId] = useState('');
	const [display_img_url, setDisplay_img_url] = useState('');
	const [name, setName] = useState('');
	const [slug, setSlug] = useState('');
	const [description, setDescription] = useState('');
	const [forum_category_id, setForum_category_id] = useState('');
	
    const [errors, setErrors] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);

    const getForumCategory = (forum_categoryId, signal) => {        
        return Services.ForumCategoryService.getById(forum_categoryId, signal)
        .then(response => {
            fillForumCategory(response.forum_category);
            setIsDisabled(false);

            return response;
        });
    }

    const createForumCategory = signal => {
        const payload = {
            display_img_url,
		name,
		slug,
		description,
		forum_category_id,
		
        };

        return Services.ForumCategoryService.create(
        JSON.stringify(payload), signal);
    }
    const updateForumCategory = (forum_categoryId, signal) => {
        const payload = {
            display_img_url,
		name,
		slug,
		description,
		forum_category_id,
		
        };

        return Services.ForumCategoryService.update(
        	forum_categoryId, JSON.stringify(payload), signal);
    }
    const deleteForumCategory = (forum_categoryId, signal) => {
        return Services.ForumCategoryService.destroy(forum_categoryId, signal);
    }
    const fillForumCategory = (forum_category) => {
        setId(forum_category.id);
        setDisplay_img_url(forum_category.display_img_url ?? '');
		setName(forum_category.name ?? '');
		setSlug(forum_category.slug ?? '');
		setDescription(forum_category.description ?? '');
		setForum_category_id(forum_category.forum_category_id ?? '');
		
    }
    const emptyForumCategory = () => {
        setId('');
        setDisplay_img_url('');
		setName('');
		setSlug('');
		setDescription('');
		setForum_category_id('');
		
    }

    return {
        id,
        display_img_url,
		name,
		slug,
		description,
		forum_category_id,
		
        errors,
        isDisabled,
        setDisplay_img_url,
		setName,
		setSlug,
		setDescription,
		setForum_category_id,
		
        setId,
        setErrors,
        setIsDisabled,
        getForumCategory,
        createForumCategory,
        updateForumCategory,
        deleteForumCategory,
        fillForumCategory,
        emptyForumCategory
    };
}