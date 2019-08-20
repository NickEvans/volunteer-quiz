//Number of quiz questions
const QUIZLENGTH = 4;

const ORGNAMES = new Array("Teach For America", "Peace Corps", "Operation AmeriCorps", "National Health Corps", "Orlando Cares", "City Year", "Florida Conservation Corps", "National Civilian Community Corps", "Orlando Partnership for School Success", "Public Allies");

const ORGINFO = [

    {
        name: "Teach For America",
        info: "We're a non-profit, leadership development organization that helps young leaders use their talents to end educational inequality in America. In the long-term, our network of more than 50,000 leaders continue to channel their collective talents to create the systemic-level change needed for kids across the country."
    },

    {
        name: "Peace Corps",
        info: "Peace Corps is a catalyst for grassroots international development and cultural exchange powered by volunteers ready to use their energy, ingenuity, and skills to work towards reducing inequality and creating opportunities in communities around the world."
    },

    {
        name: "Operation AmeriCorps",
        info: "A collaborative partnership between the City of Orlando, Orange Country Public Schools, and After-School All-Stars, the goal of Operation AmeriCorps is to use national service to ensure high school graduation and a post high school pathway for targeted students. Members will work with students and be responsible for promoting academic, social, and personal success."
    },

    {
        name: "National Health Corps",
        info: "National Health Corps has worked to expand access to health care and health education in underserved communities for more than 20 years. Members will work to provide health screenings and education to those in need."
    },

    {
        name: "Orlando Cares",
        info: "Orlando Cares works to address community issues through volunteerism. Volunteers serve at City Hall or at local nonprofit organizations to develop programs to recruit, screen, train, engage, and monitor volunteers from the community."
    },

    {
        name: "City Year",
        info: "CityYear is a gap year program from AmeriCorps that invites young leaders to serve a year as a tutor and mentor to students Central Florida in K-12 schools and communities. It is a great opportunity for servant leadership, civic engagement, and for promoting education in our community."
    },

    {
        name: "Florida Conservation Corps",
        info: "Florida Conservation Corps provides hands-on service learning opportunities designed to develop leaders in the fields of cultural preservation, land management, and regional outreach through their A.N.T, T.R.E.C, & R.O.A.R programs. Volunteers develop confidence, knowledge and abilities necessary to become better environmentalists, conservationists, and stewards of their community and environment."
    },

    {
        name: "National Civilian Community Corps",
        info: "AmeriCorps National Civilian Community Coprs & FEMA Corps is a full-time, residential, team-based program for young adults between 18-24 that runs for 10-12 months compromised of teams of 8-10 members. This orgination focuses on disaster relief, infrastructure improvement, environmental stewardship, and urban and rural development."
    },

    {
        name: "Orlando Partnership for School Success",
        info: "Orlando-Partnership for School Success is a collaborative partnership between the Citt of Orlando, Orange County Public School and After-School Alll-Stars. The mission of the project is to expand academic and social supports for at-risk youth in high poverty neighborhoods during the school day, after school and in summer. Each volunteer is assigned 40 children for whom they will be responsible for promoting their academic, social, and personal success for one year. Best suited for bilingual, community driven individuals"
    },

    {
        name: "Public Allies",
        info: "Public Allies Central Florida is a 10 month long full-time apprenticeship at a local nonprofit as well as a leadership development program. Best for individuals who want to rpomote social justice and social equity by engaging with their community."
    }

]
// Bonnieblue would like a dropdown menu for the additional matches for the user
var Quiz = function () {
    var self = this;
    this.init = function () {
        self._bindEvents();
    }

    this._selectAnswer = function ($choice, $question) {
        //Disable all choices
        $question.find(".quiz-choice").removeClass("active");
        $question.find(".quiz-choice").addClass("disabled");

        //Activate selected choice
        $choice.removeClass("disabled");
        $choice.addClass("active");

    }

    //Returns true if each question has a selected response
    this._isComplete = function () {
        let answersChosen = 0;
        $("ul[data-quiz-question]").each(function () {
            if ($(this).find(".quiz-choice.active").length > 0) {
                answersChosen++;
            }
        });

        return (answersChosen >= QUIZLENGTH);
    }

    //Returns array of user responses
    this._tallyResponses = function () {
        let choiceList = new Array();
        $("ul[data-quiz-question]").each(function () {
            choiceList.push($(this).find(".quiz-choice.active").data("choice-value"));
        });
        return choiceList;
    }

    this._calcResult = function () {

        // orgsAnswers[0] = Teach for America
        const teachForAmerica = new Array(["a", "b", "c", "d", "e"], ["a", "b", "e"], ["c", "e"], ["a"]);
        // orgsAnswers[1] = Peace Corps
        const peaceCorps = new Array(["a", "b", "c", "d", "e"], ["b", "d", "e", "f"], ["b", "c", "d", "e"], ["a", "b", "d", "f"]);
        // orgsAnswers[2] = Operation AmeriCorps
        const opAmeriCorps = new Array(["a"], ["e"], ["c"], ["a"]);
        // orgsAnswers[3] = National Health Corps
        const natHealthCorps = new Array(["a", "b", "c", "d", "e"], ["b"], ["d", "e"], ["d"]);
        //orgsAnswers[4] = Orlando Cares
        const orlandoCares = new Array(["a", "b", "c", "d", "e"], ["b", "e"], ["c", "e"], ["a", "f"]);
        //orgsAnswers[5] = City Year
        const cityYear = new Array(["a", "b", "c", "d", "e"], ["b", "e"], ["c", "e"], ["a"]);
        //orgsAnswers[6] = Florida Conservation Corps
        const flCC = new Array(["a", "b", "c", "d", "e"], ["b", "c", "f"], ["a"], ["b"]);
        //orgsAnswers[7] = National Civillian Community Corps
        const natCCC = new Array(["a", "b", "c", "d", "e"], ["a", "b", "f"], ["a", "b"], ["b", "f"]);
        //orgsAnswers[8] = Orlando Partnership for School Success
        const opass = new Array(["a", "b", "c", "d", "e"], ["a", "b", "c", "d", "e", "f"], ["c", "e"], ["a", "f"]);
        //orgsAnswers[9] = Public Allies
        const publicAllies = new Array(["a", "b", "c", "d", "e"], ["a", "b", "c", "d", "e", "f"], ["c", "e"], ["c", "f"]);

        const orgsAnswers = new Array(teachForAmerica, peaceCorps, opAmeriCorps, natHealthCorps, orlandoCares, cityYear, flCC, natCCC, opass, publicAllies);

        const userChoices = this._tallyResponses();

        let finalPoints = new Array(10).fill(0);

        function addPoints(choice, j) {
            for (var i = 0; i < orgsAnswers.length; i++) {
                if (orgsAnswers[i][j].includes(choice)) {
                    finalPoints[i]++;
                }
            }
        }

        //Returns index of highest value (randomly breaks ties)
        function maxList(a) {
            var i = 0,
                maxList = new Array(),
                max = 0;

            //Find max
            for (i = 0; i < a.length; i++) {
                if (a[i] > max) {
                    max = a[i];
                }
            }

            //Catalogue all occurences of max
            for (i = 0; i < a.length; i++) {
                if (a[i] == max) {
                    maxList.push(i);
                }
            }

            //Return the list of user's relate options & maxes
            return (maxList);
        }

        userChoices.forEach(addPoints);

        return maxList(finalPoints);
    }
    this._randResult = function (a) {
        return a[Math.floor(Math.random() * a.length)]
    }
    this._printMaxes = function () {
        let maxes = self._calcResult();
        let maxNames = new Array();
        for (var i = 0; i < maxes.length; i++) {
            maxNames[i] = ORGNAMES[maxes[i]];
        }
        return maxNames;
    }
    this._showResult = function () {
        let $resultBox = $(".result");
        // gets a random result from the calc'd array of maxes
        
        let result = self._randResult(self._calcResult()); // prints out a random number like 8
       
        let maxes = self._printMaxes();// returns an array of strings of org names
        this._removeMaxResult = function(arr){
            return arr != ORGNAMES[result];
        }

        self._removeMaxResult(self._printMaxes());
        maxes.filter(self._removeMaxResult);
       
        $resultBox.addClass("resultComplete jumbotron");
        $resultBox.html("<h1><p>Here is your result!</p> <p>You matched with <u>" + ORGNAMES[result] + "</u> </h1> <p>" + ORGINFO[result].info +"</p>");
       //prevents adding only the randomized result to the bottom
        if (maxes.length > 1){
            $resultBox.append('<br/><h2><b> You also matched with:</b></h2> <ul>')
            for (let i = 0; i < maxes.length; i++) {
                $resultBox.append('<b><li>' + maxes[i] + '</li></b>');
            }
             }
        $resultBox.append('</ul> <br> <p>Schedule a consultation with <b><a href="mailto:Rahsaan.Graham@ucf.edu">Rahsaan.Graham@ucf.edu</a></b> to learn more about your program and many others!</p>')
    //Animated croll
    $("body, html").animate({
        scrollTop: (($resultBox).offset().top - 25) //25px padding
    }, 500);
}
// These functions bind the user's click to an array that  lists their their choices
this._bindEvents = function () {
    let jumboList = new Array();
    $(".jumbotron").each(function () {
        jumboList.push($(this));
    });

    $(".quiz-choice").on("click", function () {
        let $choice = $(this);
        let $question = $choice.closest("ul[data-quiz-question]");
        self._selectAnswer($choice, $question);

        if (self._isComplete()) {
            self._showResult();
            return;
        }

        //Animated scroll to next Jumbotron element
        $("body, html").animate({
            scrollTop: (jumboList[parseInt($question.data("quiz-question"))]).offset().top - 25
        }, 500);
    });
}
}

var quiz = new Quiz();
quiz.init();