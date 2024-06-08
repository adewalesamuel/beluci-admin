//'use client'
import { Utils } from '../../utils';
import { Components } from  "..";

export function MenuItemForm(props) {
    const {__} = Utils.String;

    return (
        <form onSubmit={props.handleFormSubmit ?? null} className="col-12 col-md-8 col-lg-6">
            <div className='row'>
                <div className='col-12'>
                    <div className='form-group mb-2'>
                        <label htmlFor='name'>{__('name')}</label>
                        <input className='form-control' type='text' id='name' name='name' 
                        placeholder={__('name')} value={props.useMenuItem.name ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useMenuItem.setName(e.target.value) ?? null}/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group mb-2'>
                        <label htmlFor='icon_url'>{__('icon_url')}</label>
                        <Components.ImageFileInput img_url={props.useMenuItem.icon_url ?? ''}
                        handleImageChange={props.useMenuItem.setIcon_url}/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group mb-2'>
                        <label htmlFor='type'>{__('type')}</label>
                        <select className='form-select' id='type' name='type' 
                        value={props.useMenuItem.type ?? ''} disabled={props.isDisabled} 
                        onChange={ e => props.useMenuItem.setType(e.target.value) ?? null}>
                            <option hidden>Choisissez une option</option>
                            <option value='link'>Lien</option>
                            <option value='button'>Button</option>
                        </select>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-check form-switch mb-2'>
                        <label className="form-check-label" htmlFor='is_accent'>{__('is_accent')}</label>
                        <input className='form-check-input' type='checkbox' id='is_accent' name='is_accent' 
                        placeholder={__('is_accent')} checked={Boolean(props.useMenuItem.is_accent)}
                        disabled={props.isDisabled} onChange={ () => 
                            props.useMenuItem.setIs_accent(Boolean(!props.useMenuItem.is_accent))}/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group mb-2'>
                        <label htmlFor='menu_item_id'>{__('menu_item_id')}</label>
                        <select className='form-select' id='menu_item_id' name='menu_item_id' 
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
                    <div className='form-group mb-2'>
                        <label htmlFor='menu_id'>{__('menu_id')}</label>
                        <select className='form-select' id='menu_id' name='menu_id' 
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
                    className='mt-3 btn btn-primary'>
                        {props.isDisabled ? 'Chargement...' :  'Enregistrer'}
                    </button>
                </div>
            </div>
        </form>
    )
}