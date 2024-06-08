//'use client'
import { Utils } from '../../utils';
import { Components } from  "..";

export function PageForm(props) {
    const {__} = Utils.String;

    return (
        <form onSubmit={props.handleFormSubmit ?? null} className="col-12">
            <div className='row'>
                <div className="col-12 col-lg-8">
                    <div className='w-100'>
                        <div className='form-group mb-2'>
                            <label htmlFor='section_list'>{__('section_list')}</label>
                            <input className='form-control' type='text' id='section_list' name='section_list' 
                            placeholder={__('section_list')} value={props.usePage.section_list ?? ''}
                            disabled={props.isDisabled} onChange={ e => 
                                props.usePage.setSection_list(e.target.value) ?? null}/>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-4">
                    <div className='w-100'>
                        <div className='form-group mb-2'>
                            <label htmlFor='title'>{__('title')}</label>
                            <input className='form-control' type='text' id='title' name='title' 
                            placeholder={__('title')} value={props.usePage.title ?? ''}
                            disabled={props.isDisabled} onChange={ e => 
                                props.usePage.setTitle(e.target.value) ?? null}/>
                        </div>
                    </div>
                    <div className='w-100'>
                        <div className='form-group mb-2'>
                            <label htmlFor='description'>{__('description')}</label>
                            <textarea className='form-control' type='text' id='description' name='description' 
                            placeholder={__('description')} value={props.usePage.description ?? ''}
                            disabled={props.isDisabled} onChange={ e => 
                                props.usePage.setDescription(e.target.value) ?? null} rows={5}></textarea>
                        </div>
                    </div>
                    <div className='w-100'>
                        <div className='form-group mb-2'>
                            <label htmlFor='keywords'>{__('keywords')}</label>
                            <input className='form-control' type='text' id='keywords' name='keywords' 
                            placeholder={__('keywords')} value={props.usePage.keywords ?? ''}
                            disabled={props.isDisabled} onChange={ e => 
                                props.usePage.setKeywords(e.target.value) ?? null}/>
                        </div>
                    </div>
                    <div className='w-100'>
                        <div className='form-group mb-2'>
                            <label htmlFor='display_img_url'>{__('display_img_url')}</label>
                            <Components.ImageFileInput img_url={props.usePage.display_img_url ?? ''}
                            handleImageChange={props.usePage.setDisplay_img_url} 
                            width={500} height={200} />
                        </div>
                    </div>
                    <div className='col-12 text-right'>
                        <button disabled={props.isDisabled ?? false} type='submit' 
                        className='mt-3 btn btn-primary w-100'>
                            {props.isDisabled ? 'Chargement...' :  'Enregistrer'}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}