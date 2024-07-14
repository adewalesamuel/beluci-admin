//'use client'
import { Utils } from '../../utils';
import { Components } from  "..";

export function EventForm(props) {
    const {__} = Utils.String;

    return (
        <form onSubmit={props.handleFormSubmit ?? null} className="col-12">
            <div className='row'>
                <div className='col-12'>
                    <div className='form-group mb-2'>
                        <label htmlFor='img_url'>{__('img_url')}</label>
                        <Components.ImageFileInput img_url={props.useEvent.img_url ?? ''}
                        handleImageChange={props.useEvent.setImg_url}/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group mb-2'>
                        <label htmlFor='name'>{__('name')}</label>
                        <input className='form-control' type='text' id='name' name='name' 
                        placeholder={__('name')} value={props.useEvent.name ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useEvent.setName(e.target.value) ?? null}/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group mb-2'>
                        <label htmlFor='date'>{__('date')}</label>
                        <input className='form-control' type='date' id='date' name='date' 
                        placeholder={__('date')} value={props.useEvent.date ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useEvent.setDate(e.target.value) ?? null}/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group mb-2'>
                        <label htmlFor='time'>{__('time')}</label>
                        <input className='form-control' type='text' id='time' name='time' 
                        placeholder={__('time')} value={props.useEvent.time ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useEvent.setTime(e.target.value) ?? null}/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group mb-2'>
                        <label htmlFor='address'>{__('address')}</label>
                        <input className='form-control' type='text' id='address' name='address' 
                        placeholder={__('address')} value={props.useEvent.address ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useEvent.setAddress(e.target.value) ?? null}/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group mb-2'>
                        <label htmlFor='gps_location'>{__('gps_location')}</label>
                        <input className='form-control' type='text' id='gps_location' name='gps_location' 
                        placeholder={__('gps_location')} value={props.useEvent.gps_location ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useEvent.setGps_location(e.target.value) ?? null}/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-check form-switch mb-2'>
                        <label className="form-check-label" htmlFor='is_payed'>{__('is_payed')}</label>
                        <input className='form-check-input' type='checkbox' id='is_payed' name='is_payed' 
                        placeholder={__('is_payed')} checked={Boolean(props.useEvent.is_payed)}
                        disabled={props.isDisabled} onChange={ () => 
                            props.useEvent.setIs_payed(Boolean(!props.useEvent.is_payed))}/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group mb-2'>
                        <label htmlFor='price'>{__('price')}</label>
                        <input className='form-control' type='number' id='price' name='price' 
                        placeholder={__('price')} value={props.useEvent.price ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useEvent.setPrice(e.target.value) ?? null}/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group mb-2'>
                        <label htmlFor='features'>{__('features')}</label>
                        <input className='form-control' type='text' id='features' name='features' 
                        placeholder={__('features')} value={props.useEvent.features ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useEvent.setFeatures(e.target.value) ?? null}/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group mb-2'>
                        <label htmlFor='description'>{__('description')}</label>
                        <textarea className='form-control' type='text' id='description' name='description' 
                        placeholder={__('description')} value={props.useEvent.description ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useEvent.setDescription(e.target.value) ?? null} rows={5}></textarea>
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