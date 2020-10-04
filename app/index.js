const lib = require('require-all')(__dirname +'/event_checks')
const fs = require('fs')
const axios = require('axios')
const VEConfig = JSON.parse(fs.readFileSync('etc/VEClient.conf', 'utf-8'))

class VEngine {
    _loadVulnConfig(filepath) {
        return JSON.parse(fs.readFileSync(filepath, 'utf8'))['vulnerabilities'];
    }

    _getCurrentScore() {
        return new Promise((resolve, reject) => {
            axios.get(`http://localhost:8080/api/instance?uid=${VEConfig.instance_uid}`)
            .then((resp) => {
                return resolve(resp.data.instance[0].score.current)
            })
            .catch((resp) => {
                //console.log(resp)
                return resolve(0)
            })
        })

    }

    async score(engineConfig) {
        return new Promise(async (resolve, reject) => {
            let vulnConfig = this._loadVulnConfig(engineConfig)
            let currentScore = await this._getCurrentScore()
    
            //This is where the magic of the VIBE ENGINE happens (i.e this is the engine. The rest is just supporting and reporting)
            for (const [category, vulns] of Object.entries(vulnConfig)) {
                //category to be used in the future
                let scoreDelta = 0//hoist the scoring delta
                vulns.forEach(async (vuln) => {
                    if(!vuln.enabled) {
                        return
                    }
    
                     //lib is the import of all the event_checks
                    //lib[vuln.fn_name] calls the event
                    //Very similar to eval
                    let check_result = lib[vuln.fn_name](vuln.parameters);
    
                    //If event returns true, that means the score is good
                    if(check_result){
                        //Gotta figure out -points for certain events
                        //console.log(currentScore)
                        scoreDelta += vuln.pointValue
                        
                    }
                })
                //console.log(scoreDelta)
                //This should be whatever round was sent during /register
                // info that is sent to /register should be stored in config file for later reference
                axios.get('http://localhost:8080/api/round?name=Test Round')
                .then((resp) => {
                    if(resp.data.round[0].running){
                        return resolve(currentScore+scoreDelta)
                    }
                    else {
                        //Stop the instance
                        console.log(VEConfig)
                        axios.get(`http://localhost:8080/api/instance/${VEConfig.instance_uid}/stop`)
                    }
                })
              }
        })
        
    }
}

//all test code. This should be in the main app
//let Engine = new VEngine;
//Engine.score(__dirname + '/engine_config_template.json')

module.exports = VEngine;