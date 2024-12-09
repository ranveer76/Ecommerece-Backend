const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const envPath = path.join(__dirname);

const env = {
    PRODUCTION: false,
    ORIGIN: 'http://localhost:3000',
    MONGO_URI: 'mongodb://localhost:27017/your_db_name',
    SECRET_KEY: 'yoursecretkey',
    PASSWORD_RESET_TOKEN_EXPIRATION: '3m',
    LOGIN_TOKEN_EXPIRATION: '30d',
    COOKIE_EXPIRATION_DAYS: '7',
    OTP_EXPIRATION_TIME: '120000',
    EMAIL: '',
    PASSWORD: ''
};

const envKeys = Object.keys(env);

const ask = (index) => {
    if (index === envKeys.length) {
        let envString = '';
        for (let key in env) {
            envString += `${key}="${env[key]}"\n`;
        }
        fs.writeFileSync(path.join(envPath, '.env'), envString);
        console.log('Environment variables set successfully');
        rl.close();
        return;
    }
    rl.question(`Enter value for ${envKeys[index]} (${env[envKeys[index]]}) : `, (answer) => {
        if (answer.trim() === '') {
            ask(index + 1);
            return;
        }
        env[envKeys[index]] = answer;
        ask(index + 1);
    });
};

ask(0);