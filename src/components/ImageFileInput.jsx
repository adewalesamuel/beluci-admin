import { useEffect } from 'react';
import placeholderImg from '../assets/img/400x400/img2.jpg';
import { Hooks } from '../hooks';

export function ImageFileInput(props) {

    const useImage = Hooks.useImage();

    useEffect(() => {
        if (!useImage.fileUrl) return;
        
        props.handleImageChange(useImage.fileUrl);
    }, [useImage.fileUrl]);

    return (
        <span className='d-d-inline-block'>
            <div className="position-relative" style={{
                    maxWidth: `${props.width ?? "100"}px`,
                }}>
                <input className='position-absolute w-100 h-100 fade' type='file' 
                role='button' onChange={e => useImage.handleFileChange(e.target.files[0])} 
                accept='image/*' style={{top: 0, left: 0}} disabled={useImage.isLoading}/>
                <img src={props.img_url ?? ''} className="w-100 rounded" 
                height={props.height ?? 'auto'} onError={e => 
                e.currentTarget.src = placeholderImg} style={{objectFit: 'cover'}}/>
            </div>
        </span>
    )
}