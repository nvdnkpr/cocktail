/*
 *
 * Copyright (c) 2013 Maximiliano Fierro
 * Licensed under the MIT license.
 */
'use strict';


var sequence = require('../sequence'),
    Extends = function(){};

Extends.prototype = {
    retain   : false,
    priority : sequence.EXTENDS,
    name     : '@extends',

    _parameter: undefined,

    setParameter: function(value){
        if(typeof value !== 'function'){
            throw new Error("Object cannot be extended");
        }
        this._parameter = value;
    },

    getParameter: function() {
        return this._parameter;
    },

    process: function(subject){
        var parent = this.getParameter(),
            sp;

        subject.prototype = sp = Object.create(parent.prototype);

        sp.$super = parent;

        sp.callSuper = function(methodName){
            var mthd = this.$super.prototype[methodName],
                mthdArgs = Array.prototype.slice.call(arguments, 1);
            if(!mthd){
               throw new Error("There is no method named " + mthd + " in parent class.");
            }
            return mthd.apply(this, mthdArgs);
        };
    }

};

module.exports = Extends;