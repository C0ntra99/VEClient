const config = {
    "endpoints":[
        {
            "name":"Scoreing",
            "route":"/api/scoring",
            "app_path":"./routes/api/scoring"
        }
    ],
    "globals":{
        "logging":{
            "path":"./logs",
            "level":"debug",
            "maxSize":"5m",
            "maxFiles":"100"
        },
        "engine":{
            "score_config_path":"./test_engine_config.json"
        }
    }
}

module.exports = config;