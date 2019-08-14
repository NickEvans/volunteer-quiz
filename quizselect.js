//Number of quiz questions
const QUIZLENGTH = 4;

var Quiz = function() {
    var self = this;
    this.init = function() {
        self._bindEvents();
    }
    
    this._selectAnswer = function($choice, $question) {
        //Disable all choices
        $question.find('.quiz-choice').removeClass('active');
        $question.find('.quiz-choice').addClass('disabled');

        //Activate selected choice
        $choice.removeClass('disabled');
        $choice.addClass('active');

    }

    this._isComplete = function() {
        var answersChosen = 0;
        $('ul[data-quiz-question').each(function() {
            if($(this).find('.quiz-choice.active').length > 0) {
                answersChosen++;
            }
        });
        return (answersChosen >= QUIZLENGTH);
    }

    this._tallyResult = function() {
        var choiceList = new Array();
        $('ul[data-quiz-question').each(function() {
            choiceList.push($(this).find('.quiz-choice.active').data('choice-value'));
        } );

        return choiceList;
    }

    this._showResult = function() {
        var $resultBox = $('.result');
        $resultBox.addClass('resultComplete jumbotron h1'); /*TODO: Select based on result */
        $resultBox.html("Here is your result!<br> You selected: " + self._tallyResult()); /*TODO: Content based on result */

        //Scroll
        $("body, html").animate(
            {
              scrollTop: (($resultBox).offset().top - 25) //25px padding
            } , 500 );
    }

    this._bindEvents = function(){
        var i = 0;

        var jumboList = new Array();
        $('.jumbotron').each(function() {
            jumboList.push($(this));
        });

        $('.quiz-choice').on('click', function() {
            var $choice = $(this);
            var $question = $choice.closest('ul[data-quiz-question]');
            self._selectAnswer($choice, $question);

            if(self._isComplete()) {
                console.log("Quiz completed");
                console.log(self._tallyResult());
                self._showResult();
                return;
            }

            //Animated scroll
            $("body, html").animate(
                {
                  scrollTop: (jumboList[ parseInt($question.data('quiz-question'))]).offset().top - 25 //Question #'d Jumbotron, -25px padding
                } , 500 );
        } );
    }
}

var quiz = new Quiz();
quiz.init();