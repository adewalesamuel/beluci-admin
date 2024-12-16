//'use client'
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Services } from '../services';
import { Components } from '../components';
import { useError } from '../hooks/useError';

export function ForumCategoryListView() {
    let abortController = new AbortController();

    const { ForumCategoryService } = Services;

    const tableAttributes = {
        'display_img_url': {},
		'name': {},
		'slug': {},
		'description': {},
		'forum_category_id': {},
		
    }
    const tableActions = ['edit', 'delete'];
    
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const errorHandler = useError();

    const [forum_categorys, setForumCategorys] = useState([]);
    const [page, setPage] = useState(1);
    const [pageLength, setPageLength] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const handleEditClick = (e, data) => {
        e.preventDefault();
        navigate(`/forum-categorys/${data.id}/edit`);
    }
    const handleDeleteClick = async (e, forum_category) => {
        e.preventDefault();

        if (confirm('Voulez vous vraiment supprimer ce forum_category')) {
            const forum_categorysCopy = [...forum_categorys];
            const index = forum_categorysCopy.findIndex(forum_categoryItem => 
                forum_categoryItem.id === forum_category.id);

            forum_categorysCopy.splice(index, 1);
            setForumCategorys(forum_categorysCopy);

            await ForumCategoryService.destroy(forum_category.id, 
                abortController.signal);
        }
    }

    const init = useCallback(async () => {
        try {
            const {forum_categorys} = await ForumCategoryService.getAll(
                {page: page}, abortController.signal);

            setForumCategorys(forum_categorys.data);
            setPageLength(forum_categorys.last_page);
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
                <Link className='btn btn-info' to='/forum-categorys/create'>
                    Créer catégorie forum
                </Link>
                <Components.Table controllers={{handleEditClick, handleDeleteClick}} 
                tableAttributes={tableAttributes} tableActions={tableActions} 
                tableData={forum_categorys}/>

                <Components.Pagination pageLength={pageLength} page={parseInt(page)} />
            </Components.Loader>
        </>
    )
}
