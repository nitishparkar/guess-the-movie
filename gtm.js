var movie = "pursuit of happyness".split("");
var hidden_movie = "******* ** *********".split("");
var chances = 7;

$(document).ready(function() {

    //http://stackoverflow.com/a/1982047
    // gets movie name from a html file
    /*
    $.get('./movies.html', function(data) {
        $(data).find('h1').each(function() {
            movie = $(this).text();
        });
    });
    */

    var refreshDisplay = function() {
        $('div#movie h3').html(movie.join("") + ' || ' + hidden_movie.join(""));
        $('div#chances h1').html(chances);
    };

    var useChance = function() {
        chances -= 1;
    };

    var isLost = function() {
        return parseInt($('div#chances h1').html(), 10) === 0;
    };

    var isWon = function() {
        return movie.join() === hidden_movie.join();
    };

    var processCharacter = function(chr) {
        var i = movie.indexOf(chr);
        if (i === -1) {
            useChance();
        } else {
            for (var j = 0; j < movie.length; j++){
                if (movie[j] === chr) {
                    hidden_movie[j] = chr;
                }
            }
        }
        refreshDisplay();
    };

    $('.alphabets').click(function(event) {
        processCharacter(event.target.id);
        if(isWon()) {
            alert("Jinklas ki re!");
        } else if(isLost()) {
            alert("Harlas ki re!");
        }
    });

    $('#give-up').click(function() {
        chances = 0;
        hidden_movie = movie;
        refreshDisplay();
    });

    $('#restart').click(function() {
        location.reload(true);
    });

    refreshDisplay();

});