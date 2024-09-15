import { useState } from 'react';
import { Services } from '../services';

export const useMember = () => {
    const [id, setId] = useState('');
	const [logo_url, setLogo_url] = useState('');
	const [company_name, setCompany_name] = useState('');
	const [country_name, setCountry_name] = useState('');
	const [head_office, setHead_office] = useState('');
	const [address, setAddress] = useState('');
	const [website_url, setWebsite_url] = useState('');
	const [fullname, setFullname] = useState('');
	const [creation_date, setCreation_date] = useState('');
	const [employee_number, setEmployee_number] = useState('');
	const [legal_status, setLegal_status] = useState('');
	const [share_capital, setShare_capital] = useState('');
	const [sector, setSector] = useState('');
	const [other_details, setOther_details] = useState('');
	const [company_category, setCompany_category] = useState('');
	const [representative_fullname, setRepresentative_fullname] = useState('');
	const [position, setPosition] = useState('');
	const [nationality, setNationality] = useState('');
	const [email, setEmail] = useState('');
	const [phone_number, setPhone_number] = useState('');
	const [sales_representative_fullname, setSales_representative_fullname] = useState('');
	const [sales_representative_position, setSales_representative_position] = useState('');
	const [sales_representative_email, setSales_representative_email] = useState('');
	const [sales_representative_phone_number, setSales_representative_phone_number] = useState('');
	const [cover_letter_url, setCover_letter_url] = useState('');
	const [photo_url, setPhoto_url] = useState('');
	const [commercial_register_url, setCommercial_register_url] = useState('');
	const [idcard_url, setIdcard_url] = useState('');
	const [password, setPassword] = useState('');
	const [is_validated, setIs_validated] = useState(false);
	const [member_id, setMember_id] = useState('');
	const [member_source, setMember_source] = useState('');
	const [sales_representative_nationality, setSales_representative_nationality] = useState('');
	
    const [errors, setErrors] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);

    const getMember = (memberId, signal) => {        
        return Services.MemberService.getById(memberId, signal)
        .then(response => {
            fillMember(response.member);
            setIsDisabled(false);

            return response;
        });
    }

    const createMember = signal => {
        const payload = {
            logo_url,
		company_name,
		country_name,
		head_office,
		address,
		website_url,
		fullname,
		creation_date,
		employee_number,
		legal_status,
		share_capital,
		sector,
		other_details,
		company_category,
		representative_fullname,
		position,
		nationality,
		email,
		phone_number,
		sales_representative_fullname,
		sales_representative_position,
		sales_representative_email,
		sales_representative_phone_number,
		cover_letter_url,
		photo_url,
		commercial_register_url,
		idcard_url,
		is_validated,
		password,
		member_id,
		member_source,
		sales_representative_nationality
		
        };

        return Services.MemberService.create(
        JSON.stringify(payload), signal);
    }
    const updateMember = (memberId, signal) => {
        const payload = {
            logo_url,
		company_name,
		country_name,
		head_office,
		address,
		website_url,
		fullname,
		creation_date,
		employee_number,
		legal_status,
		share_capital,
		sector,
		other_details,
		company_category,
		representative_fullname,
		position,
		nationality,
		email,
		phone_number,
		sales_representative_fullname,
		sales_representative_position,
		sales_representative_email,
		sales_representative_phone_number,
		cover_letter_url,
		photo_url,
		commercial_register_url,
		idcard_url,
		is_validated,
		password,
		member_id,
		member_source,
		sales_representative_nationality
		
        };

        return Services.MemberService.update(
        	memberId, JSON.stringify(payload), signal);
    }
    const deleteMember = (memberId, signal) => {
        return Services.MemberService.destroy(memberId, signal);
    }
    const fillMember = (member) => {
        setId(member.id);
        setLogo_url(member.logo_url ?? '');
		setCompany_name(member.company_name ?? '');
		setCountry_name(member.country_name ?? '');
		setHead_office(member.head_office ?? '');
		setAddress(member.address ?? '');
		setWebsite_url(member.website_url ?? '');
		setFullname(member.fullname ?? '');
		setCreation_date(member.creation_date ?? '');
		setEmployee_number(member.employee_number ?? '');
		setLegal_status(member.legal_status ?? '');
		setShare_capital(member.share_capital ?? '');
		setSector(member.sector ?? '');
		setOther_details(member.other_details ?? '');
		setCompany_category(member.company_category ?? '');
		setRepresentative_fullname(member.representative_fullname ?? '');
		setPosition(member.position ?? '');
		setNationality(member.nationality ?? '');
		setEmail(member.email ?? '');
		setPhone_number(member.phone_number ?? '');
		setSales_representative_fullname(member.sales_representative_fullname ?? '');
		setSales_representative_position(member.sales_representative_position ?? '');
		setSales_representative_email(member.sales_representative_email ?? '');
		setSales_representative_phone_number(member.sales_representative_phone_number ?? '');
		setCover_letter_url(member.cover_letter_url ?? '');
		setPhoto_url(member.photo_url ?? '');
		setCommercial_register_url(member.commercial_register_url ?? '');
		setIdcard_url(member.idcard_url ?? '');
		setPassword(member.password ?? '');
		setMember_id(member.member_id ?? '');
		setIs_validated(member.is_validated ?? false);
		setMember_source(member.member_source ?? '');
		setSales_representative_nationality(member.sales_representative_nationality ?? '');
		
    }
    const emptyMember = () => {
        setId('');
        setLogo_url('');
		setCompany_name('');
		setCountry_name('');
		setHead_office('');
		setAddress('');
		setWebsite_url('');
		setFullname('');
		setCreation_date('');
		setEmployee_number('');
		setLegal_status('');
		setShare_capital('');
		setSector('');
		setOther_details('');
		setCompany_category('');
		setRepresentative_fullname('');
		setPosition('');
		setNationality('');
		setEmail('');
		setPhone_number('');
		setSales_representative_fullname('');
		setSales_representative_position('');
		setSales_representative_email('');
		setSales_representative_phone_number('');
		setCover_letter_url('');
		setPhoto_url('');
		setCommercial_register_url('');
		setIdcard_url('');
		setPassword('');
		setMember_id('');
		setIs_validated('');
		setMember_source('');
		setSales_representative_nationality('');
		
    }

    return {
        id,
        logo_url,
		company_name,
		country_name,
		head_office,
		address,
		website_url,
		fullname,
		creation_date,
		employee_number,
		legal_status,
		share_capital,
		sector,
		other_details,
		company_category,
		representative_fullname,
		position,
		nationality,
		email,
		phone_number,
		sales_representative_fullname,
		sales_representative_position,
		sales_representative_email,
		sales_representative_phone_number,
		cover_letter_url,
		photo_url,
		commercial_register_url,
		idcard_url,
		password,
		is_validated,
		member_id,
		member_source,
		sales_representative_nationality,
		
        errors,
        isDisabled,
        setLogo_url,
		setCompany_name,
		setCountry_name,
		setHead_office,
		setAddress,
		setWebsite_url,
		setFullname,
		setCreation_date,
		setEmployee_number,
		setLegal_status,
		setShare_capital,
		setSector,
		setOther_details,
		setCompany_category,
		setRepresentative_fullname,
		setPosition,
		setNationality,
		setEmail,
		setPhone_number,
		setSales_representative_fullname,
		setSales_representative_position,
		setSales_representative_email,
		setSales_representative_phone_number,
		setCover_letter_url,
		setPhoto_url,
		setCommercial_register_url,
		setIdcard_url,
		setPassword,
		setMember_id,
		setIs_validated,
		setMember_source,
		setSales_representative_nationality,
		
        setId,
        setErrors,
        setIsDisabled,
        getMember,
        createMember,
        updateMember,
        deleteMember,
        fillMember,
        emptyMember
    };
}