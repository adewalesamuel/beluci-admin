//'use client'
import { Utils } from '../../utils';

export function AdminForm(props) {
    const {__} = Utils.String;

    return (
        <form onSubmit={props.handleFormSubmit ?? null} className="col-12 col-md-8 col-lg-6">
            <div className='row'>
                <div className='col-12'>
                    <div className='form-group mb-2'>
                        <label htmlFor='name'>{__('name')}</label>
                        <input className='form-control' type='text' id='name' name='name' 
                        placeholder={__('name')} value={props.useAdmin.name ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useAdmin.setName(e.target.value) ?? null}/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group mb-2'>
                        <label htmlFor='email'>{__('email')}</label>
                        <input className='form-control' type='text' id='email' name='email' 
                        placeholder={__('email')} value={props.useAdmin.email ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useAdmin.setEmail(e.target.value) ?? null}/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group mb-2'>
                        <label htmlFor='password'>{__('password')}</label>
                        <input className='form-control' type='text' id='password' name='password' 
                        placeholder={__('password')} value={props.useAdmin.password ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useAdmin.setPassword(e.target.value) ?? null}/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group mb-2'>
                        <label htmlFor='role_id'>{__('role_id')}</label>
                        <select className='select2 form-control' id='role_id' name='role_id' 
                        value={props.useAdmin.role_id ?? ''} disabled={props.isDisabled} 
                        onChange={ e => props.useAdmin.setRole_id(e.target.value) ?? null}>
                            <option hidden>Choisissez une option</option>
                            {
                                props.roles.map((role, index) => {
                                    return (<option key={index} value={role.id ?? ''}>
                                                {role.name}
                                            </option>)
                                })
                            }
                        </select>
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