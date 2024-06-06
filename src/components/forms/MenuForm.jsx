//'use client'
import { Utils } from '../../utils';

export function MenuForm(props) {
    const {__} = Utils.String;

    return (
        <form onSubmit={props.handleFormSubmit ?? null}>
            <div className='row'>
                <div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='name'>{__('name')}</label>
                        <input className='form-control' type='text' id='name' name='name' 
                        placeholder={__('name')} value={props.useMenu.name ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useMenu.setName(e.target.value) ?? null}/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='description'>{__('description')}</label>
                        <input className='form-control' type='text' id='description' name='description' 
                        placeholder={__('description')} value={props.useMenu.description ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useMenu.setDescription(e.target.value) ?? null}/>
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