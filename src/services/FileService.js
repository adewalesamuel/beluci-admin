import { Api } from './Api';

const  ENPOINTS = {
    File: '/upload',
};

const imageStore = (payload, signal) => {
    return Api.postFormData(`${ENPOINTS.File}/image`, payload, signal)
}

const fileStore = (payload, signal) => {
    return Api.postFormData(`${ENPOINTS.File}/file`, payload, signal)
}

export const FileService = {
    imageStore,
    fileStore
}