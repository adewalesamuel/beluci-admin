import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Services } from '../services';
import { Components } from "../components";
import placeholderImg from '../assets/img/400x400/img2.jpg';
import { BsCalendar, BsGeoAlt } from "react-icons/bs";

export function DashboardView(){
    let abortController = new AbortController();
    const tableAttributes = {
        'company_name': {},
		'representative_fullname': {},
		'phone_number': {},
		'country_name': {},
		'sector': {},
    }
    const tableActions = ['edit', 'delete'];

    const navigate = useNavigate();

    const [analytics, setAnalytics] = useState({});
    const [members, setMembers] = useState([]);

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

            await Services.MemberService.destroy(member.id, 
                abortController.signal);
        }
    }

    const init =  useCallback(async () => {
        try {
            const analitycs = await Services.DashboardService.getAll(
                abortController.signal);
            setAnalytics(analitycs);
            setMembers(analitycs.members.data);
        } catch(error) {
            console.log(error);
        }
    },[])
    
    useEffect(() => {
        init();

        return () => {
            abortController.abort();
            abortController = new AbortController();
        }
    }, [init])

    return (
        <>
            <h2>Vue d&apos;ensemble</h2>
            <div className="row">
                <div className="col-12 col-md-9">
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <div className="card" style={{backgroundColor: '#000627'}}>
                                <div className="card-body">
                                    <h2 className="text-white">Vous avez <span style={{color: "#b2defc"}}>
                                        {analytics.pending_members ?? '--'} nouvelles demandes d&apos;inscription
                                    </span> de membres à validez</h2>
                                    <Link className="btn btn-sm text-black mt-2" to='/members' style={{backgroundColor: "#b2defc"}}>
                                        Voir les demandes à valider
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-3">
                            <div className="card h-100" style={{backgroundColor: '#fad949'}}>
                                <div className="card-body h-100 d-flex flex-column justify-content-between">
                                    <h6>Membres actifs</h6>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div className="display-3 text-black fw-light">
                                            {analytics.validated_members ?? '--'}
                                        </div>
                                        <Link className="btn btn-sm border py-1 px-2 border-dark" to='/members'>
                                            Voir {'>'}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-3">
                            <div className="card h-100" style={{backgroundColor: 'lightgray'}}>
                                <div className="card-body h-100 d-flex flex-column justify-content-between">
                                    <h6>Membres à valider</h6>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div className="display-3 text-black fw-light">
                                            {analytics.pending_members ?? '--'}
                                        </div>
                                        <Link className="btn btn-sm border py-1 px-2 border-dark" to='/members'>
                                            Voir {'>'}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card mt-3">
                        <div className="card-header">
                            <div className="card-title d-flex justify-content-between align-items-center">
                                <h2>Liste des membres</h2>
                                <Link className="btn btn-sm border py-1 px-2 border-dark" to='/members'>Voir {'>'}</Link>
                            </div>
                        </div>
                        <div className="card-body pt-0 px-0">
                            <Components.Table controllers={{handleEditClick, handleDeleteClick}} 
                            tableAttributes={tableAttributes} tableActions={tableActions} 
                            tableData={members}/>    
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-3">
                    <div className="card">
                        <div className="card-header">
                            <div className="card-title d-flex justify-content-between align-items-center">
                                <h2>Evènements</h2>
                                <Link className="btn btn-sm border py-1 px-2 border-dark" 
                                to='/events'>
                                    Voir tout {'>'}
                                </Link>
                            </div>
                        </div>
                        <div className="card-body">
                            <img src={analytics?.latest_event?.display_img_url ?? ''} className="img-fluid" 
                            onError={e => e.currentTarget.src=placeholderImg} />

                            <div className="py-2">
                                <h4>{analytics?.latest_event?.name ?? '--'}</h4>
                                <time className="d-inline-block py-1">
                                    <BsCalendar size={16} className="text-info me-2" /> 
                                    {analytics?.latest_event?.date && new Date(
                                        analytics?.latest_event?.date).toLocaleDateString('fr')}
                                </time>
                                <address className="d-ininle-block py-1">
                                    <BsGeoAlt size={16} className="text-danger me-2" />
                                    {analytics?.latest_event?.address ?? '--'}
                                </address>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}