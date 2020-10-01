const lib = require('require-all')(__dirname +'/event_checks')
const fs = require('fs')
class VEngine {
    _loadVulnConfig(filepath) {
        return JSON.parse(fs.readFileSync(filepath, 'utf8'))['vulnerabilities'];
    }

    score(engineConfig) {
        let vulnConfig = this._loadVulnConfig(engineConfig)
        
        //This is where the magic of the VIBE ENGINE happens (i.e this is the engine. The rest is just supporting and reporting)
        for (const [category, vulns] of Object.entries(vulnConfig)) {
            //category to be used in the future
            vulns.forEach((vuln) => {

                //lib is the import of all the event_checks
                //lib[vuln.fn_name] calls the event
                //Very similar to eval
                console.log(lib[vuln.fn_name]())
            })
          }
    }
}

//all test code. This should be in the main app
let Engine = new VEngine;
Engine.score(__dirname + '/test_engine_config.json')