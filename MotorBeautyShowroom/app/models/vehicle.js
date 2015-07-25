/**
 * Created by Radi on 7/23/2015.
 */
'use strict';
var mongoose = require('mongoose');

// Create Schema
var Schema = mongoose.Schema;
var VehicleSchema = new Schema({
    model : { type : String, required : true, index : { unique : true } },
    name : { type : String },
    productionStart : Number,
    productionEnd : Number,
    weight : Number,
    power : Number,
    topSpeed : Number,
    picturePath : { type : String, default: './images/vehicle.jpg' },
    manufacturerId : { type : Schema.Types.ObjectId, ref : 'Manufacturer' } ,
    comments : [ { body: String, date: Date } ],
    votes: { type : Number, default : 0 } ,
    favs: { type : Number, default : 0 }
});

module.exports = mongoose.model('Vehicle', VehicleSchema);