(function (document) {
    var selfCheckBoxNodes = document.querySelectorAll('label[data-typ=self-checkbox]');

    for (var i = 0; i < selfCheckBoxNodes.length; i++) {
        selfCheckBoxNodes.addEventListener('click',function(e) {
            
        });
    }


    document.body.addEventListener('click', function (e) {
        var target = e.target;
        if (target.getAttribute('data-type') !== 'self-checkbox') {
            return;
        }
        var inputNode = target.querySelector('input[type=checbox]');
        var classNamesArr = target.className.split(' ');
        var activeIndex = classNamesArr.indexOf('active');
        if (inputNode.checked) {
            inputNode.checked = false;
            if (activeIndex !== -1) {
                classNamesArr.splice(activeIndex);
                target.className = classNamesArr.join(' ');
            }
        } else {

        }
    });
})(document);