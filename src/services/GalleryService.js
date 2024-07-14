import { Api } from './Api';

const ENDPOINT = '/gallerys';

const getAll = (params, signal) => {
    return Api.get(`${ENDPOINT}?page=${params?.page ?? ''}`, signal)
}

const getById = (id, signal) => {
    return Api.get(`${ENDPOINT}/${id}`, signal);
}

const getByEventId = (id, signal) => {
    return Api.get(`/events/${id}${ENDPOINT}`, signal);
}

const create = (payload, signal) => {
    return Api.post(ENDPOINT, payload, signal)
}

const update = (id, payload, signal) => {
    return Api.put(`${ENDPOINT}/${id}`, payload, signal)
}
const destroy = (id, signal) => {
    return Api.erase(`${ENDPOINT}/${id}`, signal)
}

export const GalleryService = {
    ENDPOINT,
    getAll,
    getById,
    getByEventId,
    create,
    update,
    destroy
}