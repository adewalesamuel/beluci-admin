//'use client'
import { Utils } from '../../utils';
import { Components } from  "..";

export function GalleryForm(props) {
    const {__} = Utils.String;

    return (
        <form onSubmit={props.handleFormSubmit ?? null} className="col-12 col-md-8 col-lg-6">
            <div className='row'>
                <div className='col-12'>
                    <div className='form-group mb-2'>
                        <label htmlFor='img_url'>{__('img_url')}</label>
                        <Components.ImageFileInput img_url={props.useGallery.img_url ?? ''}
                        handleImageChange={props.useGallery.setImg_url}/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group mb-2'>
                        <label htmlFor='title'>{__('title')}</label>
                        <input className='form-control' type='text' id='title' name='title' 
                        placeholder={__('title')} value={props.useGallery.title ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useGallery.setTitle(e.target.value) ?? null}/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group mb-2'>
                        <label htmlFor='slug'>{__('slug')}</label>
                        <input className='form-control' type='text' id='slug' name='slug' 
                        placeholder={__('slug')} value={props.useGallery.slug ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useGallery.setSlug(e.target.value) ?? null}/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group mb-2'>
                        <label htmlFor='description'>{__('description')}</label>
                        <textarea className='form-control' type='text' id='description' name='description' 
                        placeholder={__('description')} value={props.useGallery.description ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useGallery.setDescription(e.target.value) ?? null} rows={5}></textarea>
                    </div>
                </div>
				
                <div className='col-12 text-right'>
                    <button disabled={props.isDisabled ?? false} type='submit' 
                    className='mt-3 btn btn-primary'>
                        {props.isDisabled ? 'Chargement...' :  'Enregistrer'}
                    </button>
                </div>
            </div>
        </form>
    )
}