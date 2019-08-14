//Number of quiz questions
const QUIZLENGTH = 4;

var Quiz = function() {
    var self = this;
    this.init = function() {
        self._bindEvents();
    }
    
    this._selectAnswer = function($choice, $question) {
        //Disable all choices
        $question.find(".quiz-choice").removeClass("active");
        $question.find(".quiz-choice").addClass("disabled");

        //Activate selected choice
        $choice.removeClass("disabled");
        $choice.addClass("active");

    }

    this._isComplete = function() {
        var answersChosen = 0;
        $("ul[data-quiz-question]").each(function() {
            if($(this).find(".quiz-choice.active").length > 0) {
                answersChosen++;
            }
        });
        return (answersChosen >= QUIZLENGTH);
    }

    this._tallyResult = function() {
        var choiceList = new Array();
        $("ul[data-quiz-question]").each(function() {
            choiceList.push($(this).find(".quiz-choice.active").data("choice-value"));
        } );

        return choiceList;
    }

    this._calcResult = function() {
        // orgsAnswers[0] = Teach for America
        const teachForAmerica = new Array(["a", "b", "c", "d", "e"], ["a", "b", "e"], ["c", "e"], ["a"]);
        // orgsAnswers[1] = Peace Corps
        const peaceCorps = new Array(["a", "b", "c", "d", "e"], ["b", "d", "e", "f"], ["b", "c", "d", "e"], ["a", "b", "d", "f"]);
        // orgsAnswers[2] = Operation AmeriCorps
        const opAmeriCorps = new Array(["a"],["e"],["c"],["a"]); 
        // orgsAnswers[3] = National Health Corps
        const natHealthCorps = new Array(["a", "b", "c", "d", "e"], ["b"],["d","e"],["d"]);
        //orgsAnswers[4] = Orlando Cares
        const orlandoCares = new Array(["a", "b", "c", "d", "e"], ["b", "e"], ["c", "e"], ["a", "f"]); 
        //orgsAnswers[5] = City Year
        const cityYear = new Array(["a", "b", "c", "d", "e"], ["b", "e"], ["c", "e"], ["a"]);
        //orgsAnswers[6] = Florida Conservation Corps
        const flCC = new Array(["a", "b", "c", "d", "e"], ["b", "c", "f"], ["a"],["b"]);
        //orgsAnswers[7] = National Civillian Community Corps
        const natCCC = new Array(["a", "b", "c", "d", "e"], ["a", "b", "f"], ["a", "b"], ["b", "f"]);
        //orgsAnswers[8] = Orlando Partnership for School Success
        const opass = new Array(["a", "b", "c", "d", "e"], ["a", "b", "c", "d", "e", "f"], ["c", "e"], ["a", "f"]);
        //orgsAnswers[9] = Public Allies
        const publicAllies = new Array(["a", "b", "c", "d", "e"], ["a", "b", "c", "d", "e", "f"], ["c", "e"], ["c", "f"]);

        const orgsAnswers = new Array(teachForAmerica, peaceCorps, opAmeriCorps, natHealthCorps, orlandoCares, cityYear, flCC, natCCC, opass, publicAllies);

        const usr = this._tallyResult();

        var finalResult = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

        function addPoints(choice, j) {
            for(var i=0; i<orgsAnswers.length; i++) {
                if(orgsAnswers[i][j].includes(choice)) {
                    finalResult[i]++;
                }
            }
        }

        function maxIndex(a) {
            var i = 0, index = 0, max = 0;
            while(i < a.length) {
                if(a[i] > max) {
                    max = a[i];
                    index = i;
                }
                i++;
            }
            return index;
        }

        usr.forEach(addPoints);
        
        console.log(finalResult);
        console.log("Result: index " + maxIndex(finalResult));
    }

    this._showResult = function() {
        var $resultBox = $(".result");
        $resultBox.addClass("resultComplete jumbotron h1"); /*TODO: Select based on result */
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
        $(".jumbotron").each(function() {
            jumboList.push($(this));
        });

        $(".quiz-choice").on("click", function() {
            var $choice = $(this);
            var $question = $choice.closest("ul[data-quiz-question]");
            self._selectAnswer($choice, $question);

            if(self._isComplete()) {
                console.log("Quiz completed");
                self._calcResult();
                self._showResult();
                return;
            }

            //Animated scroll
            $("body, html").animate(
                {
                  scrollTop: (jumboList[ parseInt($question.data("quiz-question"))]).offset().top - 25 //Question #"d Jumbotron, -25px padding
                } , 500 );
        } );
    }
}

var quiz = new Quiz();
quiz.init();