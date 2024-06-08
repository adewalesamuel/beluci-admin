import { Link } from "react-router-dom";

export function PageHeader(){
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
                    <h1 className="page-header-title">Tableau de board</h1>
                </div>
                <div className="col-sm-auto">                
                </div>
            </div>
      </div>
    )
}