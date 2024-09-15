
import upstashConfig from "../configs/upstash.config"
import axios from "axios";

const set = async (query: string, answer: object) => {
    return (await axios.post(`${upstashConfig.url}/set`, {
        query: query,
        answer: answer
    }, { headers: { "access-token": upstashConfig.api_key } })).data;
}

const get = async (query: string) => {
    return (await axios.post(`${upstashConfig.url}/get`, {
        query: query,
    }, { headers: { "access-token": upstashConfig.api_key }})).data;
}

const semanticCache = { set, get };

const upstash = { semanticCache }
export default upstash;
