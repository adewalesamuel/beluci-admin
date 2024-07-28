//'use client'
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Services } from '../services';
import { Components } from '../components';
import { useError } from '../hooks/useError';

export function MemberListView() {
    let abortController = new AbortController();
    const errorHandler = useError();

    const { MemberService } = Services;

    const tableAttributes = {
        'logo_url': {},
		'company_name': {},
		'country_name': {},
		'head_office': {},
		'address': {},
		'website_url': {},
		'fullname': {},
		'creation_date': {},
		'employee_number': {},
		'legal_status': {},
		'share_capital': {},
		'sector': {},
		'company_category': {},
		'representative_fullname': {},
		'position': {},
		'nationality': {},
		'email': {},
		'phone_number': {},
		'sales_representative_fullname': {},
		'sales_representative_position': {},
		'sales_representative_email': {},
		'sales_representative_phone_number': {},
		'photo_url': {},
		
    }
    const tableActions = ['edit', 'delete'];
    
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [members, setMembers] = useState([]);
    const [page, setPage] = useState(1);
    const [pageLength, setPageLength] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const handleEditClick = (e, data) => {
        e.preventDefault();
        navigate(`/members/${data.id}/edit`);
    }
    const handleDeleteClick = async (e, member) => {
        e.preventDefault();

        if (confirm('Voulez vous vraiment supprimer ce member')) {
            const membersCopy = [...members];
            const index = membersCopy.findIndex(memberItem => 
                memberItem.id === member.id);

            membersCopy.splice(index, 1);
            setMembers(membersCopy);

            await MemberService.destroy(member.id, 
                abortController.signal);
        }
    }

    const init = useCallback(async () => {
        try {
            const {members} = await MemberService.getAll(
                {page: page}, abortController.signal);
            const memeberData = members.data.map(member => {
                member['logo_url'] = (<img src={member.logo_url} 
                    className="rounded" width={50}/>);
                member['photo_url'] = (<img src={member.photo_url} 
                    className="rounded" width={50}/>);
                member['company_name'] = (<Link to={`/members/${member.id}/edit`}>
                    {member.company_name}</Link>);
                member['website_url'] = (<a href={member.website_url} 
                    target="_blank">{member.website_url}</a>);

                return member;
            })

            setMembers(memeberData);
            setPageLength(members.last_page);
        } catch (error) {
            errorHandler.setError(error); 
        } finally {
            setIsLoading(false);
        }
    }, [page]);

    useEffect(() => {
        init();

        return () => {
            abortController.abort();
            abortController = new AbortController();
        }
    }, [init]);

    useEffect(() => {
        if (!searchParams.get('page')) return;

        setPage(searchParams.get('page'));
    }, [searchParams.get('page')]);

    return (
        <>
            <h4>Liste Members</h4>
            <Components.Loader isLoading={isLoading}>
                <Link className='btn btn-info' to='/members/create'>
                     Créer member
                </Link>
                <Components.Table controllers={{handleEditClick, handleDeleteClick}} 
                tableAttributes={tableAttributes} tableActions={tableActions} 
                tableData={members}/>

                <Components.Pagination pageLength={pageLength} page={parseInt(page)} />
            </Components.Loader>
        </>
    )
}
