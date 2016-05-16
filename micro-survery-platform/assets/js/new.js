(function(Survery, document) {
    document.querySelector('#new-survery')
        .addEventListener('click', function(e) {
            var newSurvery = Survery.newSurvery();
            console.log(newSurvery);
        });
})(window.Survery, document);