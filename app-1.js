var fs = require('fs');
var async = require('async');

async.map(['doc1.txt','doc2.txt','.'], fs.stat, function(err, results){
    for(var res in results){
    	console.log("File? "+results[res].isFile());
		console.log("Dir? "+results[res].isDirectory());
    }
});

async.filter(['doc1.txt','doc2.txt','.','jamon.txt'], fs.exists, function(results){
    for(var res in results){
    	console.log("Existe: "+results[res]);
    }
});

async.parallel([
    function(callback){
    	console.log("EMPIEZA ONE");
        setTimeout(function(){
        	console.log("ACABA ONE");
            callback(null, 'one');
        }, 2000);
    },
    function(callback){
    	console.log("EMPIEZA TWO");
        setTimeout(function(){
        	console.log("ACABA TWO");
            callback(null, 'two');
        }, 100);
    }
],
// optional callback
function(err, results){
	// the results array will equal ['one','two'] even though
    // the second function had a shorter timeout.
    for(var res in results){
    	console.log("Par1: "+results[res]);
    }
});

// an example using an object instead of an array
async.parallel({
    one: function(callback){
    	console.log("EMPIEZA 1");
        setTimeout(function(){
        	console.log("ACABA 1");
            callback(null, 1);
        }, 2000);
    },
    two: function(callback){
    	console.log("EMPIEZA 2");
        setTimeout(function(){
        	console.log("ACABA 2");
            callback(null, 2);
        }, 100);
    }
},
function(err, results) {
    // results is now equals to: {one: 1, two: 2}
    for(var res in results){
    	console.log("Par2: "+ res + "-"+results[res]);
    }
});

// an example of an error
async.parallel({
    one: function(callback){
    	console.log("EMPIEZA a");
        setTimeout(function(){
        	console.log("ACABA a");
            callback(null, 'a');
        }, 2000);
    },
    two: function(callback){
    	console.log("EMPIEZA b");
        setTimeout(function(){
        	console.log("ACABA b");
            callback(new Error("mi error"), 'b');
        }, 100);
    }
},
function(err, results) {
    if(err){
    	console.error("Par3 - error "+err);
    }else{
    	for(var res in results){
    		console.log("Par3: "+ res + "-"+results[res]);
    	}
    }
});


async.series([
    function(callback){
        // do some stuff ...
        callback(null, 'ser1');
    },
    function(callback){
        // do some more stuff ...
        callback(null, 'ser2');
    }
],
// optional callback
function(err, results){
    // results is now equal to ['one', 'two']
    for(var res in results){
		console.log("Ser1: "+ res + "-"+results[res]);
	}
});


// an example using an object instead of an array
async.series({
    one: function(callback){
        setTimeout(function(){
            callback(null, 'ser3');
        }, 200);
    },
    two: function(callback){
        setTimeout(function(){
            callback(null, 'ser4');
        }, 100);
    }
},
function(err, results) {
    // results is now equal to: {one: 1, two: 2}
    for(var res in results){
		console.log("Ser2: "+ res + "-"+results[res]);
	}
});


async.waterfall([
    function(callback){
        console.log("Water1:")
        callback(null, 'waterOne', 'waterTwo');
    },
    function(arg1, arg2, callback){
    	console.log("Water2:"+ arg1 + "-"+arg2)
        callback(null, 'waterThree');
    },
    function(arg1, callback){
        // arg1 now equals 'three'
        console.log("Water3:"+ arg1)
        callback(null, 'waterDone');
    }
], function (err, result) {
	console.log("Water: "+result);
});