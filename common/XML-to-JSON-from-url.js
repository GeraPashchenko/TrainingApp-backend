// const parseString = require('xml2js').parseString;
// const axios = require('axios');
// const https = require('https');
//
// module.exports.xmlToJson = (url) => {
//     return new Promise((resolve, reject)=>{
//         https.get(url, res => {
//             let xml = '';
//
//             res.on('data', function (chunk) {
//                 xml += chunk;
//             });
//
//             res.on('error', function (e) {
//                 reject(e);
//             });
//
//             res.on('timeout', function (e) {
//                 reject(e);
//             });
//
//             res.on('end', function () {
//                 parseString(xml, function (err, result) {
//                     resolve(result.Return.ReturnData);
//                 });
//             });
//
//         });
//     });
// }