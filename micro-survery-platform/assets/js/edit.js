(function(document) {
    var newQuestionBox = document.querySelector('#new-question-box');
    var addNewSlectionNode = document.querySelector('.new-selection-btn');
    var addNewQuestionCallback = null;
    addNewSlectionNode.addEventListener('click', function() {
        addSelection('single');
    });

    //cancel x click
    var iconCancel = newQuestionBox.querySelector('.icon-cancel');
    var btnCancel = newQuestionBox.querySelector('.btn-cancel');
    var btnComfirm = newQuestionBox.querySelector('.btn-confirm');

    iconCancel.addEventListener('click', clearNewQuestionBox);
    btnCancel.addEventListener('click', clearNewQuestionBox);
    btnComfirm.addEventListener('click', function() {
        var newQuestion = getInputNewQuestion();
        if (addNewQuestionCallback) {
            addNewQuestionCallback(newQuestion);
        }
        clearNewQuestionBox();
    });

    function clearNewQuestionBox() {
        var newQuestionBox = document.querySelector('#new-question-box');
        var selectionListNode = document.querySelector('#new-question-box .selections-list');
        var newSectionListNode = document.createElement('ul');
        var insertBeforeNode = document.querySelector('#new-question-box .new-selection-btn');
        var parentNode = selectionListNode.parentNode;
        var titleEditNode = document.querySelector('#new-question-box .title-input');

        newQuestionBox.classList.remove('show');

        newSectionListNode.className = 'selections-list';
        parentNode.removeChild(selectionListNode);
        parentNode.insertBefore(newSectionListNode, insertBeforeNode);

        titleEditNode.value = '';
    }

    function getInputNewQuestion() {
        var newSectionListNode = document.createElement('ul');
        var titleEditNode = document.querySelector('#new-question-box .title-input');
        var selectionItemNodes = document.querySelectorAll('#new-question-box .selections-list>li');
        var newQuestionBox = document.querySelector('#new-question-box');

        var type = newQuestionBox.getAttribute('data-type');
        var selections = [].map.call(selectionItemNodes, function(liNode) {
            return liNode.querySelector('input').value;
        });
        var title = titleEditNode.value;
        return {
            title: title,
            selections: selections,
            type: type
        };
    }

    function addSelection(type) {
        var selectionListNode = newQuestionBox.querySelector('.selections-list');
        var index = selectionListNode.querySelectorAll('li').length || 0;
        var selectionItem = type === 'single' ? renderSingleSelection(index) : renderMultipleSelection(index);
        selectionListNode.appendChild(selectionItem);
    };

    function renderSingleSelection(index) {
        var liNode = document.createElement('li');
        var selectionContent = '<div class="radio-box">' +
            '        <span class="radio-frame">' +
            '           <span class="normal-radio"></span>' +
            '        </span>' +
            '        <input type="text" class="line-input" value="选项' + (index + 1) + '">' +
            '    </div>' +
            '<div class="operates">' +
            '    <i class="icon-up"></i>' +
            '    <i class="icon-down"></i>' +
            '    <i class="icon-delete"></i>' +
            '</div>';

        liNode.innerHTML = selectionContent;
        liNode.setAttribute('data-index', index);
        bindSelectionEvent(liNode);
        return liNode;
    };

    function bindSelectionEvent(liNode) {
        var iconUp = liNode.querySelector('.icon-up');
        var iconDown = liNode.querySelector('.icon-down');
        var iconDelete = liNode.querySelector('.icon-delete');
        iconUp.addEventListener('click', function() {
            var liNode = this.parentNode.parentNode;
            var selectionListNode = newQuestionBox.querySelector('.selections-list');
            var selectionItemNodes = selectionListNode.querySelectorAll('li');
            var index = [].indexOf.call(selectionItemNodes, liNode);
            if (index <= 0) {
                return;
            }
            selectionListNode.insertBefore(liNode, selectionItemNodes[index - 1]);
        });
        iconDown.addEventListener('click', function() {
            var liNode = this.parentNode.parentNode;
            var selectionListNode = newQuestionBox.querySelector('.selections-list');
            var selectionItemNodes = selectionListNode.querySelectorAll('li');
            var index = [].indexOf.call(selectionItemNodes, liNode);
            if (index >= selectionItemNodes.length - 1) {
                return;
            }
            selectionListNode.insertBefore(liNode, selectionItemNodes[index + 1].nextSibling);
        });
        iconDelete.addEventListener('click', function() {
            var liNode = this.parentNode.parentNode;
            var selectionListNode = newQuestionBox.querySelector('.selections-list');
            selectionListNode.removeChild(liNode);
        });
    }

    function renderMultipleSelection(index) {
        var liNode = document.createElement('li');
        var selectionContent = '<div class="check-box">' +
            '        <span class="check-frame">' +
            '           <span class="normal-box"></span>' +
            '        </span>' +
            '        <input type="text" class="line-input" value="选项' + (index + 1) + '">' +
            '    </div>' +
            '<div class="operates">' +
            '    <i class="icon-up"></i>' +
            '    <i class="icon-down"></i>' +
            '    <i class="icon-delete"></i>' +
            '</div>';

        liNode.innerHTML = selectionContent;
        liNode.setAttribute('data-index', index);
        bindSelectionEvent(liNode);
        return liNode;
    };
    window.newQuestionBox = {
        show: function(type) {
            var newQuestionBox = document.querySelector('#new-question-box');
            newQuestionBox.setAttribute('data-type', type);
            if (type !== 'text') {
                addSelection(type);
                addSelection(type);
                addSelection(type);
                addSelection(type);
            }
            newQuestionBox.classList.add('show');
        },
        afterNew: function(callback) {
            addNewQuestionCallback = callback;
        }
    }
})(document);






