import { useState } from 'react';
import { Services } from '../services';

export const useMenuItem = () => {
    const [id, setId] = useState('');
	const [name, setName] = useState('');
	const [slug, setSlug] = useState('');
	const [icon_url, setIcon_url] = useState('');
	const [type, setType] = useState('');
	const [is_accent, setIs_accent] = useState('');
	const [menu_item_id, setMenu_item_id] = useState('');
	const [menu_id, setMenu_id] = useState('');
	
    const [errors, setErrors] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);

    const getMenuItem = (menuitemId, signal) => {        
        return Services.MenuItemService.getById(menuitemId, signal)
        .then(response => {
            fillMenuItem(response.menuitem);
            setIsDisabled(false);

            return response;
        });
    }

    const createMenuItem = signal => {
        const payload = {
            name,
		slug,
		icon_url,
		type,
		is_accent,
		menu_item_id,
		menu_id,
		
        };

        return Services.MenuItemService.create(
        JSON.stringify(payload), signal);
    }
    const updateMenuItem = (menuitemId, signal) => {
        const payload = {
            name,
		slug,
		icon_url,
		type,
		is_accent,
		menu_item_id,
		menu_id,
		
        };

        return Services.MenuItemService.update(
        	menuitemId, JSON.stringify(payload), signal);
    }
    const deleteMenuItem = (menuitemId, signal) => {
        return Services.MenuItemService.destroy(menuitemId, signal);
    }
    const fillMenuItem = (menuitem) => {
        setId(menuitem.id);
        setName(menuitem.name ?? '');
		setSlug(menuitem.slug ?? '');
		setIcon_url(menuitem.icon_url ?? '');
		setType(menuitem.type ?? '');
		setIs_accent(menuitem.is_accent ?? '');
		setMenu_item_id(menuitem.menu_item_id ?? '');
		setMenu_id(menuitem.menu_id ?? '');
		
    }
    const emptyMenuItem = () => {
        setId('');
        setName('');
		setSlug('');
		setIcon_url('');
		setType('');
		setIs_accent('');
		setMenu_item_id('');
		setMenu_id('');
		
    }

    return {
        id,
        name,
		slug,
		icon_url,
		type,
		is_accent,
		menu_item_id,
		menu_id,
		
        errors,
        isDisabled,
        setName,
		setSlug,
		setIcon_url,
		setType,
		setIs_accent,
		setMenu_item_id,
		setMenu_id,
		
        setId,
        setErrors,
        setIsDisabled,
        getMenuItem,
        createMenuItem,
        updateMenuItem,
        deleteMenuItem,
        fillMenuItem,
        emptyMenuItem
    };
}