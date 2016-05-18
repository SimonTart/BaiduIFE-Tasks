(function (document, Survery, SelfCheckBox) {
    var surveryList = Survery.getSurveryList();
    renderSurveryList(document.querySelector('#survery-table>tbody'), surveryList);
    SelfCheckBox.refresh();

    function renderSurveryItem(survery) {
        var stateTransMap = {
            0: '未发布',
            1: '正在进行',
            2: '已结束'
        };
        var surverySatate = '未发布';

        var surveryItemString = '    <td>' +
            '        <label class="check-box"  data-type="self-checkbox">' +
            '            <input type="checkbox"/>' +
            '            <span class="check-frame">' +
            '                                <span class="normal-box"></span>' +
            '            <span class="checked-box"></span>' +
            '            </span>' +
            '            <span></span>' +
            '        </label>' +
            '    </td>' +
            '    <td>' + survery.title + '</td>' +
            '    <td>' + survery.createDate + '</td>' +
            '    <td>' + stateTransMap[survery.state] + '</td>' +
            '    <td>' +
            '        <a class="btn-operate" href="./edit.html?id' + survery.id + '">编辑</a>' +
            '        <div class="btn-operate" name="delete">删除</div>' +
            '        <div class="btn-operate">查看数据</div>' +
            '    </td>';
        var trElement = document.createElement('tr');
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
        deleteBtn.addEventListener('click', function (e) {
            var id = e.target.parentElement.parentElement.getAttribute('id');
            TipBox.alertConfirm('确定删除该调查问卷吗？', function () {
                Survery.remove(id);
                removeSurveryItem(id);
                TipBox.alertMessage('删除成功');
                IsShowDeleteSelectedBtn();
            });
        });
    }
    //select all checkbox
    document.querySelector('#select-all input[type=checkbox]')
        .addEventListener('change', function (e) {
            var isAllChecked = this.checked;
            var surveryCheckBoxes = document.querySelectorAll('#survery-table [data-type=self-checkbox]');
            surveryCheckBoxes.forEach(function (selfCheckbox) {
                var isChecked = selfCheckbox.querySelector('input[type=checkbox]').checked;
                if (isChecked !== isAllChecked) {
                    selfCheckbox.click();
                }
            });
            IsShowDeleteSelectedBtn();
        });

    // when cancel checkbox sync all checkbox and deleteSelectedBtn
    SelfCheckBox.onChange(function (e) {
        var isChecked = this.checked;
        var selectAllBox = document.querySelector('#select-all');
        var selectAllInput = selectAllBox.querySelector('input[type=checkbox]');
        var isAllChecked = selectAllInput.checked;
        if (!isChecked && isAllChecked) {
            selectAllBox.classList.remove('checked');
            selectAllInput.checked = false;
        }
        IsShowDeleteSelectedBtn();
    });

    //delete selected surveries
    document.querySelector('#delete-selected-btn')
        .addEventListener('click', function (e) {
            var selectedSurveryInput = document.querySelectorAll('#survery-table [data-type=self-checkbox] input[type=checkbox]:checked');
            var selectedSurveryIds = [].map.call(selectedSurveryInput, function (input) {
                return input.parentNode.parentNode.parentNode.getAttribute('id');
            });
            TipBox.alertConfirm('确定要删除选中的调查问卷吗？', function () {
                Survery.removeByArray(selectedSurveryIds);
                selectedSurveryIds.forEach(function (id) {
                    removeSurveryItem(id);
                });
                TipBox.alertMessage('删除成功');
                IsShowDeleteSelectedBtn();
            });
        });

    //judge is show delete-select-btn
    function IsShowDeleteSelectedBtn() {
        var surveryCheckBoxes = document.querySelectorAll('[data-type=self-checkbox] input[type=checkbox]');
        var deleteSelectedBtn = document.querySelector('#delete-selected-btn');
        setTimeout(function () {
            if ([].some.call(surveryCheckBoxes, function (checkbox) {
                return checkbox.checked;
            })) {
                deleteSelectedBtn.style.display = 'inline-block';
            } else {
                deleteSelectedBtn.style.display = 'none';
            }
        }, 0);
    }
    // tip -box 
    var TipBox = (function () {
        var tipMask = document.querySelector('#tipMask');
        var confirmFn, cancelFn;
        document.querySelector('#tipMask .icon-cancel')
            .addEventListener('click', function (e) {
                tipMask.classList.remove('active');
                if (cancelFn) {
                    cancelFn(e);
                    cancelFn = null;
                }
            });

        document.querySelector('#tipMask .btn-cancel')
            .addEventListener('click', function (e) {
                tipMask.classList.remove('active');
                if (cancelFn) {
                    cancelFn(e);
                    cancelFn = null;
                }
            });

        document.querySelector('#tipMask .btn-confirm')
            .addEventListener('click', function (e) {
                tipMask.classList.remove('active');
                if (confirmFn) {
                    confirmFn(e);
                    confirmFn = null;
                }
            });
        return {
            alertConfirm: function (message, comfirmCb, cancelCb) {
                tipMask.setAttribute('data-type', 'confirm');
                tipMask.querySelector('.tip-message').innerHTML = message;
                tipMask.classList.add('active');
                confirmFn = comfirmCb;
                cancelFn = cancelCb;
            },
            alertMessage: function (message, comfirmCb, cancelCb) {
                tipMask.setAttribute('data-type', 'message');
                tipMask.querySelector('.tip-message').innerHTML = message;
                tipMask.classList.add('active');
                confirmFn = comfirmCb;
                cancelFn = cancelCb;
            }
        }
    })();
})(document, Survery, SelfCheckBox);
