var utils = {
    addClass: function (node, addClassName) {
        var classNames = node.className;
        if (classNames.split(' ').indexOf(addClassName) !== -1) {
            return;
        }
        node.className = classNames + ' ' + addClassName;
    },
    removeClass: function (node, removeClassName) {
        var classNames = node.className.split(' ');
        var removeClassIndex = classNames.indexOf(removeClassName);
        if (removeClassIndex !== -1) {
            classNames.splice(removeClassIndex, 1);
            node.className = classNames.join(' ');
        }
    }
}
