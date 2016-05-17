(function(Survery, document) {
    document.querySelector('#new-survery')
        .addEventListener('click', function(e) {
            var newSurvery = Survery.newSurvery();
            var tipBox = document.querySelector('#tipBox');
            utils.addClass(tipBox,'active');
            setTimeout(function() {
              window.location.href = "./edit.html?surveryId="+newSurvery.id;
            },1000);
        });
})(window.Survery, document);
