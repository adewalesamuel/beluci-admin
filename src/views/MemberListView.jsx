//'use client'
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Services } from '../services';
import { Components } from '../components';

export function MemberListView() {
    let abortController = new AbortController();

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
		'other_details': {},
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
		'cover_letter_url': {},
		'photo_url': {},
		'commercial_register_url': {},
		'idcard_url': {},
		'password': {},
		'member_id': {},
		
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

            setMembers(members.data);
            setPageLength(members.last_page);
        } catch (error) {
            console.log(error);
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
            <h6>Liste Members</h6>
            <Components.Loader isLoading={isLoading}>
                <Link className='btn btn-info' to='/members/create'>
                    <i className='icon ion-plus'></i> Créer member
                </Link>
                <Components.Table controllers={{handleEditClick, handleDeleteClick}} 
                tableAttributes={tableAttributes} tableActions={tableActions} 
                tableData={members}/>

                <Components.Pagination pageLength={pageLength} page={parseInt(page)} />
            </Components.Loader>
        </>
    )
}
