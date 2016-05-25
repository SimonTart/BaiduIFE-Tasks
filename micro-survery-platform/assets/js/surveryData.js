(function(Survery) {
    var idMatches = window.location.search.match(/\?id=([\d\w]+)/);
    if (!idMatches) {
        window.location.href = "./404.html";
        return;
    }

    var survery = Survery.get(idMatches[1]);

    if (!survery) {
        window.location.href = "./404.html";
        return;
    }

    document.querySelector('#survery-title').textContent = survery.title;
    //init data
    var statistsData = Survery.getStatist(survery.id);
    var statists = statistsData.statists;
    var totalNumber = statists.totalNumber;
    var questionFrament = document.createDocumentFragment();
    survery.questions.forEach(function(question, index) {
        questionFrament.appendChild(renderQuestion(question, statists[index],index));
    });
    document.querySelector("#question-list").appendChild(questionFrament);

    function renderQuestion(question, statist, index) {
        var selectionsStr = question.selections.reduce(function(preStr, selection) {
            return preStr + '<li>' +
                '                <span>' + selection + '</span>' +
                '            </li>';
        }, '');

        var statistStr = question.selections.reduce(function(preStr, selection) {
            var percent = statist[selection] || 0;
            percent = round(percent, 4) * 100 + '%';
            return preStr + '<li>' +
                '	<div class="bar-wrap">' +
                '		<div class="bar" style="width:' + percent + '"></div>' +
                '	</div>' +
                '	<span class="percent">' + percent + '</span>' +
                '</li>';
        }, '');

        var questionNode = document.createElement('div');
        questionNode.className = 'question-item';
        var contentStr = '    <div class="q-body">' +
            '        <div class="q-title">' +
            '            <span class="q-number">'+(index+1)+'. </span>' +
            '            <span>您的性别</span>' +
            '        </div>' +
            '        <ul class="answer-list">' + selectionsStr + '</ul>' +
            '    </div>' +
            '    <div class="q-statist">' +
            '        <p>数据占比</p>' +
            '        <ul class="statist-list">' + statistStr + '</ul>' +
            '    </div>';
        questionNode.innerHTML = contentStr;
        return questionNode;
    }

    //only round decimals
    function round(number, digit) {
        number = parseFloat(number.toFixed(digit));
        number = number * Math.pow(10, digit)
        if (number % 1 >= 0.5) {
            number += 1;
        }
        return parseFloat((number / Math.pow(10, digit)).toFixed(digit));
    }
})(Survery)
