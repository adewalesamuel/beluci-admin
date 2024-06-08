import { useEffect } from 'react';
import { Hooks } from '../hooks';

export function FileInput(props) {

    const useFile = Hooks.useFile();

    useEffect(() => {
        if (!useFile.fileUrl) return;
        console.log(useFile.fileUrl)
        
        props.handleFileChange(useFile.fileUrl);
    }, [useFile.fileUrl]);

    return (
        <input className='form-control' type='file' 
        role='button' onChange={e => useFile.handleFileChange(e.target.files[0])} 
        accept='.pdf, .doc, .docx, .xlsx, .xls' disabled={useFile.isLoading} />
    )
}