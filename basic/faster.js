

function attachEvents() {
    getPanelBoxForAnswer().on('keypress', function (e) {
        if (e.which === 13) {
            submitAction()
        }
    })
}

function getPanelBoxForOperand1() {
    return $('TABLE.ACTIVE .LHS');
}

function getPanelBoxForOperand2() {
    return $('TABLE.ACTIVE .RHS');
}

function getPanelBoxForOperator() {
    return $('TABLE.ACTIVE .OPERATOR');
}

function getPanelCorrectionBox() {
    return $('TABLE.ACTIVE .CORRECTION');
}

function getPanelTimerBox() {
    return $('TABLE.ACTIVE .TIMER');
}
function getPanelOperatorBox() {
    return $('TABLE.ACTIVE .OPERATOR');
}

function resetQuestion() {
    getPanelBoxForOperand1().text(getRandomInt(2, 10))
    getPanelBoxForOperand2().text(getRandomInt(2, 20))
    getPanelBoxForOperator().text("x")
    getPanelCorrectionBox().text("")
    getPanelTimerBox().text("")
    getPanelBoxForAnswer().val("").focus()
}

function submitAction() {
    let timeTaken = timeSinceLastCheck();
    getPanelTimerBox().text(`${timeTaken} sec`)
    let answer = eval(`${(getOperand1Value())} ${(getOperatorValue()) }  ${(getOperand2Value())}`)
    let isCorrect = eval(`${(getAnswerValue())} == ${answer}`);
    if (isCorrect) {
        getPanelCorrectionBox().text("OK")
        getPanelCounterForOk().text(getOkCountAsNum() + 1)
    } else {
        getPanelCorrectionBox().text(answer)
        getPanelCountersForErrors().text(getErrorCountAsNum() + 1)
    }
    getPanelCounterForTotalTime().text(getTotalTimeAsNum() + Math.floor(timeTaken))
    getPanelCounterForAvgTime().text(calculateAvgTime())

    let newReportRecord = $('TABLE.ACTIVE .QUESTION').clone().insertAfter($('TABLE.REPORT .STAT'))
    $(newReportRecord ).addClass(isCorrect ? 'ok' : 'err')
    $(newReportRecord).find('.hidden').removeClass('hidden')
    resetQuestion();
}


function timeSinceLastCheck() {
    let currClick = new Date().getTime();
    return Math.ceil((currClick - lastClick) / 1000);
    lastClick = currClick
}


function getPanelCounterForOk() {
    return $('TABLE.REPORT .OK');
}

function getPanelCountersForErrors() {
    return $('TABLE.REPORT .ERR');
}

function getPanelCounterForTotalTime() {
    return $('TABLE.REPORT .TOTAL');
}

function getPanelCounterForAvgTime() {
    return $('TABLE.REPORT .AVG');
}

function calculateAvgTime() {
    return getTotalTimeAsNum() / (getErrorCountAsNum() + getOkCountAsNum());
}

function getTotalTimeAsNum() {
    return getPanelCounterForTotalTime().text() / 1;
}

function getErrorCountAsNum() {
    return getPanelCountersForErrors().text() / 1;
}

function getOkCountAsNum() {
    return getPanelCounterForOk().text() / 1;
}

function getOperatorValue() {
    return getPanelOperatorBox().text().replace('x', "*");
}

function getOperand1Value() {
    return getPanelBoxForOperand1().text();
}

function getOperand2Value() {
    return getPanelBoxForOperand2().text();
}

function getAnswerValue() {
    return getPanelBoxForAnswer().val();
}

function getRandomInt(min, max) {
    let number = Math.floor(Math.random() * max);
    return number < min ? min : number;
}

function getPanelBoxForAnswer() {
    return $("TABLE.ACTIVE .RESULT");
}
let lastClick = new Date().getTime()
