import { useState } from 'react';
import { Services } from '../services';

export const useImage = () => {
	const abortController = new AbortController();

	const [fileUrl, setFileUrl] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const handleFileChange = async file => {
		setIsLoading(true);

		try {
			const formData = new FormData();

			formData.append('image', file);

			const {image_url} = await Services.FileService.imageStore(
				formData, abortController.signal);

			setFileUrl(image_url);
		} catch(error) {
			if (!('message' in error)) return;
			setErrorMessage(error.message);
		} finally {
			setIsLoading(false);
		}
	}

	return {
		fileUrl,
		isLoading,
		errorMessage,
		handleFileChange
	}
}