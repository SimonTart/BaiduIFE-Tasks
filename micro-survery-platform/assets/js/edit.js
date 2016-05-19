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
    addQuestionNode.addEventListener('click', function() {
        questionTypesNode.classList.toggle('adding');
    });


})(document, Survery, TipBox);


(function(document) {
    var newQuestionBox = document.querySelector('#new-question-box');
    var addNewSlectionNode = document.querySelector('.new-selection-btn');

    addNewSlectionNode.addEventListener('click', function() {
        addSelection('single');
    });

    init();

    function init() {
        addSelection('single');
        addSelection('single');
        addSelection('single');
        addSelection('single');
    }

    function addSelection(type) {
        var selectionListNode = newQuestionBox.querySelector('.selections-list');
        var index = selectionListNode.querySelectorAll('li').length || 0;
        var selectionItem = type === 'single' ? renderSingleSelection(index) : '123';
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
            if (index >= selectionItemNodes.length-1) {
                return;
            }
            selectionListNode.insertBefore(liNode, selectionItemNodes[index + 1].nextSibling);
        });
        iconDelete.addEventListener('click',function(){
        	var liNode = this.parentNode.parentNode;
        	var selectionListNode = newQuestionBox.querySelector('.selections-list');
        	selectionListNode.removeChild(liNode);
        });
    }

    function renderMultipleSelection(index) {
        return '<li>' +
            '    <div class="radio-box">' +
            '        <span class="radio-frame">' +
            '           <span class="normal-radio"></span>' +
            '        </span>' +
            '        <input type="text" class="line-input" value="选项"' + index + '>' +
            '    </div>' +
            '</li>';

    };
})(document);
