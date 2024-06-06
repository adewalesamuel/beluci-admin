//'use client'
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Services } from '../services';
import { Components } from '../components';

export function MenuItemListView() {
    let abortController = new AbortController();

    const { MenuItemService } = Services;

    const tableAttributes = {
        'name': {},
		'slug': {},
		'icon_url': {},
		'type': {},
		'is_accent': {},
		'menu_item_id': {},
		'menu_id': {},
		
    }
    const tableActions = ['edit', 'delete'];
    
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [menuitems, setMenuItems] = useState([]);
    const [page, setPage] = useState(1);
    const [pageLength, setPageLength] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const handleEditClick = (e, data) => {
        e.preventDefault();
        navigate(`/menuitems/${data.id}/edit`);
    }
    const handleDeleteClick = async (e, menuitem) => {
        e.preventDefault();

        if (confirm('Voulez vous vraiment supprimer ce menuitem')) {
            const menuitemsCopy = [...menuitems];
            const index = menuitemsCopy.findIndex(menuitemItem => 
                menuitemItem.id === menuitem.id);

            menuitemsCopy.splice(index, 1);
            setMenuItems(menuitemsCopy);

            await MenuItemService.destroy(menuitem.id, 
                abortController.signal);
        }
    }

    const init = useCallback(async () => {
        try {
            const {menuitems} = await MenuItemService.getAll(
                {page: page}, abortController.signal);

            setMenuItems(menuitems.data);
            setPageLength(menuitems.last_page);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [page]);

    useEffect(() => {
        init();

        return () => {
            abortController.abort();
            abortController = new AbortController();
        }
    }, [init]);

    useEffect(() => {
        if (!searchParams.get('page')) return;

        setPage(searchParams.get('page'));
    }, [searchParams.get('page')]);

    return (
        <>
            <h6>Liste MenuItems</h6>
            <Components.Loader isLoading={isLoading}>
                <Link className='btn btn-info' to='/menuitems/create'>
                    <i className='icon ion-plus'></i> Créer menuitem
                </Link>
                <Components.Table controllers={{handleEditClick, handleDeleteClick}} 
                tableAttributes={tableAttributes} tableActions={tableActions} 
                tableData={menuitems}/>

                <Components.Pagination pageLength={pageLength} page={parseInt(page)} />
            </Components.Loader>
        </>
    )
}
