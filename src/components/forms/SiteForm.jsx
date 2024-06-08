//'use client'
import { Utils } from '../../utils';
import { Components } from  "..";

export function SiteForm(props) {
    const {__} = Utils.String;

    return (
        <form onSubmit={props.handleFormSubmit ?? null} className="col-12 col-md-8 col-lg-6">
            <div className='row'>
                <div className='col-12'>
                    <div className='form-group mb-2'>
                        <label htmlFor='logo_url'>{__('logo_url')}</label>
                        <Components.ImageFileInput img_url={props.useSite.logo_url ?? ''}
                        handleImageChange={props.useSite.setLogo_url}/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group mb-2'>
                        <label htmlFor='favicon_url'>{__('favicon_url')}</label>
                        <Components.ImageFileInput img_url={props.useSite.favicon_url ?? ''}
                        handleImageChange={props.useSite.setFavicon_url}/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group mb-2'>
                        <label htmlFor='name'>{__('name')}</label>
                        <input className='form-control' type='text' id='name' name='name' 
                        placeholder={__('name')} value={props.useSite.name ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useSite.setName(e.target.value) ?? null}/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group mb-2'>
                        <label htmlFor='slogan'>{__('slogan')}</label>
                        <input className='form-control' type='text' id='slogan' name='slogan' 
                        placeholder={__('slogan')} value={props.useSite.slogan ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useSite.setSlogan(e.target.value) ?? null}/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group mb-2'>
                        <label htmlFor='phone_number'>{__('phone_number')}</label>
                        <input className='form-control' type='text' id='phone_number' name='phone_number' 
                        placeholder={__('phone_number')} value={props.useSite.phone_number ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useSite.setPhone_number(e.target.value) ?? null}/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group mb-2'>
                        <label htmlFor='primary_color'>{__('primary_color')}</label>
                        <input className='form-control' type='text' id='primary_color' name='primary_color' 
                        placeholder={__('primary_color')} value={props.useSite.primary_color ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useSite.setPrimary_color(e.target.value) ?? null}/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group mb-2'>
                        <label htmlFor='secondary_color'>{__('secondary_color')}</label>
                        <input className='form-control' type='text' id='secondary_color' name='secondary_color' 
                        placeholder={__('secondary_color')} value={props.useSite.secondary_color ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useSite.setSecondary_color(e.target.value) ?? null}/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group mb-2'>
                        <label htmlFor='copyright_text'>{__('copyright_text')}</label>
                        <input className='form-control' type='text' id='copyright_text' name='copyright_text' 
                        placeholder={__('copyright_text')} value={props.useSite.copyright_text ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useSite.setCopyright_text(e.target.value) ?? null}/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group mb-2'>
                        <label htmlFor='footer_logo_url'>{__('footer_logo_url')}</label>
                        <Components.ImageFileInput img_url={props.useSite.footer_logo_url ?? ''}
                        handleImageChange={props.useSite.setFooter_logo_url}/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group mb-2'>
                        <label htmlFor='is_up'>{__('is_up')}</label>
                        <input className='form-control' type='checkbox' id='is_up' name='is_up' 
                        placeholder={__('is_up')} value={props.useSite.is_up ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useSite.setIs_up(e.target.value) ?? null}/>
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