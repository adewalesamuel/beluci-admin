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
		'sector': {},
		'company_category': {},
		'representative_fullname': {},
		'phone_number': {},
        'is_validated': {},
		
    }
    const tableActions = ['edit', 'delete'];
    
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [members, setMembers] = useState([]);
    const [page, setPage] = useState(1);
    const [pageLength, setPageLength] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);

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

    const handleValidateClick = async (e, member) => {
        e.preventDefault();
        setIsDisabled(true);
        
        if (isDisabled === true) return;

        e.target.innerText = "Chargement...";

        try {
            if (!confirm('Vous vous vraiment validez ce membre'))
                return;
            
            await MemberService.validate(member.id, abortController.signal);
            init();
        } catch (error) {
            errorHandler.setError(error);
            e.target.innerText = "Valider";
        } finally {
            setIsDisabled(false);
        }
    }

    const renderIsValidated = (member, is_validated = false) => {
        if (Boolean(is_validated) === false) {
            return (<button className="btn btn-primary btn-sm" 
            onClick={e => handleValidateClick(e, member)}>
                    Valider</button>
                );
        }

        if (Boolean(is_validated) === true || !is_validated) {
            return (<span className='bg-soft-success text-success badge rounded-pill'>
                    Membre validé</span>
                );
        }
    
    }

    const init = useCallback(async () => {
        try {
            const {members} = await MemberService.getAll(
                {page: page}, abortController.signal);
            const memeberData = members.data.map(member => {
                member['logo_url'] = (<img src={member.logo_url} 
                    className="rounded" width={50}/>);
                member['company_name'] = (<Link to={`/members/${member.id}/edit`}>
                    {member.company_name}</Link>);
                member['is_validated'] = renderIsValidated(member, member.is_validated);

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
