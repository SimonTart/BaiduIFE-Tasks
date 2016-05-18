(function (document, window) {
    var changeCB;
    refresh();

    function checkboxClickHandler(e) {
        var selfCheckbox = this.parentElement;
        var isChecked = this.checked;
        selfCheckbox.classList.toggle('checked');
        if (changeCB) {
            changeCB.call(this, e);
        }
    }

    function refresh() {
        var selfCheckBoxInputNodes = document.querySelectorAll('label[data-type=self-checkbox] input[type=checkbox]') || [];
        removeNodesEvent(selfCheckBoxInputNodes, 'change', checkboxClickHandler);
        bindNodesEvent(selfCheckBoxInputNodes, 'change', checkboxClickHandler);
    }

    function bindNodesEvent(nodes, event, callback) {
        for (var index = 0; index < nodes.length; index++) {
            nodes[index].addEventListener(event, callback);
        }
    }

    function removeNodesEvent(nodes, event, callback) {
        for (var index = 0; index < nodes.length; index++) {
            nodes[index].removeEventListener(event, callback);
        }
    }
    window.SelfCheckBox = {
        refresh: refresh,
        onChange: function (callback) {
            changeCB = callback;
        }
    };
})(document, window);