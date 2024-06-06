//'use client'
import { Utils } from '../../utils';

export function PostForm(props) {
    const {__} = Utils.String;

    return (
        <form onSubmit={props.handleFormSubmit ?? null}>
            <div className='row'>
                <div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='display_url'>{__('display_url')}</label>
                        <input className='form-control' type='text' id='display_url' name='display_url' 
                        placeholder={__('display_url')} value={props.usePost.display_url ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.usePost.setDisplay_url(e.target.value) ?? null}/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='title'>{__('title')}</label>
                        <input className='form-control' type='text' id='title' name='title' 
                        placeholder={__('title')} value={props.usePost.title ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.usePost.setTitle(e.target.value) ?? null}/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='slug'>{__('slug')}</label>
                        <input className='form-control' type='text' id='slug' name='slug' 
                        placeholder={__('slug')} value={props.usePost.slug ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.usePost.setSlug(e.target.value) ?? null}/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='content'>{__('content')}</label>
                        <input className='form-control' type='text' id='content' name='content' 
                        placeholder={__('content')} value={props.usePost.content ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.usePost.setContent(e.target.value) ?? null}/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='excerpt'>{__('excerpt')}</label>
                        <input className='form-control' type='text' id='excerpt' name='excerpt' 
                        placeholder={__('excerpt')} value={props.usePost.excerpt ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.usePost.setExcerpt(e.target.value) ?? null}/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='author'>{__('author')}</label>
                        <input className='form-control' type='text' id='author' name='author' 
                        placeholder={__('author')} value={props.usePost.author ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.usePost.setAuthor(e.target.value) ?? null}/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='category_id'>{__('category_id')}</label>
                        <select className='select2 form-control' id='category_id' name='category_id' 
                        value={props.usePost.category_id ?? ''} disabled={props.isDisabled} 
                        onChange={ e => props.usePost.setCategory_id(e.target.value) ?? null}>
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