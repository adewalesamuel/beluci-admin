//'use client'
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Services } from '../services';
import { Components } from '../components';

export function PermissionListView() {
    let abortController = new AbortController();

    const { PermissionService } = Services;

    const tableAttributes = {
        'name': {},
		'slug': {},
		
    }
    const tableActions = ['edit', 'delete'];
    
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [permissions, setPermissions] = useState([]);
    const [page, setPage] = useState(1);
    const [pageLength, setPageLength] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const handleEditClick = (e, data) => {
        e.preventDefault();
        navigate(`/permissions/${data.id}/edit`);
    }
    const handleDeleteClick = async (e, permission) => {
        e.preventDefault();

        if (confirm('Voulez vous vraiment supprimer ce permission')) {
            const permissionsCopy = [...permissions];
            const index = permissionsCopy.findIndex(permissionItem => 
                permissionItem.id === permission.id);

            permissionsCopy.splice(index, 1);
            setPermissions(permissionsCopy);

            await PermissionService.destroy(permission.id, 
                abortController.signal);
        }
    }

    const init = useCallback(async () => {
        try {
            const {permissions} = await PermissionService.getAll(
                {page: page}, abortController.signal);

            setPermissions(permissions.data);
            setPageLength(permissions.last_page);
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
            <h6>Liste Permissions</h6>
            <Components.Loader isLoading={isLoading}>
                <Link className='btn btn-info' to='/permissions/create'>
                    <i className='icon ion-plus'></i> Créer permission
                </Link>
                <Components.Table controllers={{handleEditClick, handleDeleteClick}} 
                tableAttributes={tableAttributes} tableActions={tableActions} 
                tableData={permissions}/>

                <Components.Pagination pageLength={pageLength} page={parseInt(page)} />
            </Components.Loader>
        </>
    )
}
