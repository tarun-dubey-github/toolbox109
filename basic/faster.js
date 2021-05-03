    var lastClick = new Date().getTime()
    function getRandomInt(min,max) {
        let number = Math.floor(Math.random() * max);
        return number<min?min:number;
    }

    function attachEvents(){
            $( "DIV.ACTIVE .RESULT" ).on('keypress',function(e) {
                if(e.which == 13) {
                    submitAction()
                }
            })
    }

    function resetQuestion(){
        $('DIV.ACTIVE .LHS').text(getRandomInt(2,10))
        $('DIV.ACTIVE .RHS').text(getRandomInt(2,20))
        $('DIV.ACTIVE .CORRECTION').text("")
        $('DIV.ACTIVE .TIMER').text("")
        $('DIV.ACTIVE .RESULT').val("").focus()
    }

    function submitAction(){
        var currClick = new Date().getTime();
        let timeTaken = Math.ceil((currClick - lastClick)/1000);
        $('DIV.ACTIVE .TIMER').text(timeTaken+' seconds')
        lastClick=currClick
        error = false;
        var answeVal = eval( $('DIV.ACTIVE .LHS').text()+" "+ $('DIV.ACTIVE .OPERATOR').text().replace('x',"*")+" "+ $('DIV.ACTIVE .RHS').text())
        if( eval($('DIV.ACTIVE .RESULT').val() == answeVal)){
            $('DIV.ACTIVE .CORRECTION').text("OK")
            $('TABLE.REPORT .OK').text($('TABLE.REPORT .OK').text()/1+1)
        }else{
            error=true;
            $('DIV.ACTIVE .CORRECTION').text(answeVal)
            $('TABLE.REPORT .ERR').text($('TABLE.REPORT .ERR').text()/1+1)
        }
        $('TABLE.REPORT .TOTAL').text($('TABLE.REPORT .TOTAL').text()/1+Math.floor(timeTaken))
        $('TABLE.REPORT .AVG').text( ($('TABLE.REPORT .TOTAL').text()/1)/( $('TABLE.REPORT .ERR').text()/1 +  $('TABLE.REPORT .OK').text()/1))

        var newReportRecord = $('DIV.ACTIVE .QUESTION').clone().insertAfter($('TABLE.REPORT .STAT'))
        $(newReportRecord).addClass(error?'err':'ok')
        resetQuestion();
    }