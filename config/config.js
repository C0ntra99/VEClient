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
        }
    }
}

module.exports = config;