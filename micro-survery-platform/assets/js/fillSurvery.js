(function(document, Survery, TipBox) {
    //global
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

    if (survery.state !== 1) {
        window.location.href = "./404.html";
        return;
    }
    var questions = survery.questions || [];
    // init page
    initSurvery(survery);



    function renderQuestion(question, index) {
        var questionNode = document.createElement('div');
        var questionIndex = index;
        questionNode.className = 'question-item';
        questionNode.setAttribute('data-type', question.type);
        var questionContent = '<div class="q-title">' +
            '        <span class="q-number">' + (index + 1) + '. </span><span>' + question.title + '</span>' +
            '    </div>';

        questionNode.innerHTML = questionContent;

        var selectionListNode;
        if (question.type === 'text') {
            selectionListNode = document.createElement('div');
            selectionListNode.className = 'textarea';
        } else {
            selectionListNode = document.createElement('li');
            selectionListNode.className = 'answer-list';
            var renderSelection = question.type === 'single' ? renderSingleSelection : renderMultipleSelection;
            question.selections.forEach(function(selection) {
                selectionListNode.appendChild(renderSelection(selection, questionIndex));
            });
        }
        var toolBarNode = questionNode.querySelector('.tool-bar');
        questionNode.insertBefore(selectionListNode, toolBarNode);

        return questionNode;
    }

    function renderSingleSelection(selection, index) {
        var liNode = document.createElement('li');
        var selectionContent = '<label data-type="input-radio">' +
            '    <input type="radio" name="question' + index + '"/>' +
            '    <span class="input-frame">' +
            '        <span class="normal-box"></span>' +
            '        <span class="checked-box"></span>' +
            '    </span>' +
            '    <span class="label">' + selection + '</span>' +
            '</label>';
        liNode.innerHTML = selectionContent;
        return liNode;
    }

    function renderMultipleSelection(selection, index) {
        var liNode = document.createElement('li');
        var selectionContent = '<label data-type="input-checkbox">' +
            '    <input type="checkbox" name="question' + index + '"/>' +
            '    <span class="input-frame">' +
            '        <span class="normal-box"></span>' +
            '        <span class="checked-box"></span>' +
            '    </span>' +
            '    <span class="label">' + selection + '</span>' +
            '</label>';
        liNode.innerHTML = selectionContent;
        return liNode;
    }

    function initSurvery(survery) {
        var surveryTitleNode = document.querySelector('#survery-title');

        //init title
        surveryTitleNode.textContent = survery.title;

        var questionsFragment = document.createDocumentFragment();
        var questions = survery.questions || [];

        questions.forEach(function(question, index) {
            questionsFragment.appendChild(renderQuestion(question, index));
        });
        document.querySelector('#question-list').appendChild(questionsFragment);
    }
})(document, Survery, TipBox);
