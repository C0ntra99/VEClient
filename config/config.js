const config = {
    "endpoints":[
        {
            "name":"Scoring",
            "route":"/api/scoring",
            "app_path":"./routes/api/scoring"
        },
        {
            "name":"Engine",
            "route":"/api/engine",
            "app_path":"./routes/api/engine"
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
        },
        "VEClient":{
            "team":null,
            "instance_uid":""
        }
    }
}

module.exports = config;