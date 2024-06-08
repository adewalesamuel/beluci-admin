//'use client'
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Services } from '../services';
import { Components } from '../components';

export function RoleListView() {
    let abortController = new AbortController();

    const { RoleService } = Services;

    const tableAttributes = {
        'name': {},
		'slug': {},
		'permissions': {},
		
    }
    const tableActions = ['edit', 'delete'];
    
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [roles, setRoles] = useState([]);
    const [page, setPage] = useState(1);
    const [pageLength, setPageLength] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const handleEditClick = (e, data) => {
        e.preventDefault();
        navigate(`/roles/${data.id}/edit`);
    }
    const handleDeleteClick = async (e, role) => {
        e.preventDefault();

        if (confirm('Voulez vous vraiment supprimer ce role')) {
            const rolesCopy = [...roles];
            const index = rolesCopy.findIndex(roleItem => 
                roleItem.id === role.id);

            rolesCopy.splice(index, 1);
            setRoles(rolesCopy);

            await RoleService.destroy(role.id, 
                abortController.signal);
        }
    }

    const init = useCallback(async () => {
        try {
            const {roles} = await RoleService.getAll(
                {page: page}, abortController.signal);

            setRoles(roles.data);
            setPageLength(roles.last_page);
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
            <h4>Liste Roles</h4>
            <Components.Loader isLoading={isLoading}>
                <Link className='btn btn-info' to='/roles/create'>
                     Créer role
                </Link>
                <Components.Table controllers={{handleEditClick, handleDeleteClick}} 
                tableAttributes={tableAttributes} tableActions={tableActions} 
                tableData={roles}/>

                <Components.Pagination pageLength={pageLength} page={parseInt(page)} />
            </Components.Loader>
        </>
    )
}
