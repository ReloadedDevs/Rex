module.exports = {
    apps: [
        {
            name: 'Rex',
            script: 'main.js',
            env: { COMMON_VARIABLE: 'true' },
            env_production: { NODE_ENV: 'production' },
            env_hook: {
                command: "git reset --hard && git pull && npm install && pm2 startOrReload ecosystem.config.js production",
                cwd: "/home/TeamRex/applications/Rex/"
            }
        }
    ]
};