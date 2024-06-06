//'use client'
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Services } from '../services';
import { Components } from '../components';

export function SiteListView() {
    let abortController = new AbortController();

    const { SiteService } = Services;

    const tableAttributes = {
        'logo_url': {},
		'favicon_url': {},
		'name': {},
		'slogan': {},
		'phone_number': {},
		'primary_color': {},
		'secondary_color': {},
		'copyright_text': {},
		'footer_logo_url': {},
		'is_up': {},
		
    }
    const tableActions = ['edit', 'delete'];
    
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [sites, setSites] = useState([]);
    const [page, setPage] = useState(1);
    const [pageLength, setPageLength] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const handleEditClick = (e, data) => {
        e.preventDefault();
        navigate(`/sites/${data.id}/edit`);
    }
    const handleDeleteClick = async (e, site) => {
        e.preventDefault();

        if (confirm('Voulez vous vraiment supprimer ce site')) {
            const sitesCopy = [...sites];
            const index = sitesCopy.findIndex(siteItem => 
                siteItem.id === site.id);

            sitesCopy.splice(index, 1);
            setSites(sitesCopy);

            await SiteService.destroy(site.id, 
                abortController.signal);
        }
    }

    const init = useCallback(async () => {
        try {
            const {sites} = await SiteService.getAll(
                {page: page}, abortController.signal);

            setSites(sites.data);
            setPageLength(sites.last_page);
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
            <h6>Liste Sites</h6>
            <Components.Loader isLoading={isLoading}>
                <Link className='btn btn-info' to='/sites/create'>
                    <i className='icon ion-plus'></i> Créer site
                </Link>
                <Components.Table controllers={{handleEditClick, handleDeleteClick}} 
                tableAttributes={tableAttributes} tableActions={tableActions} 
                tableData={sites}/>

                <Components.Pagination pageLength={pageLength} page={parseInt(page)} />
            </Components.Loader>
        </>
    )
}
