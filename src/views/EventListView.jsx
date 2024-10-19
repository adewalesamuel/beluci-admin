//'use client'
import { useCallback, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Services } from '../services';
import { Components } from '../components';
import { useError } from '../hooks/useError';

export function EventListView() {
    let abortController = new AbortController();
    const errorHandler = useError();

    const { EventService } = Services;
    const [searchParams] = useSearchParams();

    const [events, setEvents] = useState([]);
    const [page, setPage] = useState(1);
    const [pageLength, setPageLength] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const init = useCallback(async () => {
        try {
            const {events} = await EventService.getAll(
                {page: page}, abortController.signal);

            setEvents(events.data);
            setPageLength(events.last_page);
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
            <div className="d-flex justify-content-end">
                <Link className='btn btn-primary' to='/events/create'>
                     Créer un évènement
                </Link>
            </div>
            <Components.Loader isLoading={isLoading}>
                <div className="row mb-3 align-items-stretch">
                    {events.map((event, index) => {
                        return (
                            <div className="col-12 col-md-6 col-lg-4" key={index}>
                                <div className="card h-100 position-relative">
                                    <div className="card-img-top bg-light">
                                        <img src={event.img_url} className='img-fluid' 
                                        alt={event.name} loading='lazy'/>
                                    </div>
                                    <div className="card-body">
                                        <h3 className='card-title'>{event.name}</h3>
                                        <address className='mb-1'>{event.address}</address>
                                        <time>
                                            {new Date(event.date).toLocaleDateString(
                                                'fr', {'dateStyle':'short'})}
                                        </time>
                                    </div>
                                    <Link to={`/events/${event.id}/edit`} className="stretched-link"></Link>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <Components.Pagination pageLength={pageLength} page={parseInt(page)} />
            </Components.Loader>
        </>
    )
}
