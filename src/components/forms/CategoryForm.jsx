//'use client'
import { Utils } from '../../utils';

export function CategoryForm(props) {
    const {__} = Utils.String;

    return (
        <form onSubmit={props.handleFormSubmit ?? null}>
            <div className='row'>
                <div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='display_url'>{__('display_url')}</label>
                        <input className='form-control' type='text' id='display_url' name='display_url' 
                        placeholder={__('display_url')} value={props.useCategory.display_url ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useCategory.setDisplay_url(e.target.value) ?? null}/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='name'>{__('name')}</label>
                        <input className='form-control' type='text' id='name' name='name' 
                        placeholder={__('name')} value={props.useCategory.name ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useCategory.setName(e.target.value) ?? null}/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='slug'>{__('slug')}</label>
                        <input className='form-control' type='text' id='slug' name='slug' 
                        placeholder={__('slug')} value={props.useCategory.slug ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useCategory.setSlug(e.target.value) ?? null}/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='category_id'>{__('category_id')}</label>
                        <select className='select2 form-control' id='category_id' name='category_id' 
                        value={props.useCategory.category_id ?? ''} disabled={props.isDisabled} 
                        onChange={ e => props.useCategory.setCategory_id(e.target.value) ?? null}>
                            <option hidden>Choisissez une option</option>
                            {
                                props.categorys.map((category, index) => {
                                    return (<option key={index} value={category.id ?? ''}>
                                                {category.name}
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