import axios  from 'axios';

export default axios.create({
    baseURL: `https://thebetter.bsgroup.eu/`,
    headers: {
        'Content-Type': 'application/JSON'
    },
    timeout: 3000,
});
