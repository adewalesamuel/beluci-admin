//'use client'
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Services } from '../services';
import { Components } from '../components';

export function EventListView() {
    let abortController = new AbortController();

    const { EventService } = Services;

    const tableAttributes = {
        'img_url': {},
		'name': {},
		'date': {},
		'time': {},
		'address': {},
		'gps_location': {},
		'is_payed': {},
		'price': {},
		'features': {},
		'description': {},
		
    }
    const tableActions = ['edit', 'delete'];
    
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [events, setEvents] = useState([]);
    const [page, setPage] = useState(1);
    const [pageLength, setPageLength] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const handleEditClick = (e, data) => {
        e.preventDefault();
        navigate(`/events/${data.id}/edit`);
    }
    const handleDeleteClick = async (e, event) => {
        e.preventDefault();

        if (confirm('Voulez vous vraiment supprimer ce event')) {
            const eventsCopy = [...events];
            const index = eventsCopy.findIndex(eventItem => 
                eventItem.id === event.id);

            eventsCopy.splice(index, 1);
            setEvents(eventsCopy);

            await EventService.destroy(event.id, 
                abortController.signal);
        }
    }

    const init = useCallback(async () => {
        try {
            const {events} = await EventService.getAll(
                {page: page}, abortController.signal);

            setEvents(events.data);
            setPageLength(events.last_page);
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
            <h6>Liste Events</h6>
            <Components.Loader isLoading={isLoading}>
                <Link className='btn btn-info' to='/events/create'>
                    <i className='icon ion-plus'></i> Créer event
                </Link>
                <Components.Table controllers={{handleEditClick, handleDeleteClick}} 
                tableAttributes={tableAttributes} tableActions={tableActions} 
                tableData={events}/>

                <Components.Pagination pageLength={pageLength} page={parseInt(page)} />
            </Components.Loader>
        </>
    )
}
