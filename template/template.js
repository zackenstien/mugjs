let template = function(str, items) {
    Object.keys(items).forEach(key => {
        str = str.replace(new RegExp('{{[\s]*' + key + '[\s]*}}', 'g'), items[key]);
    });

    return str;
}

module.exports = template;