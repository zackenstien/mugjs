const template = require('./template'),
      fs = require('fs'),
      path = require('path');

let View = function (name, context = {}) {
    /* Get the file path of the requested view */
    let fp = path.join(__dirname, '../views', name + '.trifle.html');
    
    /* Read the view */
    let fileContents = fs.readFileSync(fp).toString();

    /* Get the base templated string */
    let base = template(fileContents, context);

    /* Get a list of views */
    let files = fs.readdirSync(path.join(__dirname, '../views'));

    /* Allow including other views */
    files.forEach(file => {
        let filePath = path.join(__dirname, '../views', file);
        if (filePath !== fp) {
            base = base.replace(new RegExp('{{[\s]*view:' + path.basename(file, '.trifle.html') + '[\s]*}}', 'g'), function() { return View(path.basename(file, '.trifle.html'), context) });
        }
    });

    //let test = base.replace(regexp, function(match, p1, offset, str, groups) {
    //    console.log(p1);
    //});

    return base;
}

/* Expose API */
module.exports = View;