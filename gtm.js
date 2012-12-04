var movie = null;
var hidden_movie = null;
var chances = 7;

$(document).ready(function() {

    $.getJSON('./movies.json', function(data) {
        $.each(data, function(key, val) {
            var mov = key.toLowerCase();
            movie = mov.split("");
            hidden_movie = mov.replace(/[a-z]/g, "*").split("");
        });
        refreshDisplay();
    });

    var refreshDisplay = function() {
        $('div#movie h3').html(movie.join("") + ' || ' + hidden_movie.join(""));
        $('div#chances h1').html(chances);
    };

    var endGame = function() {
        $('#give-up').attr('disabled','disabled');
        $('.alphabets').attr('disabled','disabled');
        hidden_movie = movie;
        refreshDisplay();
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
        $(this).attr('disabled','disabled');
        processCharacter(event.target.id);
        if(isWon()) {
            endGame();
            alert("Jinklas ki re!");
        } else if(isLost()) {
            endGame();
            alert("Harlas ki re!");
        }
    });

    $('#give-up').click(function() {
        chances = 0;
        endGame();
    });

    $('#restart').click(function() {
        location.reload(true);
    });

});