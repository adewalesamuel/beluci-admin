//'use client'
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Services } from '../services';
import { Components } from '../components';

export function AdminListView() {
    let abortController = new AbortController();

    const { AdminService } = Services;

    const tableAttributes = {
        'name': {},
		'email': {},
		'password': {},
		'role_id': {},
		
    }
    const tableActions = ['edit', 'delete'];
    
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [admins, setAdmins] = useState([]);
    const [page, setPage] = useState(1);
    const [pageLength, setPageLength] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const handleEditClick = (e, data) => {
        e.preventDefault();
        navigate(`/admins/${data.id}/edit`);
    }
    const handleDeleteClick = async (e, admin) => {
        e.preventDefault();

        if (confirm('Voulez vous vraiment supprimer ce admin')) {
            const adminsCopy = [...admins];
            const index = adminsCopy.findIndex(adminItem => 
                adminItem.id === admin.id);

            adminsCopy.splice(index, 1);
            setAdmins(adminsCopy);

            await AdminService.destroy(admin.id, 
                abortController.signal);
        }
    }

    const init = useCallback(async () => {
        try {
            const {admins} = await AdminService.getAll(
                {page: page}, abortController.signal);

            setAdmins(admins.data);
            setPageLength(admins.last_page);
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
            <h6>Liste Admins</h6>
            <Components.Loader isLoading={isLoading}>
                <Link className='btn btn-info' to='/admins/create'>
                    <i className='icon ion-plus'></i> Créer admin
                </Link>
                <Components.Table controllers={{handleEditClick, handleDeleteClick}} 
                tableAttributes={tableAttributes} tableActions={tableActions} 
                tableData={admins}/>

                <Components.Pagination pageLength={pageLength} page={parseInt(page)} />
            </Components.Loader>
        </>
    )
}
