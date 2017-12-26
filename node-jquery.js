const moment = require("moment");
const mockHtml = require('./mock-html.js')


// const dom = new jsdom.JSDOM();
// const $ = require('jQuery')(dom.window);

const cheerio = require('cheerio')
const $ = cheerio.load(mockHtml.getHTML());

$.fn.getCellByColSpanIndex = function(index) {
    var retCell         = null,
        nonColSpanIndex = 0;
    $(this).each(function(i,item){        
        var colspan = $(this).attr('colspan');
        colspan = colspan ? parseInt(colspan) : 1;
        nonColSpanIndex += colspan;
        if(nonColSpanIndex >= index+1) {
            retCell = item;
            return false;
        }
    });
    return $(retCell);
};

$.fn.getHeaderArr = function(){
    var cellIndex = -1;
    var siblingCells = this.closest('tr').find('td');
    for (var i = 0; i < siblingCells.length; i++) {
        var $cell = $(siblingCells[i]);       
        var tarColspan = $cell.attr('colspan')? parseInt($cell.attr('colspan')):1;       
        cellIndex = cellIndex + tarColspan;
        if ($cell.is(this)) break;        
    }
    if (cellIndex < 3) return false;
    var tableRows = this.closest('table').find('tr');
    var tableHeaderArray = [];
    
    for (var i = 0; i < tableRows.length; i++) {  
        var $row = $(tableRows[i]);            
        if($('td',$row).first().text().trim()) break;           
        if($row.text().trim()=="") continue;
        var cells = $row.find('td');
        var hCellIndex = -1, hCellPrevIndex=-1, tableHeader = [];  
        for (var j = 0; j < cells.length; j++) {
            var $cell = $(cells[j]);
            var colspan = $cell.attr('colspan')? parseInt($cell.attr('colspan')):1;
            hCellPrevIndex = hCellIndex;
            hCellIndex = hCellIndex + colspan;
            if ($cell.text().trim() && hCellPrevIndex < cellIndex && cellIndex <= hCellIndex + tarColspan - 1){                
                tableHeader.push({cellText:$cell.text().trim(),pi:hCellPrevIndex,ci:hCellIndex});
                tableHeaderArray.push({cellText:$cell.text().trim(),pi:hCellPrevIndex,ci:hCellIndex});
            }          
        }
        
    }
    var finalObj = {};
    for (let l = 0; l < tableHeaderArray.length; l++) {                
        const cell = tableHeaderArray[l];
        tableHeader.forEach(el => {
            if((cell.pi < el.pi && cell.ci >= el.ci) ||(cell.pi == el.pi && cell.ci == el.ci)){
                if(finalObj[el.ci]){                    
                    finalObj[el.ci].push(cell.cellText)
                }else{
                    finalObj[el.ci] = [cell.cellText]
                }
            }
        });
        
    } 
    return finalObj;
}

$.fn.getNonColSpanIndex = function() {
    if(! $(this).is('td') && ! $(this).is('th'))
        return -1;

    var allCells = this.parent('tr').children();
    var normalIndex = allCells.index(this);
    var nonColSpanIndex = 0;

    allCells.each(function(i, item){
            if(i == normalIndex)
                return false;

            var colspan = $(this).attr('colspan');
            colspan = colspan ? parseInt(colspan) : 1;
            nonColSpanIndex += colspan;
        }
    );

    return nonColSpanIndex;
};

var getPossibleContextNames = function (startDate, endDate) {
    var possibleContextNames = [];
    var numToText = {
        "" :"",       
        1: 'one',
        2: 'two',
        3: 'three',
        4: 'four',
        5: 'five',
        6: 'six',
        7: 'seven',
        8: 'eight',
        9: 'nine',
        10: 'ten',
        11: 'eleven'
       
    };
    if (!endDate) {
        possibleContextNames.push(moment(startDate).format('MMMM DD, YYYY').toLowerCase());
        possibleContextNames.push(moment(startDate).format('MMMM D, YYYY').toLowerCase());
    }
    if (startDate && endDate) {
        var diff = parseInt(moment(startDate).diff(moment(endDate), 'months', true));
        diff = Math.abs(Math.round(diff));
        if(diff < 11){
            possibleContextNames.push(diff +' months ended '+moment(endDate).format('MMMM D, YYYY').toLowerCase());
            possibleContextNames.push(diff +' months ended '+moment(endDate).format('MMMM DD, YYYY').toLowerCase());  
            possibleContextNames.push(numToText[diff] +' months ended '+moment(endDate).format('MMMM D, YYYY').toLowerCase());           
        }else{
            var diffInYear = Math.round(diff/12);
            diffInYear = diffInYear===1? "":diffInYear;
            possibleContextNames.push(diffInYear +' year ended '+moment(endDate).format('MMMM D, YYYY').toLowerCase());
            possibleContextNames.push(diffInYear +' year ended '+moment(endDate).format('MMMM DD, YYYY').toLowerCase());  
            possibleContextNames.push(numToText[diffInYear] +' year ended '+moment(endDate).format('MMMM D, YYYY').toLowerCase());
        }
        
        
    }
    console.log(possibleContextNames);
}
const Small = {
    'zero': 0,
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9,
    'ten': 10,
    'eleven': 11,
    'twelve': 12,
    'thirteen': 13,
    'fourteen': 14,
    'fifteen': 15,
    'sixteen': 16,
    'seventeen': 17,
    'eighteen': 18,
    'nineteen': 19,
    'twenty': 20,
    'thirty': 30,
    'forty': 40,
    'fifty': 50,
    'sixty': 60,
    'seventy': 70,
    'eighty': 80,
    'ninety': 90
};
const Magnitude = {
    'thousand':     1000,
    'million':      1000000,
    'billion':      1000000000,
    'trillion':     1000000000000,
    'quadrillion':  1000000000000000,
    'quintillion':  1000000000000000000,
    'sextillion':   1000000000000000000000,
    'septillion':   1000000000000000000000000,
    'octillion':    1000000000000000000000000000,
    'nonillion':    1000000000000000000000000000000,
    'decillion':    1000000000000000000000000000000000,
};
var text2num = function (s) {
    a = s.toString().split(/[\s-]+/);
    n = 0;
    g = 0;
    a.forEach(function (w) {
        var x = Small[w];
        if (x != null) {
            g = g + x;
        }
        else if (w == "hundred") {
            g = g * 100;
        }
        else {
            x = Magnitude[w];
            if (x != null) {
                n = n + g * x
                g = 0;
            }
            else {
                console.log("Unknown number: " + w);
            }
        }
    });
    return n + g;
}


console.log($('td#testCell1').getHeaderArr());
//console.log($('td#2').getHeaderArr());

// var str  = " June 30, 2017";
// var secDateRegx = /((One|Three|Six|Nine|twelve|1|3|6|9|12)\sMonths\sended\s?)?(january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\.?\s?(3[01]|[12]\d|[1-9])\,?\s?(20[1-9][1-9])?/gi;
// var secPeriodRegx =  /((One|Three|Six|Nine|twelve|1|3|6|9|12)\sMonths\sended\s?)/gi
// var match = secDateRegx.exec(str);
// console.log(match);
