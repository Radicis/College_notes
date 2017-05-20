// Fade function from http://epicmargorp.blogspot.ie/2013/12/pure-javascript-fade-effect.html
var fadeout = function(elem) {
    var o = 1;
    var timer = setInterval(function () {
        if (o <= 0.0) {
            clearInterval(timer);
        }
        elem.style.opacity = o;
        elem.style.filter = 'alpha(opacity=' + o * 100 + ")";
        o -= 0.1;
    }, 100);
};


//Init
graph.init();
initSettings();





