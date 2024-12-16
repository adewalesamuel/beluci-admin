import { Api } from './Api';

const ENDPOINT = '/members';

const getAll = (params, signal) => {
    const query = params.query ? `&query=${params.query}` : '';
    return Api.get(`${ENDPOINT}?page=${params?.page ?? ''}${query}`, signal);
}

const getById = (id, signal) => {
    return Api.get(`${ENDPOINT}/${id}`, signal);
}

const create = (payload, signal) => {
    return Api.post(ENDPOINT, payload, signal)
}

const update = (id, payload, signal) => {
    return Api.put(`${ENDPOINT}/${id}`, payload, signal)
}


const validate = (id, signal) => {
    return Api.post(`${ENDPOINT}/${id}/validate`, '', signal)
}

const destroy = (id, signal) => {
    return Api.erase(`${ENDPOINT}/${id}`, signal)
}

export const MemberService = {
    ENDPOINT,
    getAll,
    getById,
    create,
    update,
    validate,
    destroy
}