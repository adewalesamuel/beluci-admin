import { useState } from 'react';
import { Services } from '../services';

export const useFile = () => {
	const abortController = new AbortController();

	const [fileUrl, setFileUrl] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const handleFileChange = async file => {
		setIsLoading(true);

		try {
			const formData = new FormData();

			formData.append('file', file);

			const {file_url} = await Services.FileService.fileStore(
				formData, abortController.signal);
			setFileUrl(file_url);
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