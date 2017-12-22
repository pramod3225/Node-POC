(function($) {

$.fn.getHeaderArr = function(){
    var cellIndex = -1;
    var siblingCells = this.closest('tr').find('td');
    for (var i = 0; i < siblingCells.length; i++) {
        var $cell = $(siblingCells[i]);       
        var colspan = $cell.attr('colspan')? parseInt($cell.attr('colspan')):1;       
        cellIndex = cellIndex + colspan;
        if ($cell.is(this)) break;        
    }
    var tableRows = this.closest('table').find('tr');
    var tableHeaderArray = [];
    for (var i = 0; i < tableRows.length; i++) {
        var hCellIndex = -1, hCellPrevIndex=-1;
        if($('td',tableRows[i]).first().text().trim()) break;
        var $row = $(tableRows[i]);   
        if($row.text().trim()=="") continue;    

        var cells = $row.find('td');
        for (var j = 0; j < cells.length; j++) {
            var $cell = $(cells[j]);
            var colspan = $cell.attr('colspan')? parseInt($cell.attr('colspan')):1;
            hCellPrevIndex = hCellIndex;
            hCellIndex = hCellIndex + colspan;
            if (hCellPrevIndex < cellIndex && cellIndex <= hCellIndex){
                tableHeaderArray.push($cell.text().trim());
                break;
            }
            
        }

    }
    return tableHeaderArray;
}

$.fn.getNonColSpanIndex = function() {
    if(! $(this).is('td') && ! $(this).is('th'))
        return -1;

    var allCells = this.parent('tr').children();
    var normalIndex = allCells.index(this);
    var nonColSpanIndex = 0;

    allCells.each(
        function(i, item)
        {
            if(i == normalIndex)
                return false;

            var colspan = $(this).attr('colspan');
            colspan = colspan ? parseInt(colspan) : 1;
            nonColSpanIndex += colspan;
        }
    );

    return nonColSpanIndex;
};


})(jQuery);

