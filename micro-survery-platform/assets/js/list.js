(function(document, Survery, SelfCheckBox, TipBox) {
    var surveryList = Survery.getSurveryList();
    renderSurveryList(document.querySelector('#survery-table>tbody'), surveryList);
    SelfCheckBox.refresh();

    function renderSurveryItem(survery) {
        var stateTransMap = {
            0: '未发布',
            1: '发布中',
            2: '已结束'
        };
        var surverySatate = '未发布';

        var surveryItemString = '    <td>' +
            '        <label  data-type="input-checkbox">' +
            '            <input type="checkbox"/>' +
            '            <span class="input-frame">' +
            '               <span class="normal-box"></span>' +
            '               <span class="checked-box"></span>' +
            '            </span>' +
            '        </label>' +
            '    </td>' +
            '    <td>' +
            (survery.state === 1 ? '<a class="title" href="survery.html?id=' + survery.id + '">' + survery.title + '</a>' : survery.title) + '</td>' +
            '    <td>' + survery.createDate + '</td>' +
            '    <td>' + stateTransMap[survery.state] + '</td>' +
            '    <td>' +
            '        <a class="btn-operate btn-edit" href="' +
            (survery.state === 0 ? ('./edit.html?id=' + survery.id) : 'javascript:void(0);') + '">编辑</a>' +
            '        <div class="btn-operate" name="delete">删除</div>' +
            '        <div class="btn-operate"><a href="surveryData.html?id=' + survery.id + '">查看数据</a></div>' +
            '    </td>';
        var trElement = document.createElement('tr');
        var stateClassMap = {
            0: 'notPushlis',
            1: 'hasPublish',
            2: 'hasEnd'
        }
        trElement.classList.add(stateClassMap[survery.state]);
        trElement.id = survery.id;
        trElement.innerHTML = surveryItemString;
        bindSurveryEventListner(trElement);
        return trElement;
    }

    function renderSurveryList(parentNode, surveryList) {
        var surveryListDocument = document.createDocumentFragment();
        for (var i = 0; i < surveryList.length; i++) {
            surveryListDocument.appendChild(renderSurveryItem(surveryList[i]))
        }
        return parentNode.appendChild(surveryListDocument);
    }

    function removeSurveryItem(id) {
        var surveryItem = document.getElementById(id);
        return surveryItem.parentNode.removeChild(surveryItem);
    }

    function bindSurveryEventListner(surveryNode) {
        var deleteBtn = surveryNode.querySelector('div[name=delete]');
        deleteBtn.addEventListener('click', function(e) {
            var id = e.target.parentElement.parentElement.getAttribute('id');
            TipBox.alertConfirm('确定删除该调查问卷吗？', function() {
                Survery.remove(id);
                removeSurveryItem(id);
                TipBox.alertMessage('删除成功');
                IsShowDeleteSelectedBtn();
            });
        });
        //change is show delete btn
        surveryNode.querySelector('[data-type=input-checkbox]').addEventListener('change', function() {
            IsShowDeleteSelectedBtn();
        });
    }

    //select all checkbox
    document.querySelector('#select-all input[type=checkbox]')
        .addEventListener('change', function(e) {
            var isAllChecked = this.checked;
            var surveryCheckBoxes = document.querySelectorAll('#survery-table [data-type=input-checkbox]');
            surveryCheckBoxes.forEach(function(selfCheckbox) {
                var isChecked = selfCheckbox.querySelector('input[type=checkbox]').checked;
                if (isChecked !== isAllChecked) {
                    selfCheckbox.click();
                }
            });
        });

    // when cancel checkbox sync all checkbox and deleteSelectedBtn
    SelfCheckBox.onChange(function(e) {
        var isChecked = this.checked;
        var selectAllBox = document.querySelector('#select-all');
        var selectAllInput = selectAllBox.querySelector('input[type=checkbox]');
        var isAllChecked = selectAllInput.checked;
        if (!isChecked && isAllChecked) {
            selectAllBox.classList.remove('checked');
            selectAllInput.checked = false;
        }
    });

    //delete selected surveries
    document.querySelector('#delete-selected-btn')
        .addEventListener('click', function(e) {
            var selectedSurveryInput = document.querySelectorAll('#survery-table [data-type=input-checkbox] input[type=checkbox]:checked');
            var selectedSurveryIds = [].map.call(selectedSurveryInput, function(input) {
                return input.parentNode.parentNode.parentNode.getAttribute('id');
            });
            TipBox.alertConfirm('确定要删除选中的调查问卷吗？', function() {
                Survery.removeByArray(selectedSurveryIds);
                selectedSurveryIds.forEach(function(id) {
                    removeSurveryItem(id);
                });
                TipBox.alertMessage('删除成功');
                IsShowDeleteSelectedBtn();
            });
        });

    //judge is show delete-select-btn
    function IsShowDeleteSelectedBtn() {
        var surveryCheckBoxes = document.querySelectorAll('[data-type=input-checkbox] input[type=checkbox]');
        var deleteSelectedBtn = document.querySelector('#delete-selected-btn');
        setTimeout(function() {
            if ([].some.call(surveryCheckBoxes, function(checkbox) {
                    return checkbox.checked;
                })) {
                deleteSelectedBtn.style.display = 'inline-block';
            } else {
                deleteSelectedBtn.style.display = 'none';
            }
        }, 0);
    }

})(document, Survery, SelfCheckBox, TipBox);
