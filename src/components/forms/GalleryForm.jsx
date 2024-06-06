//'use client'
import { Utils } from '../../utils';

export function GalleryForm(props) {
    const {__} = Utils.String;

    return (
        <form onSubmit={props.handleFormSubmit ?? null}>
            <div className='row'>
                <div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='img_url'>{__('img_url')}</label>
                        <input className='form-control' type='text' id='img_url' name='img_url' 
                        placeholder={__('img_url')} value={props.useGallery.img_url ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useGallery.setImg_url(e.target.value) ?? null}/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='title'>{__('title')}</label>
                        <input className='form-control' type='text' id='title' name='title' 
                        placeholder={__('title')} value={props.useGallery.title ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useGallery.setTitle(e.target.value) ?? null}/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='slug'>{__('slug')}</label>
                        <input className='form-control' type='text' id='slug' name='slug' 
                        placeholder={__('slug')} value={props.useGallery.slug ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useGallery.setSlug(e.target.value) ?? null}/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='description'>{__('description')}</label>
                        <input className='form-control' type='text' id='description' name='description' 
                        placeholder={__('description')} value={props.useGallery.description ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useGallery.setDescription(e.target.value) ?? null}/>
                    </div>
                </div>
				
                <div className='col-12 text-right'>
                    <button disabled={props.isDisabled ?? false} type='submit' 
                    className='btn btn-primary'>
                        {props.isDisabled ? 'Chargement...' :  'Enregistrer'}
                    </button>
                </div>
            </div>
        </form>
    )
}