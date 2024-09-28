import { Api } from './Api';

const ENDPOINT = '/analytics';

const getAll = (signal) => {
    return Api.get(`${ENDPOINT}`, signal)
}

export const DashboardService = {
    ENDPOINT,
    getAll,
}