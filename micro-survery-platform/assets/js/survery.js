(function (window) {
    function Survery(params) {

    }
    Survery.prototype = {
        newSurvery: function () {
            var surveries = this.getSurveryList();
            var newSurvery = {
                id: generateId(),
                title: '调查问卷标题',
                questions: [],
                answers: [],
                createDate: getFormatedDate(),
                state: 0 //0: 未发布 1：正在进行 2：已结束
            };
            surveries.unshift(newSurvery);
            this.setSurverise(surveries);
            return newSurvery;
        },
        getSurveryList: function () {
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
        },
        setSurverise: function (surveries) {
            var surveriesItem = JSON.stringify(surveries);
            window.localStorage.setItem('surveries', surveriesItem);
        },
        remove: function (id) {
            var surveries = this.getSurveryList();
            surveries = surveries.filter(function (element) {
                return element.id !== id;
            });
            this.setSurverise(surveries);
            return true;
        },
        removeByArray: function (ids) {
            var surveries = this.getSurveryList();
            surveries = surveries.filter(function (element) {
                return ids.indexOf(element.id) === -1;
            });
            this.setSurverise(surveries);
            return true;
        }
    }

    function generateId() {
        return new Date().getTime() + getRandomInt(0, 100000).toString();
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function getFormatedDate() {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        month = month < 10 ? '0' + month : month;
        var day = date.getDate();
        day = day < 10 ? '0' + day : day;
        var hour = date.getHours();
        hour = hour < 10 ? '0' + hour : hour;
        var minute = date.getMinutes();
        minute = minute < 10 ? '0' + minute : minute;
        var second = date.getSeconds();
        second = second < 10 ? '0' + second : second;
        return year + '-' + month + '-' + day + ' ' +
            hour + ':' + minute + ':' + second;
    }


    window.Survery = new Survery();
})(window);
