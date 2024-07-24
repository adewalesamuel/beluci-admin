//'use client'
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Services } from '../services';
import { Components } from '../components';
import { useError } from '../hooks/useError';

export function MessageListView() {
    let abortController = new AbortController();

    const { MessageService } = Services;

    const tableAttributes = {
        'content': {},
		'member_id': {},
		'forum_id': {},
		
    }
    const tableActions = ['edit', 'delete'];
    
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const {id} = useParams();
    const errorHandler = useError();

    const [messages, setMessages] = useState([]);
    const [page, setPage] = useState(1);
    const [pageLength, setPageLength] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const handleEditClick = (e, data) => {
        e.preventDefault();
        navigate(`/messages/${data.id}/edit`);
    }
    const handleDeleteClick = async (e, message) => {
        e.preventDefault();

        if (confirm('Voulez vous vraiment supprimer ce message')) {
            const messagesCopy = [...messages];
            const index = messagesCopy.findIndex(messageItem => 
                messageItem.id === message.id);

            messagesCopy.splice(index, 1);
            setMessages(messagesCopy);

            await MessageService.destroy(message.id, 
                abortController.signal);
        }
    }

    const init = useCallback(async () => {
        try {
            const {messages} = await MessageService.getByForumId(
                id, {page: page}, abortController.signal);

            setMessages(messages.data);
            setPageLength(messages.last_page);
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
            <h6>Liste Messages</h6>
            <Components.Loader isLoading={isLoading}>
                <Link className='btn btn-info' to='/messages/create'>
                    Créer message
                </Link>
                <Components.Table controllers={{handleEditClick, handleDeleteClick}} 
                tableAttributes={tableAttributes} tableActions={tableActions} 
                tableData={messages}/>

                <Components.Pagination pageLength={pageLength} page={parseInt(page)} />
            </Components.Loader>
        </>
    )
}
