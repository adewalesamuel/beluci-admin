import { useState } from 'react';
import { Services } from '../services';

export const useCategory = () => {
    const [id, setId] = useState('');
	const [display_url, setDisplay_url] = useState('');
	const [name, setName] = useState('');
	const [slug, setSlug] = useState('');
	const [category_id, setCategory_id] = useState('');
	
    const [errors, setErrors] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);

    const getCategory = (categoryId, signal) => {        
        return Services.CategoryService.getById(categoryId, signal)
        .then(response => {
            fillCategory(response.category);
            setIsDisabled(false);

            return response;
        });
    }

    const createCategory = signal => {
        const payload = {
            display_url,
		name,
		slug,
		category_id,
		
        };

        return Services.CategoryService.create(
        JSON.stringify(payload), signal);
    }
    const updateCategory = (categoryId, signal) => {
        const payload = {
            display_url,
		name,
		slug,
		category_id,
		
        };

        return Services.CategoryService.update(
        	categoryId, JSON.stringify(payload), signal);
    }
    const deleteCategory = (categoryId, signal) => {
        return Services.CategoryService.destroy(categoryId, signal);
    }
    const fillCategory = (category) => {
        setId(category.id);
        setDisplay_url(category.display_url ?? '');
		setName(category.name ?? '');
		setSlug(category.slug ?? '');
		setCategory_id(category.category_id ?? '');
		
    }
    const emptyCategory = () => {
        setId('');
        setDisplay_url('');
		setName('');
		setSlug('');
		setCategory_id('');
		
    }

    return {
        id,
        display_url,
		name,
		slug,
		category_id,
		
        errors,
        isDisabled,
        setDisplay_url,
		setName,
		setSlug,
		setCategory_id,
		
        setId,
        setErrors,
        setIsDisabled,
        getCategory,
        createCategory,
        updateCategory,
        deleteCategory,
        fillCategory,
        emptyCategory
    };
}