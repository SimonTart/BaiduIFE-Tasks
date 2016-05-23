(function(Survery, document) {
    document.querySelector('#new-survery')
        .addEventListener('click', function(e) {
            var newSurvery = Survery.newSurvery();
            var tipBox = document.querySelector('#tipBox');
            tipBox.classList.add('active');
            setTimeout(function() {
              window.location.href = "./edit.html?id="+newSurvery.id;
            },1000);
        });
})(window.Survery, document);
