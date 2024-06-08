//'use client'
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Services } from '../services';
import { Components } from '../components';
import { Hooks } from '../hooks';

export function MenuItemCreateView() {
    let abortController = new AbortController();

    const navigate = useNavigate();

    const useMenuItem = Hooks.useMenuItem();

    const [menu_items, setMenu_items] = useState([]);
	const [menus, setMenus] = useState([]);
	
    const [errorMessages, setErrorMessages] = useState([]);

    const handleFormSubmit = async e => {
        e.preventDefault();
        useMenuItem.setIsDisabled(true);
        setErrorMessages([]);
        
        try {
            await useMenuItem.createMenuItem(abortController.signal);

            navigate('/menu-items');
        } catch (error) {
            if ('message' in error) setErrorMessages([error.message]);
            if (!('messages' in error)) return;

            const messages = await error.messages;

            setErrorMessages(messages);
        } finally {
            useMenuItem.setIsDisabled(false);
        }
    }

    const init = useCallback(async () => {
        useMenuItem.setIsDisabled(true);

        try {
            const { menu_items } = await Services.MenuItemService
			.getAll(abortController.signal);
			setMenu_items(menu_items);

			const { menus } = await Services.MenuService
			.getAll(abortController.signal);
			setMenus(menus);

			
        } catch (error) {
            console.log(error);
        } finally {
            useMenuItem.setIsDisabled(false);
        }
    }, [])

    useEffect(() => {
        init()
    }, [init])

    return (
        <>
            <h3>Créer MenuItem</h3>

            <Components.ErrorMessages>
                {errorMessages}
            </Components.ErrorMessages>
            <Components.MenuItemForm useMenuItem={useMenuItem}
            menu_items={menu_items} setMenu_items={setMenu_items}
			menus={menus} setMenus={setMenus}
			isDisabled={useMenuItem.isDisabled} handleFormSubmit={handleFormSubmit}/>
        </>
    )
}
