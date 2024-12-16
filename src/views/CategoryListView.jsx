//'use client'
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Services } from '../services';
import { Components } from '../components';
import { useError } from '../hooks/useError';

export function CategoryListView() {
    let abortController = new AbortController();
    const errorHandler = useError();

    const { CategoryService } = Services;

    const tableAttributes = {
		'name': {},
		'slug': {},
		'category_id': {},
		
    }
    const tableActions = ['edit', 'delete'];
    
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [categorys, setCategorys] = useState([]);
    const [page, setPage] = useState(1);
    const [pageLength, setPageLength] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const handleEditClick = (e, data) => {
        e.preventDefault();
        navigate(`/categorys/${data.id}/edit`);
    }
    const handleDeleteClick = async (e, category) => {
        e.preventDefault();

        if (confirm('Voulez vous vraiment supprimer ce category')) {
            const categorysCopy = [...categorys];
            const index = categorysCopy.findIndex(categoryItem => 
                categoryItem.id === category.id);

            categorysCopy.splice(index, 1);
            setCategorys(categorysCopy);

            await CategoryService.destroy(category.id, 
                abortController.signal);
        }
    }

    const init = useCallback(async () => {
        try {
            const {categorys} = await CategoryService.getAll(
                {page: page}, abortController.signal);

            setCategorys(categorys.data);
            setPageLength(categorys.last_page);
        } catch (error) {
            errorHandler.setError(error); 
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
            <Components.Loader isLoading={isLoading}>
                <Link className='btn btn-info' to='/categorys/create'>
                     Créer category
                </Link>
                <Components.Table controllers={{handleEditClick, handleDeleteClick}} 
                tableAttributes={tableAttributes} tableActions={tableActions} 
                tableData={categorys}/>

                <Components.Pagination pageLength={pageLength} page={parseInt(page)} />
            </Components.Loader>
        </>
    )
}
