//'use client'
import { Components } from '..';
import { Utils } from '../../utils';

export function ForumCategoryForm(props) {
    const {__} = Utils.String;

    return (
        <form onSubmit={props.handleFormSubmit ?? null} className="col-12 col-md-8 col-lg-6">
            <div className='row'>
                <div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='display_img_url'>{__('display_img_url')}</label>
                        <Components.ImageFileInput img_url={props.useForumCategory.display_img_url ?? ''}
                        handleImageChange={props.useForumCategory.setDisplay_img_url}/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='name'>{__('name')}</label>
                        <input className='form-control' type='text' id='name' name='name' 
                        placeholder={__('name')} value={props.useForumCategory.name ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useForumCategory.setName(e.target.value) ?? null}/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='slug'>{__('slug')}</label>
                        <input className='form-control' type='text' id='slug' name='slug' 
                        placeholder={__('slug')} value={props.useForumCategory.slug ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useForumCategory.setSlug(e.target.value) ?? null}/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='description'>{__('description')}</label>
                        <textarea className='form-control' type='text' id='description' name='description' 
                        placeholder={__('description')} value={props.useForumCategory.description ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useForumCategory.setDescription(e.target.value) ?? null} rows={5}></textarea>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='forum_category_id'>{__('forum_category_id')}</label>
                        <select className='select2 form-control' id='forum_category_id' name='forum_category_id' 
                        value={props.useForumCategory.forum_category_id ?? ''} disabled={props.isDisabled} 
                        onChange={ e => props.useForumCategory.setForum_category_id(e.target.value) ?? null}>
                            <option hidden>Choisissez une option</option>
                            {
                                props.forum_categorys.map((forum_category, index) => {
                                    return (<option key={index} value={forum_category.id ?? ''}>
                                                {forum_category.name}
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