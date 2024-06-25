//'use client'
import { Utils } from '../../utils';
import { Components } from  "..";

export function GalleryTypeForm(props) {
    const {__} = Utils.String;

    return (
        <form onSubmit={props.handleFormSubmit ?? null} className="col-12 col-md-8 col-lg-6">
            <div className='row'>
                <div className='col-12'>
                    <div className='form-group mb-2'>
                        <label htmlFor='display_img_url'>{__('display_img_url')}</label>
                        <Components.ImageFileInput img_url={props.useGalleryType.display_img_url ?? ''}
                        handleImageChange={props.useGalleryType.setDisplay_img_url}/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group mb-2'>
                        <label htmlFor='name'>{__('name')}</label>
                        <input className='form-control' type='text' id='name' name='name' 
                        placeholder={__('name')} value={props.useGalleryType.name ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useGalleryType.setName(e.target.value) ?? null}/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group mb-2'>
                        <label htmlFor='slug'>{__('slug')}</label>
                        <input className='form-control' type='text' id='slug' name='slug' 
                        placeholder={__('slug')} value={props.useGalleryType.slug ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useGalleryType.setSlug(e.target.value) ?? null}/>
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