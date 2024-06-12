import { Link, useLocation } from "react-router-dom";
import { Utils } from "../utils";

export function PageHeader(){
    const {__} = Utils.String;

    const {pathname} = useLocation();

    return (
        <div className="page-header">
            <div className="row align-items-end">
                <div className="col-sm mb-2 mb-sm-0">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb breadcrumb-no-gutter">
                            <li className="breadcrumb-item">
                                <Link className="breadcrumb-link" to={'/'}>Pages</Link>
                            </li>
                        </ol>
                    </nav>
                    <h1 className="page-header-title">
                        {pathname.split('/')[1] !== "" ? 
                        __(pathname.split('/')[1]) : 'Tableau de board'}
                    </h1>
                </div>
                <div className="col-sm-auto">                
                </div>
            </div>
      </div>
    )
}