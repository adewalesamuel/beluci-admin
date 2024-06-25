import { useState } from 'react';
import { Services } from '../services';

export const useGalleryType = () => {
    const [id, setId] = useState('');
	const [display_img_url, setDisplay_img_url] = useState('');
	const [name, setName] = useState('');
	const [slug, setSlug] = useState('');
	
    const [errors, setErrors] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);

    const getGalleryType = (galleryTypeId, signal) => {        
        return Services.GalleryTypeService.getById(galleryTypeId, signal)
        .then(response => {
            fillGalleryType(response.gallery_type);
            setIsDisabled(false);

            return response;
        });
    }

    const createGalleryType = signal => {
        const payload = {
            display_img_url,
		name,
		slug,
		
        };

        return Services.GalleryTypeService.create(
        JSON.stringify(payload), signal);
    }
    const updateGalleryType = (galleryTypeId, signal) => {
        const payload = {
            display_img_url,
		name,
		slug,
		
        };

        return Services.GalleryTypeService.update(
        	galleryTypeId, JSON.stringify(payload), signal);
    }
    const deleteGalleryType = (galleryTypeId, signal) => {
        return Services.GalleryTypeService.destroy(galleryTypeId, signal);
    }
    const fillGalleryType = (galleryType) => {
        setId(galleryType.id);
        setDisplay_img_url(galleryType.display_img_url ?? '');
		setName(galleryType.name ?? '');
		setSlug(galleryType.slug ?? '');
		
    }
    const emptyGalleryType = () => {
        setId('');
        setDisplay_img_url('');
		setName('');
		setSlug('');
		
    }

    return {
        id,
        display_img_url,
		name,
		slug,
		
        errors,
        isDisabled,
        setDisplay_img_url,
		setName,
		setSlug,
		
        setId,
        setErrors,
        setIsDisabled,
        getGalleryType,
        createGalleryType,
        updateGalleryType,
        deleteGalleryType,
        fillGalleryType,
        emptyGalleryType
    };
}