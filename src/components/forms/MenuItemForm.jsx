//'use client'
import { Utils } from '../../utils';

export function MenuItemForm(props) {
    const {__} = Utils.String;

    return (
        <form onSubmit={props.handleFormSubmit ?? null}>
            <div className='row'>
                <div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='name'>{__('name')}</label>
                        <input className='form-control' type='text' id='name' name='name' 
                        placeholder={__('name')} value={props.useMenuItem.name ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useMenuItem.setName(e.target.value) ?? null}/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='slug'>{__('slug')}</label>
                        <input className='form-control' type='text' id='slug' name='slug' 
                        placeholder={__('slug')} value={props.useMenuItem.slug ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useMenuItem.setSlug(e.target.value) ?? null}/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='icon_url'>{__('icon_url')}</label>
                        <input className='form-control' type='text' id='icon_url' name='icon_url' 
                        placeholder={__('icon_url')} value={props.useMenuItem.icon_url ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useMenuItem.setIcon_url(e.target.value) ?? null}/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='type'>{__('type')}</label>
                        <select className='select2 form-control' id='type' name='type' 
                        value={props.useMenuItem.type ?? ''} disabled={props.isDisabled} 
                        onChange={ e => props.useMenuItem.setType(e.target.value) ?? null}>
                            <option hidden>Choisissez une option</option>
                            <option value='pending'>En cours</option>
                            <option value='validated'>Validé</option>
                            <option value='canceled'>Annulé</option>
                        </select>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='is_accent'>{__('is_accent')}</label>
                        <input className='form-control' type='checkbox' id='is_accent' name='is_accent' 
                        placeholder={__('is_accent')} value={props.useMenuItem.is_accent ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useMenuItem.setIs_accent(e.target.value) ?? null}/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='menu_item_id'>{__('menu_item_id')}</label>
                        <select className='select2 form-control' id='menu_item_id' name='menu_item_id' 
                        value={props.useMenuItem.menu_item_id ?? ''} disabled={props.isDisabled} 
                        onChange={ e => props.useMenuItem.setMenu_item_id(e.target.value) ?? null}>
                            <option hidden>Choisissez une option</option>
                            {
                                props.menu_items.map((menu_item, index) => {
                                    return (<option key={index} value={menu_item.id ?? ''}>
                                                {menu_item.name}
                                            </option>)
                                })
                            }
                        </select>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='menu_id'>{__('menu_id')}</label>
                        <select className='select2 form-control' id='menu_id' name='menu_id' 
                        value={props.useMenuItem.menu_id ?? ''} disabled={props.isDisabled} 
                        onChange={ e => props.useMenuItem.setMenu_id(e.target.value) ?? null}>
                            <option hidden>Choisissez une option</option>
                            {
                                props.menus.map((menu, index) => {
                                    return (<option key={index} value={menu.id ?? ''}>
                                                {menu.name}
                                            </option>)
                                })
                            }
                        </select>
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