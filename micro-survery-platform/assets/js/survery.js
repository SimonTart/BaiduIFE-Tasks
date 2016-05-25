(function(window) {
    function Survery(params) {

    }
    Survery.prototype = {
        newSurvery: function() {
            var surveries = this.getSurveryList();
            var newSurvery = {
                id: generateId(),
                title: '点击标题修改',
                questions: [],
                answers: [],
                createDate: getFormatedDate(),
                state: 0 //0: 未发布 1：正在进行 2：已结束
            };
            surveries.unshift(newSurvery);
            this.setSurverise(surveries);
            return newSurvery;
        },
        getSurveryList: function() {
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
        setSurverise: function(surveries) {
            var surveriesItem = JSON.stringify(surveries);
            window.localStorage.setItem('surveries', surveriesItem);
        },
        getStatist: function(id) {
            var answers = [];
            var statists = [];
            var surveries = this.getSurveryList();
            surveries.some(function(survery) {
                if (survery.id === id) {
                    answers = survery.answers || [];
                    return true;
                } else {
                    return false;
                }
            });
            var totalNumber = answers.length;
            console.log(answers);
            answers.forEach(function(answer) {
                answer.forEach(function(question,index){
                    if (!statists[index]) {
                        statists[index] = {};
                    }
                    var thisStatist = statists[index];
                    if (question.type === 'single') {
                        if (thisStatist[question.value]) {
                            thisStatist[question.value]++;
                        } else {
                            thisStatist[question.value] = 1;
                        }
                    } else if (question.type === 'multiple') {
                        question.value.forEach(function(value) {
                            if (thisStatist[value]) {
                                thisStatist[value]++;
                            } else {
                                thisStatist[value] = 1;
                            }
                        });
                    }else if(question.type === 'text'){
                        if(question.value){
                            if(thisStatist['valid']){
                                thisStatist['valid']++;
                            }else{
                                thisStatist['valid'] = 1;
                            }
                        }
                    }
                });
            });

            //transto percent
            statists.forEach(function(statist){
                for(var i in statist){
                    statist[i] = statist[i] / totalNumber;
                }
            });
            return {
                totalNumber: totalNumber,
                statists: statists
            };
        },
        addAnswer: function(id, answer) {
            var surveries = this.getSurveryList();
            surveries.some(function(survery) {
                if (survery.id === id) {
                    survery.answers.push(answer);
                    return true;
                } else {
                    return false;
                }
            });
            this.setSurverise(surveries);
        },
        remove: function(id) {
            var surveries = this.getSurveryList();
            surveries = surveries.filter(function(element) {
                return element.id !== id;
            });
            this.setSurverise(surveries);
            return true;
        },
        removeByArray: function(ids) {
            var surveries = this.getSurveryList();
            surveries = surveries.filter(function(element) {
                return ids.indexOf(element.id) === -1;
            });
            this.setSurverise(surveries);
            return true;
        },
        get: function(id) {
            var surveries = this.getSurveryList();
            for (var i = 0; i < surveries.length; i++) {
                if (surveries[i].id === id) {
                    return surveries[i];
                }
            }
            return null;
        },
        set: function(id, prop, value) {
            if (!id || !prop || !value) {
                throw 'surveries must have property id  prop value';
                return false;
            }
            var surveries = this.getSurveryList();
            for (var i = 0; i < surveries.length; i++) {
                if (surveries[i].id === id) {
                    surveries[i][prop] = value;
                    this.setSurverise(surveries);
                    break;
                }
            }
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
