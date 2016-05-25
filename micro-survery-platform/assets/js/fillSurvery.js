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

    //add event input
    var inputNodes = document.querySelectorAll('#question-list .question-item input');
    [].forEach.call(inputNodes, function(inputNode) {
        inputNode.addEventListener('change', function() {
            var btnSubmitNode = document.querySelector('#btnSubmit');
            if (canSubmit()) {
                btnSubmitNode.classList.remove('btn-disable');
            }
        })
    });

    //submit event
    var hasSubmit;
    document.querySelector('#btnSubmit').addEventListener('click', function() {
        if (hasSubmit) {
            return;
        }
        var questionNodes = document.querySelectorAll('#question-list .question-item');
        var answer = [];
        if (!canSubmit()) {
            return;
        }
        answer = [].map.call(questionNodes, function(questionNode) {
            var type = questionNode.getAttribute('data-type');
            if (type === 'single') {
                return {
                    type: type,
                    value: questionNode.querySelector('input[type=radio]:checked').value
                }
            } else if (type === 'multiple') {
                return {
                    type: type,
                    value: [].map.call(questionNode.querySelectorAll('input[type=checkbox]:checked'), function(checkboxNode) {
                        return checkboxNode.value;
                    })
                }
            } else {
                return {
                    type: type,
                    value: questionNode.querySelector('textarea').value
                }
            }
        });
        Survery.addAnswer(survery.id, answer);
        hasSubmit = true;
        document.querySelector('#btnSubmit').style.background = "#b3aeae";
        TipBox.alertMessage('提交成功，感谢您参与本次调查');
        //remove input and add checked
        [].forEach.call(questionNodes, function(questionNode) {
            var inputNodes = questionNode.querySelectorAll('label[data-type^=input] input');
            [].forEach.call(inputNodes, function(inputNode) {
                inputNode.disabled = true;
            });
        });

    });

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
            selectionListNode = document.createElement('textarea');
            selectionListNode.className = 'textarea';
        } else {
            selectionListNode = document.createElement('ul');
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
            '    <input type="radio" name="question' + index + '" value="' + selection + '"/>' +
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
            '    <input type="checkbox" name="question' + index + '" value="' + selection + '"/>' +
            '    <span class="input-frame">' +
            '        <span class="normal-box"></span>' +
            '        <span class="checked-box"></span>' +
            '    </span>' +
            '    <span class="label">' + selection + '</span>' +
            '</label>';
        liNode.innerHTML = selectionContent;
        return liNode;
    }

    function canSubmit() {
        var questionNodes = document.querySelectorAll('#question-list .question-item');
        var canSubmit = [].every.call(questionNodes, function(questionNode) {
            var type = questionNode.getAttribute('data-type');
            if (type !== 'text') {
                return !!questionNode.querySelectorAll('input:checked').length;
            } else {
                //问答题可以暂时不填写提交
                //return !!questionNode.querySelector('input[type=textarea]').value;
                return true;
            }
        });
        return canSubmit;
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
