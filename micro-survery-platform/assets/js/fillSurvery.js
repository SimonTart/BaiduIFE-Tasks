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

    //title block
    var titleNode = document.querySelector('#title');
    var surveryTitleNode = document.querySelector('#survery-title');
    var surveryTitleInputNode = document.querySelector('#survery-title-input');

    surveryTitleNode.addEventListener('click', function() {
        titleNode.classList.add('edit');
        surveryTitleInputNode.focus();
    });


    function renderQuestion(question, index) {
        var questionNode = document.createElement('div');
        questionNode.className = 'question-item';
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
                selectionListNode.appendChild(renderSelection(selection));
            });
        }
        var toolBarNode = questionNode.querySelector('.tool-bar');
        questionNode.insertBefore(selectionListNode, toolBarNode);

        return questionNode;
    }

    function renderSingleSelection(selection) {
        var liNode = document.createElement('li');
        var selectionContent = '<div class="radio-box">' +
            '    <span class="radio-frame">' +
            '        <span class="normal-radio"></span>' +
            '    </span>' +
            '    <span class="radio-label">' + selection + '</span>' +
            '</div>';
        liNode.innerHTML = selectionContent;
        return liNode;
    }

    function renderMultipleSelection(selection) {
        var liNode = document.createElement('li');
        var selectionContent = '<div class="check-box">' +
            '    <span class="check-frame">' +
            '        <span class="normal-box"></span>' +
            '    </span>' +
            '    <span class="checkbox-label">' + selection + '</span>' +
            '</div>';
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
