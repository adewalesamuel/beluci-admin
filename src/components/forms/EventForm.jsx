//'use client'
import { Utils } from '../../utils';

export function EventForm(props) {
    const {__} = Utils.String;

    return (
        <form onSubmit={props.handleFormSubmit ?? null}>
            <div className='row'>
                <div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='img_url'>{__('img_url')}</label>
                        <input className='form-control' type='text' id='img_url' name='img_url' 
                        placeholder={__('img_url')} value={props.useEvent.img_url ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useEvent.setImg_url(e.target.value) ?? null}/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='name'>{__('name')}</label>
                        <input className='form-control' type='text' id='name' name='name' 
                        placeholder={__('name')} value={props.useEvent.name ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useEvent.setName(e.target.value) ?? null}/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='date'>{__('date')}</label>
                        <input className='form-control' type='date' id='date' name='date' 
                        placeholder={__('date')} value={props.useEvent.date ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useEvent.setDate(e.target.value) ?? null}/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='time'>{__('time')}</label>
                        <input className='form-control' type='text' id='time' name='time' 
                        placeholder={__('time')} value={props.useEvent.time ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useEvent.setTime(e.target.value) ?? null}/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='address'>{__('address')}</label>
                        <input className='form-control' type='text' id='address' name='address' 
                        placeholder={__('address')} value={props.useEvent.address ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useEvent.setAddress(e.target.value) ?? null}/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='gps_location'>{__('gps_location')}</label>
                        <input className='form-control' type='text' id='gps_location' name='gps_location' 
                        placeholder={__('gps_location')} value={props.useEvent.gps_location ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useEvent.setGps_location(e.target.value) ?? null}/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='is_payed'>{__('is_payed')}</label>
                        <input className='form-control' type='checkbox' id='is_payed' name='is_payed' 
                        placeholder={__('is_payed')} value={props.useEvent.is_payed ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useEvent.setIs_payed(e.target.value) ?? null}/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='price'>{__('price')}</label>
                        <input className='form-control' type='number' id='price' name='price' 
                        placeholder={__('price')} value={props.useEvent.price ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useEvent.setPrice(e.target.value) ?? null}/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='features'>{__('features')}</label>
                        <input className='form-control' type='text' id='features' name='features' 
                        placeholder={__('features')} value={props.useEvent.features ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useEvent.setFeatures(e.target.value) ?? null}/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='description'>{__('description')}</label>
                        <input className='form-control' type='text' id='description' name='description' 
                        placeholder={__('description')} value={props.useEvent.description ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useEvent.setDescription(e.target.value) ?? null}/>
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