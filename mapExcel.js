var Excel = require('exceljs');
const fs = require('fs-extra');
const cheerio = require('cheerio');
const path = require('path');
const currFolder = "E:\\Share\\DPC-Docs\\Doc_5a0bfa7a4e6cf1232dbbb5ef";
const excelHeaderRowNumber = 7;


function colorSheetCell(exclCell, color) {
    exclCell.style = {
        fill: {
            type: 'gradient',
            gradient: 'angle',
            degree: 0,
            stops: [
                { position: 0, color: { argb: color } },
                { position: 1, color: { argb: color } }
            ]
        }
    }
}

function writeChangeToExcel($,key, change,workbook,roleHtmlTableMapping,roleSheetIdMapping){
    var htmlCellId = `#${change.XBRLID}_xv_${change.ContextRef}_xv_${change.UnitRef}`;
    console.log(key);
    change.Roles.forEach(function(role){
        role = role.toLowerCase();
        var currhtmlcell = $(htmlCellId,roleHtmlTableMapping[role]);
        var rowNo = $('tr',roleHtmlTableMapping[role]).not('tr.headerRow').index(currhtmlcell.closest('tr'));
        var colNo = currhtmlcell.closest('tr').children('td').not('td.xbrl-review').index(currhtmlcell);
        
        if(rowNo >= 0 && colNo >= 0) { 
            rowNo = rowNo+ excelHeaderRowNumber; 
            colNo++;           
            var ws = workbook.getWorksheet(roleSheetIdMapping[role]); 
            colorSheetCell(ws.getRow(rowNo).getCell(colNo),"FF00FFF7"); 
            //console.log(ws.getRow(rowNo).getCell(colNo).text.replace('$','').trim()+"=="+currhtmlcell.text().replace('$','').trim()+"===>>"+)
            // if(roleCnd[roleSheetIdMapping[role]]) roleCnd[roleSheetIdMapping[role]].push([rowNo,colNo])
            // else roleCnd[roleSheetIdMapping[role]] = [[rowNo,colNo]]
        }
        else{     
                
            console.log(`(${rowNo},${colNo})${htmlCellId}  role= ${roleHtmlTableMapping[role]}`);
            //console.log(change);
            
        }        
        //console.log(`${rowNo}=>${currhtmlcell.text()}  tableID=${roleHtmlTableMapping[role]}   htmlCellId= ${htmlCellId}`);
    });
}

exports.getExcelComments = function () {
    var workbook = new Excel.Workbook();
    fs.readdir(path.join(currFolder, 'Import'), function (err, files) {
        var excelFile = files.find(f => f.endsWith('.xlsx'));
        if (excelFile){
            var excelComments = [];
            workbook.xlsx.readFile(path.join(currFolder, 'Import', excelFile))
            .then(function () {
                //var exclRoleSheetIdMapping = {},roleSheetIdMapping ={},roleHtmlTableMapping = {};           
                workbook.eachSheet(function (ws, sheetId) {
                    //exclRoleSheetIdMapping[ws.getCell('A6').text.toLowerCase() + ws.getCell('B6').text.toLowerCase()] = sheetId;                              
                    ws.getRow(5).eachCell(function (cell, colNumber) {
                        if (cell.text === "Comments") {
                            ws.getColumn(colNumber).eachCell(function (icell, rowNumber) {
                                if (rowNumber > 5 && icell.text !== "") {
                                    excelComments.push({
                                        rowNumber : rowNumber,
                                        roleName : ws.getCell('A6').text.toLowerCase() + ws.getCell('B6').text.toLowerCase(),
                                        comment : icell.text,
                                        XBRLID : ws.getRow(rowNumber).getCell(colNumber+2).text
                                    });
                                    
                                }
                            });
                        }
                    });
                });
                console.log(excelComments);
                // fs.readFile(path.join(currFolder, "/SecReport/AllReports.htm"), { encoding: 'utf8' }, function (err, data) {
                //     if (err) console.log(err);
                //     else {
                //         $ = cheerio.load(data);
                //         $('table.report').each(function () {
                //             var splits = $(this).attr('data-uri').toLowerCase().split('/');
                //             roleSheetIdMapping[splits[splits.length - 1]] = exclRoleSheetIdMapping[$('tr.headerRow th', this).eq(1).text().toLowerCase()];
                //             roleHtmlTableMapping[splits[splits.length - 1]] = "#" + $(this).attr('id');
                //         });
                //     }
                // });
            

            });
        }
    });

}
