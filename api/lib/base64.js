module.exports.base64encode = (data) => {
    const stringified = JSON.stringify(data);
    return Buffer.from(stringified).toString('base64');
}

module.exports.base64decode = (data) => {
    const ascii = Buffer.from(data, 'base64').toString('ascii');
    return JSON.parse(ascii);
}