import { Api } from './Api';

const ENDPOINT = '/messages';

const getAll = (params, signal) => {
    return Api.get(`${ENDPOINT}?page=${params?.page ?? ''}`, signal)
}

const getById = (id, signal) => {
    return Api.get(`${ENDPOINT}/${id}`, signal);
}

const getByForumId = (id, params, signal) => {
    return Api.get(`forums/${id}${ENDPOINT}?page=${params?.page ?? ''}`, signal);
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

export const MessageService = {
    ENDPOINT,
    getAll,
    getByForumId,
    getById,
    create,
    update,
    destroy
}