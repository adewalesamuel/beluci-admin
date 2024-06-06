//'use client'
import { Utils } from '../../utils';

export function SiteForm(props) {
    const {__} = Utils.String;

    return (
        <form onSubmit={props.handleFormSubmit ?? null}>
            <div className='row'>
                <div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='logo_url'>{__('logo_url')}</label>
                        <input className='form-control' type='text' id='logo_url' name='logo_url' 
                        placeholder={__('logo_url')} value={props.useSite.logo_url ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useSite.setLogo_url(e.target.value) ?? null}/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='favicon_url'>{__('favicon_url')}</label>
                        <input className='form-control' type='text' id='favicon_url' name='favicon_url' 
                        placeholder={__('favicon_url')} value={props.useSite.favicon_url ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useSite.setFavicon_url(e.target.value) ?? null}/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='name'>{__('name')}</label>
                        <input className='form-control' type='text' id='name' name='name' 
                        placeholder={__('name')} value={props.useSite.name ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useSite.setName(e.target.value) ?? null}/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='slogan'>{__('slogan')}</label>
                        <input className='form-control' type='text' id='slogan' name='slogan' 
                        placeholder={__('slogan')} value={props.useSite.slogan ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useSite.setSlogan(e.target.value) ?? null}/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='phone_number'>{__('phone_number')}</label>
                        <input className='form-control' type='text' id='phone_number' name='phone_number' 
                        placeholder={__('phone_number')} value={props.useSite.phone_number ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useSite.setPhone_number(e.target.value) ?? null}/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='primary_color'>{__('primary_color')}</label>
                        <input className='form-control' type='text' id='primary_color' name='primary_color' 
                        placeholder={__('primary_color')} value={props.useSite.primary_color ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useSite.setPrimary_color(e.target.value) ?? null}/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='secondary_color'>{__('secondary_color')}</label>
                        <input className='form-control' type='text' id='secondary_color' name='secondary_color' 
                        placeholder={__('secondary_color')} value={props.useSite.secondary_color ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useSite.setSecondary_color(e.target.value) ?? null}/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='copyright_text'>{__('copyright_text')}</label>
                        <input className='form-control' type='text' id='copyright_text' name='copyright_text' 
                        placeholder={__('copyright_text')} value={props.useSite.copyright_text ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useSite.setCopyright_text(e.target.value) ?? null}/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='footer_logo_url'>{__('footer_logo_url')}</label>
                        <input className='form-control' type='text' id='footer_logo_url' name='footer_logo_url' 
                        placeholder={__('footer_logo_url')} value={props.useSite.footer_logo_url ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useSite.setFooter_logo_url(e.target.value) ?? null}/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='is_up'>{__('is_up')}</label>
                        <input className='form-control' type='checkbox' id='is_up' name='is_up' 
                        placeholder={__('is_up')} value={props.useSite.is_up ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useSite.setIs_up(e.target.value) ?? null}/>
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