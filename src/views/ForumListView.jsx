//'use client'
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Services } from '../services';
import { Components } from '../components';
import { useError } from '../hooks/useError';

export function ForumListView() {
    let abortController = new AbortController();

    const { ForumService } = Services;

    const tableAttributes = {
        'name': {},
		'slug': {},
		'display_img_url': {},
		'description': {},
		'is_pinned': {},
		'member_id': {},
		'forum_category_name': {},
		
    }
    const tableActions = ['edit', 'delete'];
    
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const errorHandler = useError();

    const [forums, setForums] = useState([]);
    const [page, setPage] = useState(1);
    const [pageLength, setPageLength] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const handleEditClick = (e, data) => {
        e.preventDefault();
        navigate(`/forums/${data.id}/edit`);
    }
    const handleDeleteClick = async (e, forum) => {
        e.preventDefault();

        if (confirm('Voulez vous vraiment supprimer ce forum')) {
            const forumsCopy = [...forums];
            const index = forumsCopy.findIndex(forumItem => 
                forumItem.id === forum.id);

            forumsCopy.splice(index, 1);
            setForums(forumsCopy);

            await ForumService.destroy(forum.id, 
                abortController.signal);
        }
    }

    const init = useCallback(async () => {
        try {
            const {forums} = await ForumService.getAll(
                {page: page}, abortController.signal);

            const forumData = forums.data.map(forum => {
                forum['forum_category_name'] = forum?.forum_category?.name ?? '--';
                return {...forum,}
            })

            setForums(forumData);
            setPageLength(forums.last_page);
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
            <h6>Liste Forums</h6>
            <Components.Loader isLoading={isLoading}>
                <Link className='btn btn-info' to='/forums/create'>
                    Créer forum
                </Link>
                <Components.Table controllers={{handleEditClick, handleDeleteClick}} 
                tableAttributes={tableAttributes} tableActions={tableActions} 
                tableData={forums}/>

                <Components.Pagination pageLength={pageLength} page={parseInt(page)} />
            </Components.Loader>
        </>
    )
}
