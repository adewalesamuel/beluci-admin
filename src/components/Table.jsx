import { FiPlus as ReadIcon, 
    FiTrash as DeleteIcon
 } from "react-icons/fi";
import { Utils } from "../utils";
export function Table(props) {
    const {__} = Utils.String;
    const ACTIONS = {
        EDIT: 'edit',
        READ: 'read',
        DELETE: 'delete'
    };
    const {tableAttributes, tableData, tableActions, controllers} = props;
    const {handleEditClick, handleReadClick, handleDeleteClick} = controllers;
        
    const renderReadButton = data => (
        <button className="btn btn-sm btn-danger" 
        onClick={e => handleReadClick(e, data)} key={Math.random()}> 
            Voir 
        </button>
        );

    const renderEditButton = data => (
        <button className="btn btn-sm btn-info me-3" 
        onClick={e => handleEditClick(e, data)} key={Math.random()}> 
            <ReadIcon/> Details
        </button>
        );

    const renderDeleteButton = data => (
        <button className="btn btn-sm btn-danger" 
        onClick={e => handleDeleteClick(e, data)} key={Math.random()}> 
            <DeleteIcon />
        </button>
        );

    const renderTableHeads = () => {
        const tableHeads = Object.keys(tableAttributes)
        .map((key, index) => {
            return (
                <th className={`${tableAttributes[key].thClassName ?? "col"} 
                whitespace-no-wrap`} key={index}>
                    {__(key)}
                </th>
            )
        })

        tableHeads.push(<th key={9999} className="text-center 
        whitespace-no-wrap">Actions</th>);

        return tableHeads;
    }

    const renderTableCell = (data, attribute, index) => {
        return (<td className={tableAttributes[attribute].tdClassName ?? ""} 
            key={index}>{data}
            </td>
        )
    }

    const renderTableActionCell = data => {
        return (
            <td className="table-report__action w-56" key={Math.random()}>
                {tableActions.map((action) => {
                    switch (action) {
                        case ACTIONS.EDIT:
                            return renderEditButton(data);
                        case ACTIONS.READ:
                            return renderReadButton(data);
                        case ACTIONS.DELETE:
                            return renderDeleteButton(data);
                        default:
                            return null;
                    }
                })}
            </td>
        )

    }

    const renderTableRow = (rowData, index) => {
        const tableCells = Object.keys(rowData).map((key, i) => {
                if (key in tableAttributes === false) return null;

                return renderTableCell(rowData[key], key, i);
            });

        tableCells.push(renderTableActionCell(rowData))

        return (<tr key={index} className="intro-x">{tableCells}</tr>)
    }

    return (
        <div className='table-responsive mt-5'>
            <table className="table table-bor table-thead-bordered 
            table-nowrap table-align-middle card-table table-hover">
                <thead className="thead-light">
                    <tr>{renderTableHeads()}</tr>
                </thead>
                <tbody>
                    {tableData.map((rowData, index) => renderTableRow(rowData, index))}
                </tbody>
            </table>
        </div>

    )
}