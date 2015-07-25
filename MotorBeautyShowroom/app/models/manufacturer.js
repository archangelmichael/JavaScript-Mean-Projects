/**
 * Created by Radi on 7/23/2015.
 */
'use strict';
var mongoose = require('mongoose');

// Create Schema
var Schema = mongoose.Schema;
var ManufacturerSchema = new Schema({
    name :  { type : String, required : true, index : { unique : true } },
    founded : Date,
    founders : [ { type : String } ],
    picturePath : {type:String, default: './images/manufacturer.jpg'},
    baseLocation : String,
    officialWebsite : String
});

module.exports = mongoose.model('Manufacturer', ManufacturerSchema);