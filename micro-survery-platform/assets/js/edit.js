(function(document) {
    var newQuestionBox = document.querySelector('#new-question-box');
    var addNewSlectionNode = document.querySelector('.new-selection-btn');

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
        clearNewQuestionBox();
        console.log(newQuestion);
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
            if(type !== 'text'){
	            addSelection(type);
	            addSelection(type);
	            addSelection(type);
	            addSelection(type);
            }
            newQuestionBox.classList.add('show');
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

})(document, Survery, TipBox, newQuestionBox);
