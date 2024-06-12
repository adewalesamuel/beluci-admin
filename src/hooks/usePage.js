import { useState } from 'react';
import { Services } from '../services';

export const usePage = () => {
    const [id, setId] = useState('');
	const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
	const [description, setDescription] = useState('');
	const [keywords, setKeywords] = useState('');
	const [display_img_url, setDisplay_img_url] = useState('');
	const [section_list, setSection_list] = useState([]);
	
    const [errors, setErrors] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);

    const getPage = (pageId, signal) => {        
        return Services.PageService.getById(pageId, signal)
        .then(response => {
            fillPage(response.page);
            setIsDisabled(false);

            return response;
        });
    }

    const createPage = signal => {
        const payload = {
            title,
            slug,
		description,
		keywords,
		display_img_url,
		section_list: JSON.stringify(section_list),
		
        };

        return Services.PageService.create(
        JSON.stringify(payload), signal);
    }
    const updatePage = (pageId, signal) => {
        const payload = {
            title,
            slug,
		description,
		keywords,
		display_img_url,
		section_list: JSON.stringify(section_list),
		
        };

        return Services.PageService.update(
        	pageId, JSON.stringify(payload), signal);
    }
    const deletePage = (pageId, signal) => {
        return Services.PageService.destroy(pageId, signal);
    }
    const fillPage = (page) => {
        setId(page.id);
        setTitle(page.title ?? '');
        setSlug(page.slug ?? '');
		setDescription(page.description ?? '');
		setKeywords(page.keywords ?? '');
		setDisplay_img_url(page.display_img_url ?? '');
		setSection_list(page.section_list);
		
    }
    const emptyPage = () => {
        setId('');
        setTitle('');
        setSlug('');
		setDescription('');
		setKeywords('');
		setDisplay_img_url('');
		setSection_list([]);
		
    }

    return {
        id,
        title,
        slug,
		description,
		keywords,
		display_img_url,
		section_list,
		
        errors,
        isDisabled,
        setTitle,
        setSlug,
		setDescription,
		setKeywords,
		setDisplay_img_url,
		setSection_list,
		
        setId,
        setErrors,
        setIsDisabled,
        getPage,
        createPage,
        updatePage,
        deletePage,
        fillPage,
        emptyPage
    };
}