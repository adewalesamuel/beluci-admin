import { Api } from './Api';

const ENDPOINT = '/members';

const getAll = (params, signal) => {
    const query = params.query ? `&query=${params.query}` : '';
    const is_validated = params.is_validated ? `&is_validated=${params.is_validated}`: '';

    return Api.get(`${ENDPOINT}?page=${params?.page ?? ''}${query}${is_validated}`, signal);
}

const getAllTrashed = (params, signal) => {
    return Api.get(`${ENDPOINT}/trashed?page=${params?.page ?? ''}`, signal);
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

const restore =(id, signal) => {
    return Api.post(`${ENDPOINT}/${id}/restore`,'', signal)
}

export const MemberService = {
    ENDPOINT,
    getAll,
    getAllTrashed,
    getById,
    create,
    update,
    validate,
    destroy,
    restore,
}