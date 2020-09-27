const mongoose = require('mongoose');
const logger = require('../../plugins/logger');
const Schema = mongoose.Schema;


const Instance_schema = new Schema(
    {
        os_details:{
            hostname:{type:String, required:[true, 'Hostname required']},
            release: {type:String, required:[true, 'Os release required']},
            network:{
                ip_addr: {type:String, required:[true, 'Ip address required for communication']},
                hw_addr: {type:String, required:[true, 'Hardware (mac) address required for super secret spy stuff ;)']}
            }
        },
        scoring_config: Object, //This might be able to have its own DB at somepoint. Or atleast a "market place" for scoring engine configs
        team: {type: String, ref: 'Teams', default:null},
        score: {
            current: Number,
            previous: Number
        },
        uid: String,
        running: {type:Boolean, default:false},
        round: {type: String, required:[true, 'Round required'], ref: 'Rounds', default:null}
    },
    {timestamps: true}
)

module.exports = Instance_model = mongoose.model("Instances", Instance_schema);