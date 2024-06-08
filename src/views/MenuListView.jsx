//'use client'
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Services } from '../services';
import { Components } from '../components';

export function MenuListView() {
    let abortController = new AbortController();

    const { MenuService } = Services;

    const tableAttributes = {
        'name': {},
		'description': {},
		
    }
    const tableActions = ['edit', 'delete'];
    
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [menus, setMenus] = useState([]);
    const [page, setPage] = useState(1);
    const [pageLength, setPageLength] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const handleEditClick = (e, data) => {
        e.preventDefault();
        navigate(`/menus/${data.id}/edit`);
    }
    const handleDeleteClick = async (e, menu) => {
        e.preventDefault();

        if (confirm('Voulez vous vraiment supprimer ce menu')) {
            const menusCopy = [...menus];
            const index = menusCopy.findIndex(menuItem => 
                menuItem.id === menu.id);

            menusCopy.splice(index, 1);
            setMenus(menusCopy);

            await MenuService.destroy(menu.id, 
                abortController.signal);
        }
    }

    const init = useCallback(async () => {
        try {
            const {menus} = await MenuService.getAll(
                {page: page}, abortController.signal);

            setMenus(menus.data);
            setPageLength(menus.last_page);
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
            <h4>Liste Menus</h4>
            <Components.Loader isLoading={isLoading}>
                <Link className='btn btn-info' to='/menus/create'>
                     Créer menu
                </Link>
                <Components.Table controllers={{handleEditClick, handleDeleteClick}} 
                tableAttributes={tableAttributes} tableActions={tableActions} 
                tableData={menus}/>

                <Components.Pagination pageLength={pageLength} page={parseInt(page)} />
            </Components.Loader>
        </>
    )
}
