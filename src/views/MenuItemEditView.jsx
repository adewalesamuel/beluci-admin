//'use client'
import { useCallback, useEffect, useState } from 'react';
import { Components } from '../components';
import { Hooks } from '../hooks';
import { useParams } from 'react-router-dom';
import { Services } from '../services';

export function MenuItemEditView() {
    let abortController = new AbortController();

    const {id} = useParams();

    const useMenuItem = Hooks.useMenuItem();

    const [menu_items, setMenu_items] = useState([]);
	const [menus, setMenus] = useState([]);
	
    const [errorMessages, setErrorMessages] = useState([]);

    const handleFormSubmit = async e => {
        e.preventDefault();
        useMenuItem.setIsDisabled(true);
        setErrorMessages([]);
        
        try {
            await useMenuItem.updateMenuItem(
            	id, abortController.signal);
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
            await useMenuItem.getMenuItem(id, abortController.signal);
            
            const { menu_items } = await Services.MenuItemService
			.getAll(abortController.signal);
			setMenuItems(menu_items);

			const { menus } = await Services.MenuService
			.getAll(abortController.signal);
			setMenus(menus);

			
        } catch (error) {
            console.log(error);
        } finally{
            useMenuItem.setIsDisabled(false);
        }
    }, [])

    useEffect(() => {
        init();
    }, [init])

    return (
        <>
            <h3>Modifier MenuItem</h3>

            <Components.ErrorMessages>
                {errorMessages}
            </Components.ErrorMessages>
            <Components.MenuItemForm useMenuItem={useMenuItem}
            menu_items={menu_items} setMenuItems={setMenuItems}
			menus={menus} setMenus={setMenus}
			isDisabled={useMenuItem.isDisabled} handleFormSubmit={handleFormSubmit}/>
        </>
    )
}
