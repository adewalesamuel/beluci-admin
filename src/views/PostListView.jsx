//'use client'
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Services } from '../services';
import { Components } from '../components';

export function PostListView() {
    let abortController = new AbortController();

    const { PostService } = Services;

    const tableAttributes = {
        'display_url': {},
		'title': {},
		'slug': {},
		'content': {},
		'excerpt': {},
		'author': {},
		'category_id': {},
		
    }
    const tableActions = ['edit', 'delete'];
    
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [pageLength, setPageLength] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const handleEditClick = (e, data) => {
        e.preventDefault();
        navigate(`/posts/${data.id}/edit`);
    }
    const handleDeleteClick = async (e, post) => {
        e.preventDefault();

        if (confirm('Voulez vous vraiment supprimer ce post')) {
            const postsCopy = [...posts];
            const index = postsCopy.findIndex(postItem => 
                postItem.id === post.id);

            postsCopy.splice(index, 1);
            setPosts(postsCopy);

            await PostService.destroy(post.id, 
                abortController.signal);
        }
    }

    const init = useCallback(async () => {
        try {
            const {posts} = await PostService.getAll(
                {page: page}, abortController.signal);

            setPosts(posts.data);
            setPageLength(posts.last_page);
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
            <h4>Liste Posts</h4>
            <Components.Loader isLoading={isLoading}>
                <Link className='btn btn-info' to='/posts/create'>
                     Créer post
                </Link>
                <Components.Table controllers={{handleEditClick, handleDeleteClick}} 
                tableAttributes={tableAttributes} tableActions={tableActions} 
                tableData={posts}/>

                <Components.Pagination pageLength={pageLength} page={parseInt(page)} />
            </Components.Loader>
        </>
    )
}
