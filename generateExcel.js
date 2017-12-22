// var Excel = require('exceljs');
// const path = require('path');

// var fs = require('fs');
// var pdf = require('html-pdf');
// var html = fs.readFileSync("E:\\Share\\xbrlFiles\\commenthtml.html", 'utf8');
// pdf.create(html).toFile('E:\\Share\\xbrlFiles\\commenthtml.pdf', function(err, res) {
//   if (err) return console.log(err);
//   console.log(res); // { filename: '/app/businesscard.pdf' }
// });



// function colorSheetCell(exclCell,color){
//     exclCell.border = {
//         top: {style:'double', color: {argb:'FF00FF00'}},
//         left: {style:'double', color: {argb:'FF00FF00'}},
//         bottom: {style:'double', color: {argb:'FF00FF00'}},
//         right: {style:'double', color: {argb:'FF00FF00'}}
//     };
// }

// var workbook = new Excel.Workbook();

// workbook.xlsx.readFile(path.join("E:\\Share\\DPC-Docs\\Doc_59f30468633f902580a8fc71","Import/Excel Output (Current Version).xlsx")
// .then(function() {         
//     workbook.eachSheet(function(ws, sheetId) {
//         ws.getCell("B9").style = {font : {
//             name: 'Arial Black',
//             color: { argb: 'FF00FF00' },
//             family: 2,
//             size: 14,
//             italic: true
//      }};
//     }); 
//     workbook.xlsx.writeFile("E:\\Share\\filename.xlsx").then(function() {console.log("wrote excel");});
// });



var moment = require('moment');
var date = moment('Nine months ended June 30, 2017');
console.log(date.format("MMM. DD, YYYY"));
return;

// console.log(moment().tz("America/Chicago").format("DD/MM/YYYY hh:mm A"));
// console.log(moment().tz("Asia/Kolkata").format("DD MMM YYYY HH:mm"));

var mapExcel = require('./mapExcel');
const mockChanges = require('./mock-html.js').changes;
mapExcel.getExcelComments();

// var sanitizeFileName = require("sanitize-filename");
// console.log(sanitizeFileName(`Updated rendering 4/10/2017 /, ?, <, >, \, :, *, |, and "`,{replacement:"-"}));

// var str = `Updated rendering 4/10/2017 /, ?, <, >, \, :, *, |, and "`;
// console.log(str.replace(/,/g,''))
//console.log(/[/?<>\\:*|"]/.test(str));


