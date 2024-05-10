import api from "./api";

const apiPath = import.meta.env.VITE_API_PATH;
const resource = `${apiPath}/summaries`;

export const tasksSummary = (params = {}) => api.get(resource, { params });
