//'use client'
import { Utils } from '../../utils';
import { Components } from  "..";

export function PageForm(props) {
    const {__} = Utils.String;

    const getSectionItemCopy = () => {
        return props.usePage.section_list.map(sectionItem => {
            return {
                ...sectionItem,
                item_list: sectionItem.item_list ?? null
            }
        });
    }

    const handleSectionItemChange = (index, name, value) => {
        const sectionItemsCapy = getSectionItemCopy();
        sectionItemsCapy[index][name] = value;

        props.usePage.setSection_list([...sectionItemsCapy]);
    }

    const handleSectionListItemChange = (parentIndex, sectionItemKey, index, name, value) => {
        const sectionItemsCapy = getSectionItemCopy();
        sectionItemsCapy[parentIndex][sectionItemKey][index][name] = value;

        props.usePage.setSection_list([...sectionItemsCapy]);
    }

    const renderSectionListItemChange = (sectionListItem, sectionItemKey, index, jndex) => {
        return Object.keys(sectionListItem).map((sectionListItemKey, kndex) => {
            if (sectionListItem[sectionListItemKey] === null) return;

            let inputType = null;
            const propItemObject = {
                type: 'text',
                id: sectionListItemKey,
                name: sectionListItemKey,
                value: sectionListItem[sectionListItemKey] ?? '',
                disabled: props.disabled,
                onChange: e => handleSectionListItemChange(
                    index, sectionItemKey, jndex, sectionListItemKey, e.target.value)
            };

            if (sectionListItemKey === 'description') {
                inputType = (<textarea className='form-control' 
                {...propItemObject} rows={3}></textarea>);
            } else if (sectionListItemKey.endsWith('ImgUrl')) {
                inputType = (<Components.ImageFileInput 
                img_url={propItemObject.value} width={200}
                handleImageChange={e => handleSectionListItemChange(
                    index, sectionItemKey, jndex, sectionListItemKey, e)} />)
            } else {
                inputType = <input className='form-control' {...propItemObject} />
            }

            return (
                <div className='from-group' key={kndex}>
                    <label htmlFor={sectionListItemKey}>{__(sectionListItemKey)}</label>
                    {inputType}
                </div>
            )
        } )

    }

    const renderSectionItemInput = (sectionItem, index) => {
        return Object.keys(sectionItem).map((sectionItemKey, jndex) => {
            if (sectionItem[sectionItemKey] === null) return;
            if (sectionItemKey === "name") return;

            let inputType = null;
            const propItemObject = {
                type: 'text',
                id: sectionItemKey,
                name: sectionItemKey,
                value: sectionItem[sectionItemKey] ?? '',
                disabled: props.disabled,
                onChange: e => handleSectionItemChange(
                    index, sectionItemKey, e.target.value)
            };

            if (sectionItemKey === 'description') {
                inputType = <textarea className='form-control' 
                {...propItemObject} rows={6}></textarea>
            } else if (sectionItemKey.endsWith('ImgUrl')) {
                inputType =  inputType = <Components.ImageFileInput 
                img_url={propItemObject.value} width={200}
                handleImageChange={e => handleSectionItemChange(
                    index, sectionItemKey, e)} />
            } else if (sectionItemKey.endsWith('item_list')) {
                inputType = sectionItem[sectionItemKey]?.map(((sectionListItem, kndex) => {
                    return (<div className='col-12 col-md-6 py-2 border border-2 mb-3' key={kndex}>
                        {renderSectionListItemChange(sectionListItem, sectionItemKey, index, kndex)}
                    </div>)
                }))
            } else {
                inputType = <input className='form-control' {...propItemObject} />;
            }

            return (
                <div className='from-group mb-2 row px-3' key={jndex}>
                    <label htmlFor={sectionItemKey}>{__(sectionItemKey)}</label>
                    {inputType}
                </div>
            )
        } )
    }

    return (
        <form onSubmit={props.handleFormSubmit ?? null} className="col-12">
            <div className='row'>
                <div className="col-12 col-lg-8">
                    {props.usePage.section_list.map((sectionItem, index) => {
                        return (
                            <div className="card mb-3" key={index}>
                                <div className='card-title p-3'>{sectionItem.name} section</div>
                                <div className='card-body p-2'>
                                    {renderSectionItemInput(sectionItem, index)}
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="col-12 col-lg-4">
                    <div className='w-100'>
                        <div className='form-group mb-2'>
                            <label htmlFor='title'>{__('title')}</label>
                            <input className='form-control' type='text' id='title' name='title' 
                            placeholder={__('title')} value={props.usePage.title ?? ''}
                            disabled={props.isDisabled} onChange={ e => 
                                props.usePage.setTitle(e.target.value) ?? null}/>
                        </div>
                    </div>
                    <div className='w-100'>
                        <div className='form-group mb-2'>
                            <label htmlFor='description'>{__('description')}</label>
                            <textarea className='form-control' type='text' id='description' name='description' 
                            placeholder={__('description')} value={props.usePage.description ?? ''}
                            disabled={props.isDisabled} onChange={ e => 
                                props.usePage.setDescription(e.target.value) ?? null} rows={5}></textarea>
                        </div>
                    </div>
                    <div className='w-100'>
                        <div className='form-group mb-2'>
                            <label htmlFor='keywords'>{__('keywords')}</label>
                            <input className='form-control' type='text' id='keywords' name='keywords' 
                            placeholder={__('keywords')} value={props.usePage.keywords ?? ''}
                            disabled={props.isDisabled} onChange={ e => 
                                props.usePage.setKeywords(e.target.value) ?? null}/>
                        </div>
                    </div>
                    <div className='w-100'>
                        <div className='form-group mb-2'>
                            <label htmlFor='display_img_url'>{__('display_img_url')}</label>
                            <Components.ImageFileInput img_url={props.usePage.display_img_url ?? ''}
                            handleImageChange={props.usePage.setDisplay_img_url} 
                            width={500} height={200} />
                        </div>
                    </div>
                    <div className='col-12 text-right'>
                        <button disabled={props.isDisabled ?? false} type='submit' 
                        className='mt-3 btn btn-primary w-100'>
                            {props.isDisabled ? 'Chargement...' :  'Enregistrer'}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}