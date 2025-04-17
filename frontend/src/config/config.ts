interface Config {
    apiUrl: string;
}

const config: { [key: string]: Config } = {
    development: {
        apiUrl: 'http://localhost:8080',
    },
    production: {
        apiUrl: process.env.REACT_APP_API_URL || 'https://resume-analyzer-production.up.railway.app',
    },
};

const environment = process.env.NODE_ENV || 'development';
export default config[environment];