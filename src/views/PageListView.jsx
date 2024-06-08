//'use client'
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Services } from '../services';
import { Components } from '../components';

export function PageListView() {
    let abortController = new AbortController();

    const { PageService } = Services;

    const tableAttributes = {
        'title': {},
        'slug': {},
		'description': {},
        'created_at': {},
        'updated_at': {},
		
    }
    const tableActions = ['edit', 'delete'];
    
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [pages, setPages] = useState([]);
    const [page, setPage] = useState(1);
    const [pageLength, setPageLength] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const handleEditClick = (e, data) => {
        e.preventDefault();
        navigate(`/pages/${data.id}/edit`);
    }
    const handleDeleteClick = async (e, page) => {
        e.preventDefault();

        if (confirm('Voulez vous vraiment supprimer ce page')) {
            const pagesCopy = [...pages];
            const index = pagesCopy.findIndex(pageItem => 
                pageItem.id === page.id);

            pagesCopy.splice(index, 1);
            setPages(pagesCopy);

            await PageService.destroy(page.id, 
                abortController.signal);
        }
    }

    const init = useCallback(async () => {
        try {
            const {pages} = await PageService.getAll(
                {page: page}, abortController.signal);

            setPages(pages.data);
            setPageLength(pages.last_page);
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
            <h4>Liste Pages</h4>
            <Components.Loader isLoading={isLoading}>
                <Link className='btn btn-info' to='/pages/create'>
                     Créer page
                </Link>
                <Components.Table controllers={{handleEditClick, handleDeleteClick}} 
                tableAttributes={tableAttributes} tableActions={tableActions} 
                tableData={pages}/>

                <Components.Pagination pageLength={pageLength} page={parseInt(page)} />
            </Components.Loader>
        </>
    )
}
