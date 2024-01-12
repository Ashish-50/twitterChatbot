"use strict";
module.exports = {
    apps: [
        {
            name: 'your-app-name',
            script: './src/index.ts',
            watch: true,
            instances: 1,
            exec_mode: 'fork',
            autorestart: true,
            max_memory_restart: '1G',
            env: {
                NODE_ENV: 'development',
            },
            env_production: {
                NODE_ENV: 'production',
            },
        },
    ],
};
