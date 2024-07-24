//'use client'
import { Utils } from '../../utils';

export function MessageForm(props) {
    const {__} = Utils.String;

    return (
        <form onSubmit={props.handleFormSubmit ?? null} className="col-12 col-md-8 col-lg-6">
            <div className='row'>
                <div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='content'>{__('content')}</label>
                        <input className='form-control' type='text' id='content' name='content' 
                        placeholder={__('content')} value={props.useMessage.content ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useMessage.setContent(e.target.value) ?? null}/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='member_id'>{__('member_id')}</label>
                        <select className='select2 form-control' id='member_id' name='member_id' 
                        value={props.useMessage.member_id ?? ''} disabled={props.isDisabled} 
                        onChange={ e => props.useMessage.setMember_id(e.target.value) ?? null}>
                            <option hidden>Choisissez une option</option>
                            {
                                props.members.map((member, index) => {
                                    return (<option key={index} value={member.id ?? ''}>
                                                {member.name}
                                            </option>)
                                })
                            }
                        </select>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='forum_id'>{__('forum_id')}</label>
                        <select className='select2 form-control' id='forum_id' name='forum_id' 
                        value={props.useMessage.forum_id ?? ''} disabled={props.isDisabled} 
                        onChange={ e => props.useMessage.setForum_id(e.target.value) ?? null}>
                            <option hidden>Choisissez une option</option>
                            {
                                props.forums.map((forum, index) => {
                                    return (<option key={index} value={forum.id ?? ''}>
                                                {forum.name}
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