(function(document, Survery, TipBox, newQuestionBox) {
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
    var questions = survery.questions || [];
    // init page


    //title block
    var titleNode = document.querySelector('#title');
    var surveryTitleNode = document.querySelector('#survery-title');
    var surveryTitleInputNode = document.querySelector('#survery-title-input');

    //init title
    surveryTitleNode.textContent = survery.title;
    surveryTitleInputNode.value = survery.title;

    surveryTitleNode.addEventListener('click', function() {
        titleNode.classList.add('edit');
        surveryTitleInputNode.focus();
    });

    surveryTitleInputNode.addEventListener('blur', function() {
        var titleValue = this.value.trim();
        if (!titleValue) {
            TipBox.alertMessage('调查问卷标题不能为空', function() {
                surveryTitleInputNode.focus();
            }, function() {
                surveryTitleInputNode.focus();
            });
        } else {
            surveryTitleNode.textContent = titleValue;
            Survery.set(survery.id, 'title', titleValue);
            titleNode.classList.remove('edit');
        }
    });

    //add question block btns
    var addQuestionNode = document.querySelector('#add-question');
    var questionTypesNode = document.querySelector('#question-types');
    var btnQuestionTypes = questionTypesNode.querySelectorAll('.btn-qtype');

    addQuestionNode.addEventListener('click', function() {
        questionTypesNode.classList.toggle('adding');
    });

    [].forEach.call(btnQuestionTypes, function(btnNode) {
        btnNode.addEventListener('click', function() {
            questionTypesNode.classList.remove('adding');
            var type = this.getAttribute('data-type');
            newQuestionBox.show(type);
        });
    });

    //after new question
    newQuestionBox.afterNew(function(newQuestion) {
    	var questionListNode = document.querySelector('#question-list');

        questionListNode.appendChild(renderQuestion(newQuestion, questions.length));
        questions.push(newQuestion);
    });

    function renderQuestion(question, index) {
        var questionNode = document.createElement('div');
        questionNode.className = 'question-item';
        var questionContent = '<div class="q-title">' +
            '        <span class="q-number">' + (index + 1) + '. </span><span>' + question.title + '</span>' +
            '    </div>' +
            '    <div class="tool-bar">' +
            '        <span>上移</span><span>下移</span><span>复用</span><span>删除</span>' +
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
    };

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
            '    <span class="radio-label">' + selection + '</span>' +
            '</div>';
        liNode.innerHTML = selectionContent;
        return liNode;
    }



})(document, Survery, TipBox, newQuestionBox);
