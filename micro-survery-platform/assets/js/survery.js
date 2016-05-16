(function(window) {

    function newSurvery() {
        var surveries = getSurveries();
        var newSurvery = {
            id: generateId(),
            title: '调查问卷标题',
            questions: [],
            answers: []
        };
        surveries.push(newSurvery);
        setSurverise(surveries);
        return newSurvery;
    }

    function generateId() {
        return new Date().getTime() + getRandomInt(0, 100000).toString();
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function getSurveries() {
        var surveries = [];
        var surveriesItem = window.localStorage.getItem('surveries');
        if (surveries) {
            try {
                surveries = JSON.parse(surveriesItem);
            } catch (e) {
                console.error('JSON parse surveries fail');
                console.error(e);
            }
        }
        return surveries || [];
    }

    function setSurverise(surveries) {
        var surveriesItem = JSON.stringify(surveries);
        window.localStorage.setItem('surveries', surveriesItem);
    }


    window.Survery = {
        newSurvery: newSurvery
    }
})(window);