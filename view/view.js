const fs = require('fs');
const path = require('path');

module.exports =  {
    load: load,
    render: render
}

function load(directory){
    // load the directory of templates into cache
}

function render(template, params) {
    if(typeof params === "function"){
        //callback is returned as second parameter
        callback = params;
        params = {};
    }


        var html = cache[template].toString().replace(/<%=(.*)%>/g, function(match, code) {
            code = code.replace(/render\((.+)\)/.g, function(match, data){
                render();
            });
            return ('var params = ' + JSON.stringify(params) + ';' + code);
        });


        callback(err, html);
}