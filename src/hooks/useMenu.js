import { useState } from 'react';
import { Services } from '../services';

export const useMenu = () => {
    const [id, setId] = useState('');
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	
    const [errors, setErrors] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);

    const getMenu = (menuId, signal) => {        
        return Services.MenuService.getById(menuId, signal)
        .then(response => {
            fillMenu(response.menu);
            setIsDisabled(false);

            return response;
        });
    }

    const createMenu = signal => {
        const payload = {
            name,
		description,
		
        };

        return Services.MenuService.create(
        JSON.stringify(payload), signal);
    }
    const updateMenu = (menuId, signal) => {
        const payload = {
            name,
		description,
		
        };

        return Services.MenuService.update(
        	menuId, JSON.stringify(payload), signal);
    }
    const deleteMenu = (menuId, signal) => {
        return Services.MenuService.destroy(menuId, signal);
    }
    const fillMenu = (menu) => {
        setId(menu.id);
        setName(menu.name ?? '');
		setDescription(menu.description ?? '');
		
    }
    const emptyMenu = () => {
        setId('');
        setName('');
		setDescription('');
		
    }

    return {
        id,
        name,
		description,
		
        errors,
        isDisabled,
        setName,
		setDescription,
		
        setId,
        setErrors,
        setIsDisabled,
        getMenu,
        createMenu,
        updateMenu,
        deleteMenu,
        fillMenu,
        emptyMenu
    };
}