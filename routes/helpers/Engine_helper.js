const axios = require('axios');
const fs = require('fs');
const {v4: uuid} = require('uuid')
const Instance_schema = require('../models/Instance');
const config = require('../../config/config')

class Engine_helper {
    async register_instance(req) {
        return new Promise((resolve, reject) => {

            /* Instance schema
            {
                "os_details":{
                    "hostname":"Test",
                    "release":"arch",
                    "network":{
                        "ip_addr":"1.2.3.4",
                        "hw_addr":"ha:ha:ha:ha:ha"
                    }
                },
                "scoring_config":{
                    "name":"Work In Progress"
                },
                "team":"test team",
                "round":"Test Round"
            }
            */

            let new_instance = new Instance_schema(req.body);
            new_instance.running = true
            new_instance.uid = uuid();
            
            new_instance.validate((err) => {
                if(err) {
                    return resolve({status:300, message:err})
                }
                //pull server hostname/address from config
                axios.post('http://localhost:8080/api/instance', new_instance)
                .then((resp) => {
                    //console.log(resp)
                    if(resp.data.status !== 200){
                        return resolve({status:300, message: resp.data.message})
                    }
            
                        config.globals.VEClient.instance_uid = resp.data.uid
                        fs.writeFileSync('etc/VEClient.conf', JSON.stringify(config.globals.VEClient), (err) => {
                            if(err){
                                console.log(err)
                            }
                            
                        })
                        return resolve({status:200, message:resp.data.message})
                        
                })
                .catch((resp) => {
                    console.log(resp)
                    return resolve({status:500, message: resp.data.message})
                })
            });

        })
    }
}

module.exports = Engine_helper;