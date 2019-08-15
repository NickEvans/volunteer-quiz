// Answer data for quiz. This info for us to match There are 10 2D arrays. The first dimen is the resulting org, the 2nd dimen are the 4 questions, the 3rd dimen are the valid values which will add a point
//---------------------------------------------------------------------------
// orgsAnswers[0] = Teach for America
const teachForAmerica = new Array(['a', 'b', 'c', 'd', 'e'], ['a', 'b', 'e'], ['c', 'e'], ['a']);
// orgsAnswers[1] = Peace Corps
const peaceCorps = new Array(['a', 'b', 'c', 'd', 'e'], ['b', 'd', 'e', 'f'], ['b', 'c', 'd', 'e'], ['a', 'b', 'd', 'f']);
// orgsAnswers[2] = Operation AmeriCorps
const opAmeriCorps = new Array(['a'],['e'],['c'],['a']); 
// orgsAnswers[3] = National Health Corps
const natHealthCorps = (['a', 'b', 'c', 'd', 'e'],['b'],['d','e'],['d']);
//orgsAnswers[4] = Orlando Cares
const orlandoCares = new Array(['a', 'b', 'c', 'd', 'e'], ['b', 'e'], ['c', 'e'], ['a', 'f']); 
//orgsAnswers[5] = City Year
const cityYear = new Array(['a', 'b', 'c', 'd', 'e'], ['b', 'e'], ['c', 'e'], ['a']);
//orgsAnswers[6] = Florida Conservation Corps
const flCC = new Array(['a', 'b', 'c', 'd', 'e'], ['b', 'c', 'f'], ['a'],['b']);
//orgsAnswers[7] = National Civillian Community Corps
const natCCC = new Array(['a', 'b', 'c', 'd', 'e'], ['a', 'b', 'f'], ['a', 'b'], ['b', 'f']);
//orgsAnswers[8] = Orlando Partnership for School Success
const opass = new Array(['a', 'b', 'c', 'd', 'e'], ['a', 'b', 'c', 'd', 'e', 'f'], ['c', 'e'], ['a', 'f']);
//orgsAnswers[9] = Public Allies
const publicAllies = new Array(['a', 'b', 'c', 'd', 'e'], ['a', 'b', 'c', 'd', 'e', 'f'], ['c', 'e'], ['c', 'f']);
//---------------------------------------------------------------
//nest all the arrays within one 3D array
const orgsAnswers = new Array(teachForAmerica, peaceCorps, opAmeriCorps, natHealthCorps, orlandoCares, cityYear, flCC, natCCC, opass, publicAllies);
//User's array
const usr = new Array('c', 'c', 'c', 'b');
//The functions
const calcPts = (arr) => {
    //initializes pts to 0
    let pts = 0;
    // Loops through the row of an array
    for (let i = 0; i < arr.length; i++) {
        //Loops through the nested array within
        for (let j = 0; j < arr[i].length; j++) {
            //Loops through the nested array within
            for (let k = 0; k < arr[i][j].length; k++) {
                //check if value is equal to the user's value from its provided array
                if (arr[i][j][k] === usr[i]) {
                    // if equal, add a point to the total
                    pts++;
                }
            }
        }
    }
    //return total amount of points
    return pts;
}
const getPts = (arr) => {
    // creates new empty array to get points values
  let points = new Array;
  //traverses through array & calls calcPts()
    for (let i = 0; i < arr.length; i++) {
        //assigns values from calcPts() with the array form orgsAnswers
        points[i] = calcPts(arr[i]);
    }
    return points;
} 
const findMax = (arr) => {
    // sets max to first value of the array
    let max = arr[0];
    //sets index to next value to calc through
    let i = 1;
    // sets max Index to first index
   let maxIndex = 0;
   /* Could add other indices with a value equal to the max index
   let otherMaxes = new Array;
   */
    while (i<arr.length){
        // creates a coinflip that flips between 0 & 1
    let coinflip = Math.floor(Math.random() * 2);
    // if the array's index is greater the max value, set the max to the array's index value
       if (arr[i] > max){
           max = arr[i];
           maxIndex = i;
           //otherMaxes.push(i);
       } else if(arr[i] == max){
           //otherMaxes.push(i);
          if(coinflip === 1){
              //if coinflip is 1 set new max
              max = arr[i];
              maxIndex = i;
          }
       }
        i++;
    }// returns the max's index
    return maxIndex;
}
console.log(getPts(orgsAnswers)); // This prints the array of pts for each organization to the console
console.log(findMax(getPts(orgsAnswers))); //this prints the result of which of the indices of the array is the highest

/// Some code for creating a dialouge pop-up