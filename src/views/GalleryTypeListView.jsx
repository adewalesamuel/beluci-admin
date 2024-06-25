//'use client'
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Services } from '../services';
import { Components } from '../components';

export function GalleryTypeListView() {
    let abortController = new AbortController();

    const { GalleryTypeService } = Services;

    const tableAttributes = {
        'display_img_url': {},
		'name': {},
		'slug': {},
		
    }
    const tableActions = ['edit', 'delete'];
    
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [gallery_types, setGallery_types] = useState([]);
    const [page, setPage] = useState(1);
    const [pageLength, setPageLength] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const handleEditClick = (e, data) => {
        e.preventDefault();
        navigate(`/gallery-types/${data.id}/edit`);
    }
    const handleDeleteClick = async (e, gallery) => {
        e.preventDefault();

        if (confirm('Voulez vous vraiment supprimer ce gallery')) {
            const gallery_typesCopy = [...gallery_types];
            const index = gallery_typesCopy.findIndex(galleryItem => 
                galleryItem.id === gallery.id);

            gallery_typesCopy.splice(index, 1);
            setGallery_types(gallery_typesCopy);

            await GalleryTypeService.destroy(gallery.id, 
                abortController.signal);
        }
    }

    const init = useCallback(async () => {
        try {
            const {gallery_types} = await GalleryTypeService.getAll(
                {page: page}, abortController.signal);

            const galleryTypeData = gallery_types.data.map(gallery => {
                gallery['display_img_url'] = (<img src={gallery.img_url} 
                    className="rounded" width={50}/>);
                
                return gallery;
            });

            setGallery_types(galleryTypeData);
            setPageLength(gallery_types.last_page);
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
            <h4>Liste GalleryTypes</h4>
            <Components.Loader isLoading={isLoading}>
                <Link className='btn btn-info' to='/gallery-types/create'>
                     Créer type gallery
                </Link>
                <Components.Table controllers={{handleEditClick, handleDeleteClick}} 
                tableAttributes={tableAttributes} tableActions={tableActions} 
                tableData={gallery_types}/>

                <Components.Pagination pageLength={pageLength} page={parseInt(page)} />
            </Components.Loader>
        </>
    )
}
