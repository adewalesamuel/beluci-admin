import { Components } from ".";

export function Loader(props){
    return (
        <>
            {props.isLoading ? 
                <div className="mt-2 d-flex justify-content-center 
                align-items-center" style={{minHeight: '200px'}}>
                    <Components.Spinner />  
                </div>
            : props.children}
        </>
    )
}