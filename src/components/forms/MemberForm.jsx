//'use client'
import { Utils } from '../../utils';
import { Components } from  "..";

export function MemberForm(props) {
    const {__} = Utils.String;

    return (
        <form onSubmit={props.handleFormSubmit ?? null} className="col-12">
            <div className='row'>
                <div className='col-12 col-lg-6'>
                    <div className='col-12'>
                        <div className='form-group mb-2'>
                            <label htmlFor='logo_url'>{__('logo_url')}</label>
                            <Components.ImageFileInput img_url={props.useMember.logo_url ?? ''}
                            handleImageChange={props.useMember.setLogo_url}/>
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className='form-group mb-2'>
                            <label htmlFor='company_name'>{__('company_name')}</label>
                            <input className='form-control' type='text' id='company_name' name='company_name' 
                            placeholder={__('company_name')} value={props.useMember.company_name ?? ''}
                            disabled={props.isDisabled} onChange={ e => 
                                props.useMember.setCompany_name(e.target.value) ?? null}/>
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className='form-group mb-2'>
                            <label htmlFor='country_name'>{__('country_name')}</label>
                            <input className='form-control' type='text' id='country_name' name='country_name' 
                            placeholder={__('country_name')} value={props.useMember.country_name ?? ''}
                            disabled={props.isDisabled} onChange={ e => 
                                props.useMember.setCountry_name(e.target.value) ?? null}/>
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className='form-group mb-2'>
                            <label htmlFor='head_office'>{__('head_office')}</label>
                            <input className='form-control' type='text' id='head_office' name='head_office' 
                            placeholder={__('head_office')} value={props.useMember.head_office ?? ''}
                            disabled={props.isDisabled} onChange={ e => 
                                props.useMember.setHead_office(e.target.value) ?? null}/>
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className='form-group mb-2'>
                            <label htmlFor='address'>{__('address')}</label>
                            <input className='form-control' type='text' id='address' name='address' 
                            placeholder={__('address')} value={props.useMember.address ?? ''}
                            disabled={props.isDisabled} onChange={ e => 
                                props.useMember.setAddress(e.target.value) ?? null}/>
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className='form-group mb-2'>
                            <label htmlFor='website_url'>{__('website_url')}</label>
                            <input className="form-control" type='text' id="website_url" name="website_url" 
                            value={props.useMember.website_url ?? ''} placeholder={__('website_url')}
                            onChange={e => props.useMember.setWebsite_url(e.target.value)} 
                            disabled={props.isDisabled}/>
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className='form-group mb-2'>
                            <label htmlFor='fullname'>{__('fullname')}</label>
                            <input className='form-control' type='text' id='fullname' name='fullname' 
                            placeholder={__('fullname')} value={props.useMember.fullname ?? ''}
                            disabled={props.isDisabled} onChange={ e => 
                                props.useMember.setFullname(e.target.value) ?? null}/>
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className='form-group mb-2'>
                            <label htmlFor='creation_date'>{__('creation_date')}</label>
                            <input className='form-control' type='date' id='creation_date' name='creation_date' 
                            placeholder={__('creation_date')} value={props.useMember.creation_date ?? ''}
                            disabled={props.isDisabled} onChange={ e => 
                                props.useMember.setCreation_date(e.target.value) ?? null}/>
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className='form-group mb-2'>
                            <label htmlFor='employee_number'>{__('employee_number')}</label>
                            <input className='form-control' type='number' id='employee_number' name='employee_number' 
                            placeholder={__('employee_number')} value={props.useMember.employee_number ?? ''}
                            disabled={props.isDisabled} onChange={ e => 
                                props.useMember.setEmployee_number(e.target.value) ?? null}/>
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className='form-group mb-2'>
                            <label htmlFor='legal_status'>{__('legal_status')}</label>
                            <input className='form-control' type='text' id='legal_status' name='legal_status' 
                            placeholder={__('legal_status')} value={props.useMember.legal_status ?? ''}
                            disabled={props.isDisabled} onChange={ e => 
                                props.useMember.setLegal_status(e.target.value) ?? null}/>
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className='form-group mb-2'>
                            <label htmlFor='share_capital'>{__('share_capital')}</label>
                            <input className='form-control' type='number' id='share_capital' name='share_capital' 
                            placeholder={__('share_capital')} value={props.useMember.share_capital ?? ''}
                            disabled={props.isDisabled} onChange={ e => 
                                props.useMember.setShare_capital(e.target.value) ?? null}/>
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className='form-group mb-2'>
                            <label htmlFor='sector'>{__('sector')}</label>
                            <input className='form-control' type='text' id='sector' name='sector' 
                            placeholder={__('sector')} value={props.useMember.sector ?? ''}
                            disabled={props.isDisabled} onChange={ e => 
                                props.useMember.setSector(e.target.value) ?? null}/>
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className='form-group mb-2'>
                            <label htmlFor='parent_compnay'>{__('parent_compnay')}</label>
                            <input className='form-control' type='text' id='parent_compnay' name='parent_compnay' 
                            placeholder={__('parent_compnay')} value={props.useMember.parent_compnay ?? ''}
                            disabled={props.isDisabled} onChange={ e => 
                                props.useMember.setParent_company(e.target.value) ?? null}/>
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className='form-group mb-2'>
                            <label htmlFor='other_details'>{__('other_details')}</label>
                            <textarea className='form-control' type='text' id='other_details' name='other_details' 
                            placeholder={__('other_details')} value={props.useMember.other_details ?? ''}
                            disabled={props.isDisabled} onChange={ e => 
                                props.useMember.setOther_details(e.target.value) ?? null} rows={3}></textarea>
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className='form-group mb-2'>
                            <label htmlFor='company_category'>{__('company_category')}</label>
                            <select className='form-select' id='company_category' name='company_category' 
                            value={props.useMember.company_category ?? ''} disabled={props.isDisabled} 
                            onChange={ e => props.useMember.setCompany_category(e.target.value) ?? null}>
                                <option hidden>Choisissez une option</option>
                                <option value='Société non-résidente en CI'>
                                    Société non-résidente en CI
                                </option>
                                <option value='Société de moins de 1 Md CFA de CA'>
                                    Société de moins de 1 Md CFA de CA
                                </option>
                                <option value='Société de plus de 1 Md CFA de CA'>
                                    Société de plus de 1 Md CFA de CA
                                </option>
                            </select>
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className='form-group mb-2'>
                            <label htmlFor='representative_fullname'>{__('representative_fullname')}</label>
                            <input className='form-control' type='text' id='representative_fullname' name='representative_fullname' 
                            placeholder={__('representative_fullname')} value={props.useMember.representative_fullname ?? ''}
                            disabled={props.isDisabled} onChange={ e => 
                                props.useMember.setRepresentative_fullname(e.target.value) ?? null}/>
                        </div>
                    </div>
                </div>
                <div className='col-12 col-lg-6'>
                    <div className='col-12'>
                        <div className='form-group mb-2'>
                            <label htmlFor='position'>{__('position')}</label>
                            <input className='form-control' type='text' id='position' name='position' 
                            placeholder={__('position')} value={props.useMember.position ?? ''}
                            disabled={props.isDisabled} onChange={ e => 
                                props.useMember.setPosition(e.target.value) ?? null}/>
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className='form-group mb-2'>
                            <label htmlFor='nationality'>{__('nationality')}</label>
                            <input className='form-control' type='text' id='nationality' name='nationality' 
                            placeholder={__('nationality')} value={props.useMember.nationality ?? ''}
                            disabled={props.isDisabled} onChange={ e => 
                                props.useMember.setNationality(e.target.value) ?? null}/>
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className='form-group mb-2'>
                            <label htmlFor='email'>{__('email')}</label>
                            <input className='form-control' type='text' id='email' name='email' 
                            placeholder={__('email')} value={props.useMember.email ?? ''}
                            disabled={props.isDisabled} onChange={ e => 
                                props.useMember.setEmail(e.target.value) ?? null}/>
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className='form-group mb-2'>
                            <label htmlFor='phone_number'>{__('phone_number')}</label>
                            <input className='form-control' type='text' id='phone_number' name='phone_number' 
                            placeholder={__('phone_number')} value={props.useMember.phone_number ?? ''}
                            disabled={props.isDisabled} onChange={ e => 
                                props.useMember.setPhone_number(e.target.value) ?? null}/>
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className='form-group mb-2'>
                            <label htmlFor='sales_representative_fullname'>{__('sales_representative_fullname')}</label>
                            <input className='form-control' type='text' id='sales_representative_fullname' name='sales_representative_fullname' 
                            placeholder={__('sales_representative_fullname')} value={props.useMember.sales_representative_fullname ?? ''}
                            disabled={props.isDisabled} onChange={ e => 
                                props.useMember.setSales_representative_fullname(e.target.value) ?? null}/>
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className='form-group mb-2'>
                            <label htmlFor='sales_representative_position'>{__('sales_representative_position')}</label>
                            <input className='form-control' type='text' id='sales_representative_position' name='sales_representative_position' 
                            placeholder={__('sales_representative_position')} value={props.useMember.sales_representative_position ?? ''}
                            disabled={props.isDisabled} onChange={ e => 
                                props.useMember.setSales_representative_position(e.target.value) ?? null}/>
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className='form-group mb-2'>
                            <label htmlFor='sales_representative_email'>{__('sales_representative_email')}</label>
                            <input className='form-control' type='text' id='sales_representative_email' name='sales_representative_email' 
                            placeholder={__('sales_representative_email')} value={props.useMember.sales_representative_email ?? ''}
                            disabled={props.isDisabled} onChange={ e => 
                                props.useMember.setSales_representative_email(e.target.value) ?? null}/>
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className='form-group mb-2'>
                            <label htmlFor='sales_representative_phone_number'>{__('sales_representative_phone_number')}</label>
                            <input className='form-control' type='text' id='sales_representative_phone_number' name='sales_representative_phone_number' 
                            placeholder={__('sales_representative_phone_number')} value={props.useMember.sales_representative_phone_number ?? ''}
                            disabled={props.isDisabled} onChange={ e => 
                                props.useMember.setSales_representative_phone_number(e.target.value) ?? null}/>
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className='form-group'>
                            <label htmlFor='sales_representative_nationality'>{__('sales_representative_nationality')}</label>
                            <input className='form-control' type='text' id='sales_representative_nationality' 
                            name='sales_representative_nationality' placeholder={__('sales_representative_nationality')} 
                            value={props.useMember.sales_representative_nationality ?? ''}
                            disabled={props.isDisabled} onChange={ e => 
                                props.useMember.setSales_representative_nationality(e.target.value) ?? null}/>
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className='form-group'>
                            <label htmlFor='member_source'>{__('member_source')}</label>
                            <input className='form-control' type='text' id='member_source' 
                            name='member_source' placeholder={__('member_source')} 
                            value={props.useMember.member_source ?? ''}
                            disabled={props.isDisabled} onChange={ e => 
                                props.useMember.setMember_source(e.target.value) ?? null}/>
                        </div>
                    </div>
                    <div className='col-12 col-md-6'>
                    </div>
                    <div className='col-12'>
                        <div className='form-group mb-2'>
                            <label htmlFor='cover_letter_url'>{__('cover_letter_url')}</label>
                            {props.useMember.cover_letter_url && 
                                <a href={props.useMember.cover_letter_url} 
                                className='text-primary fw-bold ms-2' download>
                                    Télécharger
                                </a>
                            }
                            <Components.FileInput file_url={props.useMember.cover_letter_url ?? ''}
                            handleFileChange={props.useMember.setCover_letter_url}/>
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className='form-group mb-2'>
                            <label htmlFor='photo_url'>{__('photo_url')}</label>
                            {props.useMember.photo_url && 
                                <a href={props.useMember.photo_url} 
                                className='text-primary fw-bold ms-2' download>
                                    Télécharger
                                </a>
                            }
                            <Components.ImageFileInput img_url={props.useMember.photo_url ?? ''}
                            handleImageChange={props.useMember.setPhoto_url}/>
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className='form-group mb-2'>
                            <label htmlFor='commercial_register_url'>{__('commercial_register_url')}</label>
                            {props.useMember.commercial_register_url && 
                                <a href={props.useMember.commercial_register_url} 
                                className='text-primary fw-bold ms-2' download>
                                    Télécharger
                                </a>
                            }
                            <Components.FileInput file_url={props.useMember.commercial_register_url ?? ''}
                            handleFileChange={props.useMember.setCommercial_register_url}/>
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className='form-group mb-2'>
                            <label htmlFor='idcard_url'>{__('idcard_url')}</label>
                            {props.useMember.idcard_url && 
                                <a href={props.useMember.idcard_url} 
                                className='text-primary fw-bold ms-2' download>
                                    Télécharger
                                </a>
                            }
                            <Components.ImageFileInput img_url={props.useMember.idcard_url ?? ''}
                            handleImageChange={props.useMember.setIdcard_url}/>
                        </div>
                    </div>
                    <div className='col-12'>
                    <div className='form-check form-switch mb-2'>
                            <label className="form-check-label" htmlFor='is_validated'>{__('is_validated')}</label>
                            <input className='form-check-input' type='checkbox' id='is_validated' name='is_validated' 
                            placeholder={__('is_validated')} checked={Boolean(props.useMember.is_validated)}
                            disabled={props.isDisabled} onChange={ () => 
                                props.useMember.setIs_validated(Boolean(!props.useMember.is_validated))}/>
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className='form-group mb-2'>
                            <label htmlFor='password'>{__('password')}</label>
                            <input className='form-control' type='text' id='password' name='password' 
                            placeholder={__('password')} value={props.useMember.password ?? ''}
                            disabled={props.isDisabled} onChange={ e => 
                                props.useMember.setPassword(e.target.value) ?? null}/>
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className='form-group mb-2'>
                            <label htmlFor='member_id'>{__('member_id')}</label>
                            <select className='form-select' id='member_id' name='member_id' 
                            value={props.useMember.member_id ?? ''} disabled={props.isDisabled} 
                            onChange={ e => props.useMember.setMember_id(e.target.value) ?? null}>
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
                </div>
				
                <div className='col-12 text-rigth'>
                    <button disabled={props.isDisabled ?? false} type='submit' 
                    className='mt-3 btn btn-primary'>
                        {props.isDisabled ? 'Chargement...' :  'Enregistrer'}
                    </button>
                </div>
            </div>
        </form>
    )
}