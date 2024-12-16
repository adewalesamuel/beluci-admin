//'use client'
import { useCallback, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Services } from '../services';
import { Components } from '../components';
import { useError } from '../hooks/useError';

export function MemberTrashedListView() {
    let abortController = new AbortController();
    const errorHandler = useError();

    const { MemberService } = Services;

    const tableAttributes = {
        'logo_url': {},
		'company_name': {},
		'country_name': {},
		'sector': {},
		'company_category': {},
		'representative_fullname': {},
		'phone_number': {},
		
    }
    const tableActions = ['delete'];
    
    const [searchParams] = useSearchParams();

    const [members, setMembers] = useState([]);
    const [page, setPage] = useState(1);
    const [pageLength, setPageLength] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const handleDeleteClick = async (e, member) => {
        e.preventDefault();

        if (confirm('Voulez vous vraiment restaurer ce membre')) {
            const membersCopy = [...members];
            const index = membersCopy.findIndex(memberItem => 
                memberItem.id === member.id);

            membersCopy.splice(index, 1);
            setMembers(membersCopy);

            await MemberService.restore(member.id, 
                abortController.signal);
        }
    }

    const init = useCallback(async () => {
        try {
            const {members} = await MemberService.getAllTrashed(
                {page: page}, abortController.signal);
            const memeberData = members.data.map(member => {
                member['logo_url'] = (<img src={member.logo_url} 
                    className="rounded" width={50}/>);
                member['company_name'] = (<Link to={`/members/${member.id}/edit`}>
                    {member.company_name}</Link>);

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
            <Components.Loader isLoading={isLoading}>
                <Components.Table controllers={{handleDeleteClick}} 
                tableAttributes={tableAttributes} tableActions={tableActions} 
                tableData={members}/>

                <Components.Pagination pageLength={pageLength} page={parseInt(page)} />
            </Components.Loader>
        </>
    )
}
