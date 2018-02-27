const fs = require('fs');
const path = require('path');

module.exports =  {
    render: render
}

function render(template, params) {
    if(typeof params === "function"){
        //callback is returned as second parameter
        callback = params;
        params = {};
    }

    

    fs.readfile(path.join('veiw', 'templates', template), function(err, data){
        if(err) return callback(err);

        var html = data.toString().replace(/<%=(.*)%>/g, function(match, p1) {
            return eval(p1);
        });


        callback(err, html);
    });
}