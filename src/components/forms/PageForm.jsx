//'use client'
import { Utils } from '../../utils';

export function PageForm(props) {
    const {__} = Utils.String;

    return (
        <form onSubmit={props.handleFormSubmit ?? null}>
            <div className='row'>
                <div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='title'>{__('title')}</label>
                        <input className='form-control' type='text' id='title' name='title' 
                        placeholder={__('title')} value={props.usePage.title ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.usePage.setTitle(e.target.value) ?? null}/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='description'>{__('description')}</label>
                        <input className='form-control' type='text' id='description' name='description' 
                        placeholder={__('description')} value={props.usePage.description ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.usePage.setDescription(e.target.value) ?? null}/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='keywords'>{__('keywords')}</label>
                        <input className='form-control' type='text' id='keywords' name='keywords' 
                        placeholder={__('keywords')} value={props.usePage.keywords ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.usePage.setKeywords(e.target.value) ?? null}/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='display_img_url'>{__('display_img_url')}</label>
                        <input className='form-control' type='text' id='display_img_url' name='display_img_url' 
                        placeholder={__('display_img_url')} value={props.usePage.display_img_url ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.usePage.setDisplay_img_url(e.target.value) ?? null}/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='section_list'>{__('section_list')}</label>
                        <input className='form-control' type='text' id='section_list' name='section_list' 
                        placeholder={__('section_list')} value={props.usePage.section_list ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.usePage.setSection_list(e.target.value) ?? null}/>
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