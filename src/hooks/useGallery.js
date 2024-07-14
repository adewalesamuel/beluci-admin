import { useState } from 'react';
import { Services } from '../services';

export const useGallery = () => {
    const [id, setId] = useState('');
	const [img_url, setImg_url] = useState('');
	const [title, setTitle] = useState('');
	const [slug, setSlug] = useState('');
	const [description, setDescription] = useState('');
    const [event_id, setEvent_id] = useState('');
	
    const [errors, setErrors] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);

    const getGallery = (galleryId, signal) => {        
        return Services.GalleryService.getById(galleryId, signal)
        .then(response => {
            fillGallery(response.gallery);
            setIsDisabled(false);

            return response;
        });
    }

    const createGallery = signal => {
        const payload = {
            img_url,
		title,
		slug,
		description,
        event_id
		
        };

        return Services.GalleryService.create(
        JSON.stringify(payload), signal);
    }
    const updateGallery = (galleryId, signal) => {
        const payload = {
            img_url,
		title,
		slug,
		description,
        event_id
		
        };

        return Services.GalleryService.update(
        	galleryId, JSON.stringify(payload), signal);
    }
    const deleteGallery = (galleryId, signal) => {
        return Services.GalleryService.destroy(galleryId, signal);
    }
    const fillGallery = (gallery) => {
        setId(gallery.id);
        setImg_url(gallery.img_url ?? '');
		setTitle(gallery.title ?? '');
		setSlug(gallery.slug ?? '');
		setDescription(gallery.description ?? '');
		setEvent_id(gallery.event_id ?? '');
		
    }
    const emptyGallery = () => {
        setId('');
        setImg_url('');
		setTitle('');
		setSlug('');
		setDescription('');
		setEvent_id('');
		
    }

    return {
        id,
        img_url,
		title,
		slug,
		description,
        event_id,
		
        errors,
        isDisabled,
        setImg_url,
		setTitle,
		setSlug,
		setDescription,
        setEvent_id,
		
        setId,
        setErrors,
        setIsDisabled,
        getGallery,
        createGallery,
        updateGallery,
        deleteGallery,
        fillGallery,
        emptyGallery
    };
}