(function (document, Survery) {
    var surveryList = Survery.getSurveryList();
    renderSurveryList(document.querySelector('#survery-table>tbody'), surveryList);

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
            '        <div class="btn-operate">编辑</div>' +
            '        <div class="btn-operate">删除</div>' +
            '        <div class="btn-operate">查看数据</div>' +
            '    </td>';
        var trElement = document.createElement('tr');
        trElement.innerHTML = surveryItemString;
        return trElement;
    }

    function renderSurveryList(parentNode, surveryList) {
        var surveryListDocument = document.createDocumentFragment();
        for (var i = 0; i < surveryList.length; i++) {
            surveryListDocument.appendChild(renderSurveryItem(surveryList[i]))
        }
        return parentNode.appendChild(surveryListDocument);
    }

})(document, Survery);
