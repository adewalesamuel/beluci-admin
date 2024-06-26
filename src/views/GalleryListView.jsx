//'use client'
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Services } from '../services';
import { Components } from '../components';

export function GalleryListView() {
    let abortController = new AbortController();

    const { GalleryService } = Services;

    const tableAttributes = {
        'img_url': {},
		'title': {},
		'slug': {},
        'type': {}
		
    }
    const tableActions = ['edit', 'delete'];
    
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [gallerys, setGallerys] = useState([]);
    const [page, setPage] = useState(1);
    const [pageLength, setPageLength] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const handleEditClick = (e, data) => {
        e.preventDefault();
        navigate(`/gallerys/${data.id}/edit`);
    }
    const handleDeleteClick = async (e, gallery) => {
        e.preventDefault();

        if (confirm('Voulez vous vraiment supprimer ce gallery')) {
            const gallerysCopy = [...gallerys];
            const index = gallerysCopy.findIndex(galleryItem => 
                galleryItem.id === gallery.id);

            gallerysCopy.splice(index, 1);
            setGallerys(gallerysCopy);

            await GalleryService.destroy(gallery.id, 
                abortController.signal);
        }
    }

    const init = useCallback(async () => {
        try {
            const {gallerys} = await GalleryService.getAll(
                {page: page}, abortController.signal);

            const galleryData = gallerys.data.map(gallery => {
                gallery['type'] = gallery?.gallery_type?.name ?? "__";
                gallery['img_url'] = (<img src={gallery.img_url} 
                    className="rounded" width={50}/>);
                
                return gallery;
            });

            console.log(galleryData)

            setGallerys(galleryData);
            setPageLength(gallerys.last_page);
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
            <h4>Liste Gallerys</h4>
            <Components.Loader isLoading={isLoading}>
                <Link className='btn btn-info' to='/gallerys/create'>
                     Créer gallery
                </Link>
                <Components.Table controllers={{handleEditClick, handleDeleteClick}} 
                tableAttributes={tableAttributes} tableActions={tableActions} 
                tableData={gallerys}/>

                <Components.Pagination pageLength={pageLength} page={parseInt(page)} />
            </Components.Loader>
        </>
    )
}
