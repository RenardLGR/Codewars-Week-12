// https://www.codewars.com/kata/51f2b4448cadf20ed0000386/train/javascript
// Complete the function/method so that it returns the url with anything after the anchor (#) removed.

// Examples
// "www.codewars.com#about" --> "www.codewars.com"
// "www.codewars.com?page=1" -->"www.codewars.com?page=1"

function removeUrlAnchor(url){
    // let result
    // result=url.split('#')
    // console.log(result);
    // result.splice(1, result.length)
    // console.log(result);
    // result=result.join('')
    // console.log(result);
    // return result

    return url.split('#')[0]
  }

// console.log(removeUrlAnchor('www.codewars.com#about'));

//===========================================================================
//https://www.codewars.com/kata/54c27a33fb7da0db0100040e/train/javascript
// A square of squares
// You like building blocks. You especially like building blocks that are squares. And what you even like more, is to arrange them into a square of square building blocks!

// However, sometimes, you can't arrange them into a square. Instead, you end up with an ordinary rectangle! Those blasted things! If you just had a way to know, whether you're currently working in vain… Wait! That's it! You just have to check if your number of building blocks is a perfect square.

// Task
// Given an integral number, determine if it's a square number:

// In mathematics, a square number or perfect square is an integer that is the square of an integer; in other words, it is the product of some integer with itself.

// The tests will always use some integral number, so don't worry about that in dynamic typed languages.

// Examples
// -1  =>  false
//  0  =>  true
//  3  =>  false
//  4  =>  true
// 25  =>  true
// 26  =>  false


var isSquare2 = function(n){
    if(n<0) {
        return false
    }
    else {
        for(let i=0; i<=n; i++) {
            if(i*i === n){
                return true
            }
        }
    }
    return false
  }

function isSquare(n) {
    return Math.sqrt(n)%1 === 0
    //return Number.isInteger(Math.sqrt(n))
}

//=========================================================================
// https://www.codewars.com/kata/58f8a3a27a5c28d92e000144/train/javascript
// Your task is to find the first element of an array that is not consecutive.

// By not consecutive we mean not exactly 1 larger than the previous element of the array.

// E.g. If we have an array [1,2,3,4,6,7,8] then 1 then 2 then 3 then 4 are all consecutive but 6 is not, so that's the first non-consecutive number.

// If the whole array is consecutive then return null.

// The array will always have at least 2 elements and all elements will be numbers. The numbers will also all be unique and in ascending order. The numbers could be positive or negative and the first non-consecutive could be either too!

// If you like this Kata, maybe try this one next: https://www.codewars.com/kata/represent-array-of-numbers-as-ranges

// 1 Can you write a solution that will return null for both [] and [ x ] though? (This is an empty array and one with a single number and is not tested for, but you can write your own example test. )

function firstNonConsecutive (arr) {
    let result=null
    if(arr.length<=1) {
        return result
    }

    else {
        for (let i=1; i<arr.length; i++) {
            if(arr[i]-arr[i-1]>1){
              result=arr[i]
              return result
            }
          }
    }
  return result
  }

// console.log(firstNonConsecutive([1,2,3,4,6,7,8]));
// console.log(firstNonConsecutive([1,3,4,6,7,8,9,10]));
// console.log(firstNonConsecutive([1]));

//=========================================================================
//https://www.codewars.com/kata/represent-array-of-numbers-as-ranges
// Description
// Your task is to take arrays of numbers and compress them into ranges.

// The numbers in the array are mostly consecutive. If you convert them as ranges, it will save a lot of space. You should write a function that will convert an array of numbers into a string. A range, or series of consecutive numbers, will be represented as two numbers separated by an underscore, a range of one just by the number its self and multiple ranges separated by commas.

// For example,
// The numbers 5, 6, 7, 8 and 9 would be displayed as "5_9"
// The number 6 would just be "6"
// The numbers 3,4,5,6,9 would be "3_6,9"

// Using the above system, you should write two functions:
// toRange - convert an array of numbers to a range string
// toArray - convert a range string back to an array

// Warnings
// The numbers could arrive all jumbled up so you'll need to sort them Sometimes the same number may appear more than once, duplicates should be discarded.

// Edge cases
// An empty array should become an empty string if passed to toRange and vise versa for the toArray function. Also, ranges of 2 digits will take the same space whether they are represented as a sequence or a range. I.e. "5,6,8,9".length === "5_6,8_9".length so there will be no compression, but represent them as a range anyway for consistency.

// Good luck!

// If you're finding this Kata a little hard, then maybe try my other one first

// https://www.codewars.com/kata/find-the-first-non-consecutive-number


let myArrEmpty = []
let myArr=[5,5,6,1,1,1,10,8,9,9,7,2,3,13]
let myArr2=[1,2,3,4,5]
let myArr3=[5,6,8,9]


// Should return a string representing the ranges
function toRange(arr) {
    //steps:
    //sort & remove duplicate
    //from start of array, find the end of consecutive number, ranges it, add it to the string result, removes it from the array

    let result=''

    let cleanArr=eliminateDuplicate(sort(arr)) //sorted and no duplicate array

    let arrToWorkWith = cleanArr

    let endOfConsecutiveIndex=giveEndOfConsecutiveIndex(arrToWorkWith)
    
    while(arrToWorkWith.length>0) {
        if(arr[0]===arr[endOfConsecutiveIndex]){
            result += arrToWorkWith[0]+',' //if no consecutive numbers
        }
        else {
            result += arrToWorkWith[0]+'_'+arrToWorkWith[endOfConsecutiveIndex]+',' //if consecutive numbers
        }
        arrToWorkWith=arrToWorkWith.slice(endOfConsecutiveIndex+1)
        endOfConsecutiveIndex=giveEndOfConsecutiveIndex(arrToWorkWith)
        
    }

    if (result[result.length-1]===','){
        result=result.slice(0, result.length-1) //remove the last element ','
    }
    return result

}

// console.log(toRange(myArr));
// console.log(toRange(myArr3));
// console.log(typeof toRange(myArrEmpty));



// Should return an array
function toArray(str) {
    //steps:
    //split with ',' as separator '1,5_10,13' -> [ '1' , '5_10' , '13' ]
    //split with '_' as separator [ '1' , [ '5' , '10' ] , '13' ]
    //convert arr of string to nums [1, [5, 10], 13]
    //expand [5,10] -> [5, 6, 7, 8, 9, 10]
    //remove superflux arr [1, 2, [3,4,5],6] ->[1, 2, 3 ,4 ,5, 6]

    let result
    let noCommasArr = splitWithSeparator(str, ',') //step 1
    let noUnderscoreArr=[]
    //step 2
    for(let i=0; i<noCommasArr.length; i++) {
        if(noCommasArr[i].includes('_')) {
            noUnderscoreArr.push(splitWithSeparator(noCommasArr[i], '_'))
        }
        else {
            noUnderscoreArr.push(noCommasArr[i])
        }
    }
    // console.log(noUnderscoreArr);
    //step 3
    let allNumsArr = convertArrStringToArrNums(noUnderscoreArr)
    // console.log(allNumsArr);
    //step 4
    let expandedArr = []
    for(let i=0; i<allNumsArr.length; i++) {
        if(Array.isArray(allNumsArr[i])){
            expandedArr.push(giveAnArrayOfNumsBetweenStartAndFinishIncluded(allNumsArr[i]))
        }
        else {
            expandedArr.push(allNumsArr[i])
        }
    }
    // console.log(expandedArr);
    //step 5
    let removedNestedArr = removeAnArrAndPutHisValueInstead(expandedArr)
    // console.log(removedNestedArr);
    result = removedNestedArr
    return result
}   
// console.log(toArray('1,5_10,13'));
// console.log(toArray(''));


//HELPER FUNCTIONS FOR TO RANGE
function eliminateDuplicate (arr) {
    let result = []
    arr.forEach(elem => {
        if(!result.includes(elem)) {
            result.push(elem)
        }
    })
    return result
}
// console.log(eliminateDuplicate(sort(myArr)));


function sort(arr) {
    let result=[]
    result = arr.sort((a,b)=> a-b)
    return result
}

function giveEndOfConsecutiveIndex (arr) {
    let result=arr.length-1
    if(arr.length===0) {
        return 0
    }

    else {
        for (let i=1; i<arr.length; i++) {
            if(arr[i]-arr[i-1]>1){
              result=i-1
              return result
            }
          }
    }
  return result
}
// console.log(giveEndOfConsecutiveIndex(myArr2));

//HELPER FUNCTION FOR TO ARRAY
function convertArrStringToArrNums (arr) {
    // arr=['1', ['5', '10'], '13'] => result=[1, [5, 10], 13]
    let result=[]
    for(let i=0; i<arr.length; i++) {
        if (Array.isArray(arr[i])) {
            result.push(convertArrStringToArrNums(arr[i]))
        }
        else {
            //result.push(Number(arr[i]))
            if(arr[i]) { //somehow Number('') returns 0
                result.push(Number(arr[i]))
            }
        }
    }
    return result
}
// console.log(convertArrStringToArrNums(['1', ['5', '10'], '13']));


function giveAnArrayOfNumsBetweenStartAndFinishIncluded(arr) {
    //it takes an arr=[int start, int finish] start<finish, it should return [int start, start+1, ..., finish]
    //[5,10] -> [5, 6, 7, 8, 9, 10]

    let result=[]
    for (let i=arr[0]; i<=arr[1]; i++){
        result.push(i)
    }
    return result
}
// console.log(giveAnArrayOfNumsBetweenStartAndFinishIncluded([5,10]));

function removeAnArrAndPutHisValueInstead(arr) {
    // arr=[1, 2, [3,4,5],6] => result=[1, 2, 3 ,4 ,5, 6]
    let result=[]

    for(let i=0; i<arr.length; i++) {
        if (Array.isArray(arr[i])) {
            arr[i].forEach(elem => result.push(elem))
        }
        else {
            result.push(arr[i])
        }
    }
    return result
}

// console.log(removeAnArrAndPutHisValueInstead([1, 2, [3,4,5],6]));

function splitWithSeparator (string, separator) {
    return string.split(separator)
}

// console.log(splitWithSeparator('5_10','_'));
// console.log(splitWithSeparator('1,5_10,13', ','));



//==========================================================================
// https://www.codewars.com/kata/5899642f6e1b25935d000161/train/javascript
// You are given two sorted arrays that both only contain integers. Your task is to find a way to merge them into a single one, sorted in asc order. Complete the function mergeArrays(arr1, arr2), where arr1 and arr2 are the original sorted arrays.

// You don't need to worry about validation, since arr1 and arr2 must be arrays with 0 or more Integers. If both arr1 and arr2 are empty, then just return an empty array.

// Note: arr1 and arr2 may be sorted in different orders. Also arr1 and arr2 may have same integers. Remove duplicated in the returned result.

// Examples (input -> output)
// * [1, 2, 3, 4, 5], [6, 7, 8, 9, 10] -> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// * [1, 3, 5, 7, 9], [10, 8, 6, 4, 2] -> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// * [1, 3, 5, 7, 9, 11, 12], [1, 2, 3, 4, 5, 10, 12] -> [1, 2, 3, 4, 5, 7, 9, 10, 11, 12]
// Happy coding!




function mergeArrays(arr1, arr2) {
    let combinedAndSorted =  arr1.concat(arr2).sort((a,b) => a-b)

    return Array.from(new Set(combinedAndSorted)) //removes duplicate

//     let result=[]
//     combinedAndSorted.forEach(elem => {
//       if(!result.includes(elem)) {
//         result.push(elem)
//       }
//     })
//     return result
  }

//   console.log(mergeArrays([1, 3, 5, 7, 9, 11, 12],[1, 2, 3, 4, 5, 10, 12]));

//   console.log(Array.from(new Set(myArr.sort( (a,b) => a-b) )));


//===========================================================================
// https://www.codewars.com/kata/5861d28f124b35723e00005e/train/javascript
// Will you make it?
// You were camping with your friends far away from home, but when it's time to go back, you realize that your fuel is running out and the nearest pump is 50 miles away! You know that on average, your car runs on about 25 miles per gallon. There are 2 gallons left. Considering these factors, write a function that tells you if it is possible to get to the pump or not. Function should return true if it is possible and false if not. The input values are always positive.

const zeroFuel = (distanceToPump, mpg, fuelLeft) => {
    return (distanceToPump <= mpg*fuelLeft)
  };

//=========================================================================
//   https://www.codewars.com/kata/596e4ef7b61e25981200009f/javascript
//   The aspect ratio of an image describes the proportional relationship between its width and its height. Most video shown on the internet uses a 16:9 aspect ratio, which means that for every pixel in the Y, there are roughly 1.77 pixels in the X (where 1.77 ~= 16/9). As an example, 1080p video with an aspect ratio of 16:9 would have an X resolution of 1920, however 1080p video with an aspect ratio of 4:3 would have an X resolution of 1440.

// Write a function that accepts arbitrary X and Y resolutions and converts them into resolutions with a 16:9 aspect ratio that maintain equal height. Round your answers up to the nearest integer.

// This kata is part of a series with Aspect Ratio Cropping - Part 2 .

function aspectRatio(x,y){
    return [Math.ceil(y*16/9), y];
}

//====================================================================
// https://www.codewars.com/kata/596e9524f24c7e5a7b000430/train/javascript

    // This kata is a continuation of Aspect Ratio Cropping - Part 1 .

    // Comparing two different aspect ratios poses some subtleties – when comparing two aspect ratios, one may compare images with equal height, equal width, equal diagonal, or equal area.
    
    // Write a function that accepts arbitrary X and Y resolutions and converts them into resolutions with a 16:9 aspect ratio. This time your function should accept a third input "constant," specifying the variable to remain constant in your conversion. The variable constant can have a value of either "height", "width", "diagonal", or "area". Round your answers up to the nearest integer.
    
    function aspectRatio(x,y,constant){
        switch (constant) {
            case 'height':
                return [Math.ceil(16/9*y), y]
                break;
        
            case 'width':
                return [x, Math.ceil(9/16*x)]
                break;

            case 'diagonal':
                let diagonal = Math.sqrt(x*x+y*y)
                let y2 = Math.pow(diagonal, 2)/(1+Math.pow(16,2)/Math.pow(9,2))
                y2 = Math.sqrt(y2)
                return [Math.ceil(16/9*y2), Math.ceil(y2)]
                break;

            case 'area':
                let area=x*y
                let y3=Math.sqrt(9/16*area)
                return [Math.ceil(16/9*y3), Math.ceil(y3)]
                break;
            default:
                break;
        }
      
      }


// console.log(aspectRatio(374, 280, "height")); //[498 ,280]
// console.log(aspectRatio(374, 280, "width")); //[374 ,211]
// console.log(aspectRatio(374, 280, "diagonal")); //[408 ,230]
// console.log(aspectRatio(374, 280, "area")); //[432 ,243]

//=========================================================================
//https://www.digitalocean.com/community/tutorials/js-finally-understand-reduce
// Flattening an Array Using Reduce
// Let’s say we have the following array:
// And let’s say for some crazy reason, JavaScript has removed the .flat method so we have to flatten this array ourselves.

// So we’ll write a function to flatten any array no matter how deeply nested the arrays are:

const numArray = [1, 2, [3, 10, [11, 12]], [1, 2, [3, 4]], 5, 6]

function flattenArray (arr) {
    return arr.reduce( (acc, curr) => {
        return acc.concat(Array.isArray(curr) ? flattenArray(curr) : curr )

    }, [] )
}



// console.log(flattenArray(numArray));
// console.log(numArray.flat()); // flat() takes the deepness as parameter, default deepness is 1

//===================================================================
// https://www.codewars.com/kata/5f70c883e10f9e0001c89673/train/javascript
// If you've completed this kata already and want a bigger challenge, here's the 3D version

// Bob is bored during his physics lessons so he's built himself a toy box to help pass the time. The box is special because it has the ability to change gravity.

// There are some columns of toy cubes in the box arranged in a line. The i-th column contains a_i cubes. At first, the gravity in the box is pulling the cubes downwards. When Bob switches the gravity, it begins to pull all the cubes to a certain side of the box, d, which can be either 'L' or 'R' (left or right). Below is an example of what a box of cubes might look like before and after switching gravity.

// +---+                                       +---+
// |   |                                       |   |
// +---+                                       +---+
// +---++---+     +---+              +---++---++---+
// |   ||   |     |   |   -->        |   ||   ||   |
// +---++---+     +---+              +---++---++---+
// +---++---++---++---+         +---++---++---++---+
// |   ||   ||   ||   |         |   ||   ||   ||   |
// +---++---++---++---+         +---++---++---++---+
// Given the initial configuration of the cubes in the box, find out how many cubes are in each of the n columns after Bob switches the gravity.

// Examples (input -> output:
// * 'R', [3, 2, 1, 2]      ->  [1, 2, 2, 3]
// * 'L', [1, 4, 5, 3, 5 ]  ->  [5, 5, 4, 3, 1]

const flip=(d, arr)=>{
//it basically sort them small to big for 'R' or big to small for 'L'

    // if(d==='R') {
    //     return arr.sort( (a,b) => {return a-b<0 ? -1 : 1})
    // }
    // else {
    //     return arr.sort( (a,b) => {return a-b<0 ? 1 : -1})
    // }
    return arr.sort( (a,b) => d==='R' ? a-b : b-a )

  }

// console.log(flip('R', [3, 2, 1, 2]));
// console.log(flip('L', [1, 4, 5, 3, 5 ]));

//=========================================================================
//https://www.codewars.com/kata/55908aad6620c066bc00002a/train/javascript
// Check to see if a string has the same amount of 'x's and 'o's. The method must return a boolean and be case insensitive. The string can contain any char.

// Examples input/output:

// XO("ooxx") => true
// XO("xooxx") => false
// XO("ooxXm") => true
// XO("zpzpzpp") => true // when no 'x' and 'o' is present should return true
// XO("zzoo") => false

function XO(str) {
    str=str.toLowerCase()
    let numO = 0
    let numX = 0
    for(let i=0; i<str.length; i++) {
        if(str[i]==='o'){numO++}
        else if (str[i]==='x') {numX++}
    }
    return numO===numX
}

// console.log(XO("xooxx"));
// console.log(XO("ooxx"));

//==========================================================================
//https://www.codewars.com/kata/57ee4a67108d3fd9eb0000e7/train/javascript
// Write a function that takes a list of strings as an argument and returns a filtered list containing the same elements but with the 'geese' removed.

// The geese are any strings in the following array, which is pre-populated in your solution:

//   ["African", "Roman Tufted", "Toulouse", "Pilgrim", "Steinbacher"]
// For example, if this array were passed as an argument:

//  ["Mallard", "Hook Bill", "African", "Crested", "Pilgrim", "Toulouse", "Blue Swedish"]
// Your function would return the following array:

// ["Mallard", "Hook Bill", "Crested", "Blue Swedish"]
// The elements in the returned array should be in the same order as in the initial array passed to your function, albeit with the 'geese' removed. Note that all of the strings will be in the same case as those provided, and some elements may be repeated.

function gooseFilter (birds) {
    var geese = ["African", "Roman Tufted", "Toulouse", "Pilgrim", "Steinbacher"];
    
    return birds.filter(elem => !(geese.includes(elem)))
  };

//console.log(gooseFilter(["African", "Roman Tufted", "Toulouse", "Pilgrim", "Steinbacher"]));

//========================================================================
// https://www.codewars.com/kata/55d1d6d5955ec6365400006d/train/javascript
// Given an integer as input, can you round it to the next (meaning, "higher") multiple of 5?

// Examples:

// input:    output:
// 0    ->   0
// 2    ->   5
// 3    ->   5
// 12   ->   15
// 21   ->   25
// 30   ->   30
// -2   ->   0
// -5   ->   -5
// etc.
// Input may be any positive or negative integer (including 0).

// You can assume that all inputs are valid integers.
// Note : -10%5=-0   and -0===0
function roundToNext5(n){
  return Math.ceil(n/5) * 5
}

//==========================================================================
// https://www.codewars.com/kata/563f037412e5ada593000114/train/javascript
// Mr. Scrooge has a sum of money 'P' that he wants to invest. Before he does, he wants to know how many years 'Y' this sum 'P' has to be kept in the bank in order for it to amount to a desired sum of money 'D'.

// The sum is kept for 'Y' years in the bank where interest 'I' is paid yearly. After paying taxes 'T' for the year the new sum is re-invested.

// Note to Tax: not the invested principal is taxed, but only the year's accrued interest

// Example:

//   Let P be the Principal = 1000.00      
//   Let I be the Interest Rate = 0.05      
//   Let T be the Tax Rate = 0.18      
//   Let D be the Desired Sum = 1100.00


// After 1st Year -->
// P = 1000 + 0.05*1000 - 0.18*0.05*1000 = 1041
//   P = 1041.00

// After 2nd Year -->
// P = 1041 + 0.05*1041 - 0.18*0.05*1041 = 1041
//   P = 1083.68
// After 3rd Year -->
//   P = 1128.11

//Pyear+1 = Pyear + (InterestRate*Pyear)*(1-TaxRate)


// Thus Mr. Scrooge has to wait for 3 years for the initial principal to amount to the desired sum.

// Your task is to complete the method provided and return the number of years 'Y' as a whole in order for Mr. Scrooge to get the desired sum.

// Assumption: Assume that Desired Principal 'D' is always greater than the initial principal. However it is best to take into consideration that if Desired Principal 'D' is equal to Principal 'P' this should return 0 Years.



function calculateYears(apport, interest, tax, desired) {
    year = 0
    fonds=apport
  
  while (fonds <= desired) {
    fonds=fonds+(interest*fonds)*(1-tax)
    year++
  }
  
  return year
}

// console.log(calculateYears(1000,0.05,0.18,1001));

//========================================================================
// https://www.codewars.com/kata/5266876b8f4bf2da9b000362/train/javascript

// You probably know the "like" system from Facebook and other pages. People can "like" blog posts, pictures or other items. We want to create the text that should be displayed next to such an item.

// Implement the function which takes an array containing the names of people that like an item. It must return the display text as shown in the examples:

// []                                -->  "no one likes this"
// ["Peter"]                         -->  "Peter likes this"
// ["Jacob", "Alex"]                 -->  "Jacob and Alex like this"
// ["Max", "John", "Mark"]           -->  "Max, John and Mark like this"
// ["Alex", "Jacob", "Mark", "Max"]  -->  "Alex, Jacob and 2 others like this"
// Note: For 4 or more names, the number in "and 2 others" simply increases.

function likes(names) {
    names= names || []

    // if(names.length === 0) {
    //     return 'no one likes this'
    // }
    // else if (names.length === 1) {
    //     return `${names[0]} likes this`
    // }
    // else if (names.length === 2) {
    //     return `${names[0]} and ${names[1]} like this`

    // }
    // else if (names.length === 3) {
    //     return `${names[0]}, ${names[1]} and ${names[2]} like this`
    // }
    // else if (names.length === 4) {
    //     return `${names[0]}, ${names[1]} and 2 others like this`
    // }
    // else {
    //     return `${names[0]}, ${names[1]} and ${names.length-2} others like this`
    // }

    switch (names.length) {
        case 0:
            return 'no one likes this'
        case 1:
            return `${names[0]} likes this`
        case 2:
            return `${names[0]} and ${names[1]} like this`
        case 3:
            return `${names[0]}, ${names[1]} and ${names[2]} like this`
        case 4:
            return `${names[0]}, ${names[1]} and 2 others like this`
        default:
            return `${names[0]}, ${names[1]} and ${names.length-2} others like this`
    }
  }


  //=====================================================================
//   https://www.codewars.com/kata/52efefcbcdf57161d4000091/train/javascript
//   The main idea is to count all the occurring characters in a string. If you have a string like aba, then the result should be {'a': 2, 'b': 1}.

// What if the string is empty? Then the result should be empty object literal, {}.

function count (string) {  
    let result = {}
    let arr = string.split('')

    arr.forEach( elem => {
        let strElem = ''+elem
        if (result.hasOwnProperty(strElem)) {
            result[strElem]++
        }
        else {
            result[strElem]=1
        }
    } )

    return result
  }

  function count2 (string) {  
    let result = {}
    let arr = string.split('')

    arr.forEach( elem => {
        result[elem] ? result[elem]++ : result[elem] = 1
    } )

    return result
  }

//  console.log(count2('aba'));

//=========================================================================
// https://www.codewars.com/kata/5375f921003bf62192000746/train/javascript
// The word i18n is a common abbreviation of internationalization in the developer community, used instead of typing the whole word and trying to spell it correctly. Similarly, a11y is an abbreviation of accessibility.

// Write a function that takes a string and turns any and all "words" (see below) within that string of length 4 or greater into an abbreviation, following these rules:

// A "word" is a sequence of alphabetical characters. By this definition, any other character like a space or hyphen (eg. "elephant-ride") will split up a series of letters into two words (eg. "elephant" and "ride").
// The abbreviated version of the word should have the first letter, then the number of removed characters, then the last letter (eg. "elephant ride" => "e6t r2e").
// Example
// abbreviate("elephant-rides are really fun!")
// //          ^^^^^^^^*^^^^^*^^^*^^^^^^*^^^*
// // words (^):   "elephant" "rides" "are" "really" "fun"
// //                123456     123     1     1234     1
// // ignore short words:               X              X

// // abbreviate:    "e6t"     "r3s"  "are"  "r4y"   "fun"
// // all non-word characters (*) remain in place
// //                     "-"      " "    " "     " "     "!"
// === "e6t-r3s are r4y fun!"

function abbreviate(string) {
    let arrOfWord = string.split(' ')
    let result=[]
    arrOfWord.forEach( elem => {
        result.push(turnWordIntoAbbre(elem))}
        )

    return result
  }

//console.log(abbreviate("elephant-rides are really fun!"));


function turnWordIntoAbbre(word) {
    result=''

    if (word.length<4) {
        return word
    }
    else {
        let numOfRemovedChar = word.length-2
        result= result+word[0] + numOfRemovedChar + word[word.length-1]
        return result
    }
}

// console.log(turnWordIntoAbbre('fun'));
// console.log(turnWordIntoAbbre('word'));

//PROBLEME IRRESOLUBLE SANS REGEX

//==========================================================================
// https://www.codewars.com/kata/576757b1df89ecf5bd00073b/train/javascript
// Build a pyramid-shaped tower given a positive integer number of floors. A tower block is represented with "*" character.

// For example, a tower with 3 floors looks like this:

// [
//   "  *  ",
//   " *** ", 
//   "*****"
// ]
// And a tower with 6 floors looks like this:

// [
//   "     *     ", 
//   "    ***    ", 
//   "   *****   ", 
//   "  *******  ", 
//   " ********* ", 
//   "***********"
// ]
//Just return an array

function towerBuilder(nFloors) {
let result =[]

    for (let i=1; i<=nFloors; i++) {
        let stars=''
        for (let j=i; j<nFloors; j++) {
            stars+=' '
        }// il y a de chaque côté nFloors - étageActuel i espaces 
        for (let j=1; j<=2*i-1; j++) {
            stars+='*'
        }
        for (let j=i; j<nFloors; j++) {
            stars+=' '
        }
        result.push(stars)
    }
return result
}

// console.log(towerBuilder(5));


//===========================================================================
// https://www.codewars.com/kata/57675f3dedc6f728ee000256/train/javascript
// Build Tower by the following given arguments:
// number of floors (integer and always greater than 0)
// block size (width, height) (integer pair and always greater than (0, 0))

// Tower block unit is represented as *

// Python: return a list;
// JavaScript: returns an Array;
// Have fun!

// for example, a tower of 3 floors with block size = (2, 3) looks like below
//towerBuilder(3, [2, 3])
// [
//   '    **    ',
//   '    **    ',
//   '    **    ',
//   '  ******  ',
//   '  ******  ',
//   '  ******  ',
//   '**********',
//   '**********',
//   '**********'
// ]
// and a tower of 6 floors with block size = (2, 1) looks like below
//towerBuilder(6, [2, 1])
// [
//   '          **          ', 
//   '        ******        ', 
//   '      **********      ', 
//   '    **************    ', 
//   '  ******************  ', 
//   '**********************'
// ]


// We have 
// rowSize = width*(2*nbFloors -1)
// nbStars = width*(2*actualFloor -1)
// nbSpacesOnOneSide = rowSize-nbStars = width*(nbFloors-actualFloor)

function towerBuilder2(nFloors, nBlockSz) {
    let result = []
    let width=nBlockSz[0]
    let height=nBlockSz[1]
    

    for (let actualFloor=1 ;actualFloor<=nFloors; actualFloor++) {
        let row=''
        let spaces=' '.repeat(width*(nFloors-actualFloor))
        let stars='*'.repeat(width*(2*actualFloor-1))
        row=spaces+stars+spaces
        for (let j=1; j<=height; j++) {
            result.push(row)
        }
    }

    return result
  }

  //========================================================================
//   https://www.codewars.com/kata/5208f99aee097e6552000148/train/javascript
//   Complete the solution so that the function will break up camel casing, using a space between words.

// Example
// "camelCasing"  =>  "camel Casing"
// "identifier"   =>  "identifier"
// ""             =>  ""


function breakCamelCase(string) {
    let result=string
    for (let i = 0; i<result.length; i++) {
        // console.log(i);
        if (result[i]===result[i].toUpperCase()) {
            // console.log('hello');
            result=result.slice(0, i) + result.slice(i).replace(result[i], ' '+result[i])
            i=i+1
        }
    }
    return result
}
// console.log(breakCamelCase('camelCaseTest'));
// console.log(breakCamelCase('longTryTryThing'));

function breakCamelCase2(string){
    let arr=string.split('')

    let arr2=arr.map(elem => {
        if(elem===elem.toUpperCase()){
            elem=' '+elem
        }
        return elem
    })
    return arr2.join('')
}

// console.log(breakCamelCase2('camelCaseTest'));
// console.log(breakCamelCase2('longTryTryThing'));

//==========================================================================
// https://www.codewars.com/kata/534d2f5b5371ecf8d2000a08/train/javascript
// Your task, is to create NxN multiplication table, of size provided in parameter.

// for example, when given size is 3:

// 1 2 3
// 2 4 6
// 3 6 9
// for given example, the return value should be: [[1,2,3],[2,4,6],[3,6,9]]

multiplicationTable = function(size) {
let result=[]

for (let i=1; i<=size; i++){
    result.push(tableOfX(size, i))
}

    function tableOfX(size, X) {
        let result=[]
        for(let i=1; i<=size; i++){
            result.push(i*X)
        }
        return result
    }
return result
}

// console.log(multiplicationTable(3));
  
//===========================================================================
// https://www.codewars.com/kata/5626b561280a42ecc50000d1/train/javascript
// The number 89 is the first integer with more than one digit that fulfills the property partially introduced in the title of this kata. What's the use of saying "Eureka"? Because this sum gives the same number.

// In effect: 89 = 8^1 + 9^2

// The next number in having this property is 135.

// See this property again: 135 = 1^1 + 3^2 + 5^3

// We need a function to collect these numbers, that may receive two integers a, b that defines the range [a, b] (inclusive) and outputs a list of the sorted numbers in the range that fulfills the property described above.

// Let's see some cases:

// sumDigPow(1, 10) == [1, 2, 3, 4, 5, 6, 7, 8, 9]

// sumDigPow(1, 100) == [1, 2, 3, 4, 5, 6, 7, 8, 9, 89]
// If there are no numbers of this kind in the range [a, b] the function should output an empty list.

// sumDigPow(90, 100) == []

function sumDigPow(a, b) {
    let result=[]
    for (let i=a; i<=b; i++) {
        if(i===isANumberItsDigitsRaisedToTheConsecutivePowers(i)) {
            result.push(i)
        }
    }
  

    function isANumberItsDigitsRaisedToTheConsecutivePowers (num) {
        let sum=0
        let numInArr = num.toString().split('')

        for(let i=0; i<numInArr.length; i++) {
            sum+=Math.pow(numInArr[i], i+1)
        }
        return sum
    }

    return result
}

// console.log(sumDigPow(1,10));

//========================================================================
// https://www.codewars.com/kata/5842df8ccbd22792a4000245/train/javascript
// Write Number in Expanded Form
// You will be given a number and you will need to return it as a string in Expanded Form. For example:

// expandedForm(12); // Should return '10 + 2'
// expandedForm(42); // Should return '40 + 2'
// expandedForm(70304); // Should return '70000 + 300 + 4'
// NOTE: All numbers will be whole numbers greater than 0.

// If you liked this kata, check out part 2!!
// https://www.codewars.com/kata/write-number-in-expanded-form-part-2

function expandedFormNaturals(num) {
    if (num) {
        let resultArr = []
        let numInArr = num.toString().split('')
        // si numInArr[i] est différent de zéro, j'écris le chiffre 'numInArr[i]*Math.pow(10, numInArr.length-i)'
    
        for(let i=0; i<numInArr.length; i++) {
            if (numInArr[i]!=='0') {
                let stringNumToAdd=(numInArr[i]*Math.pow(10, numInArr.length-i-1)).toString()
                resultArr.push(stringNumToAdd)
            }
        }
        return resultArr.join(' + ')
    }
    else {return null}
  }

// console.log(expandedFormNaturals(70304));

//========================================================================
// https://www.codewars.com/kata/58cda88814e65627c5000045/train/javascript
// You will be given a number and you will need to return it as a string in expanded form :

// For example:

// expandedForm(1.24); // should return '1 + 2/10 + 4/100'
// expandedForm(7.304); // should return '7 + 3/10 + 4/1000'
// expandedForm(0.04); // should return '4/100'
// expandedForm(807.304); // Should return '800 + 7 + 3/10 + 4/1000'

function expandedFormDecimals(num) {
    if (num) {
        let resultArr = []
        let numInArr = num.toString().split('') //THIS works if the nums does not start with zeroes, toString() somehow strugles if the nums starts with zeros
        // the number wille be given as 0.304

        //si numInArr[i] est différent de zéro, j'écris le chiffre 'numInArr[i]/Math.pow(10, i+1)'
    
        for(let i=2; i<numInArr.length; i++) {
            if (numInArr[i]!=='0') {
                let stringNumToAdd=''+(numInArr[i])+'/'+(Math.pow(10, i-1)).toString()
                resultArr.push(stringNumToAdd)
            }
        }
    
        return resultArr.join(' + ')
    }
    else {return null}
}
//console.log(expandedFormDecimals(0.00304));
//-> 3/1000 + 4/100000


function expandedFormV2(num) {
    let arrOfNaturalsAndDecimals = num.toString().split('.')
    arrOfNaturalsAndDecimals[1]='0.'+arrOfNaturalsAndDecimals[1]
    let stringNaturals = expandedFormNaturals(+arrOfNaturalsAndDecimals[0])
    let stringDecimals = expandedFormDecimals(+arrOfNaturalsAndDecimals[1])


    if(stringNaturals && stringDecimals) {
        return stringNaturals+' + '+stringDecimals
    }
    else if(stringNaturals) {
        return stringNaturals
    }
    else if(stringDecimals) {
        return stringDecimals
    }
    else {return null}
  }

// console.log(expandedFormV2(807.304));
// console.log(expandedFormV2(807));
// console.log(expandedFormV2(0.304));
// console.log(expandedFormV2(807.00304));

//======================================================================
// https://www.codewars.com/kata/545af3d185166a3dec001190/train/javascript
// Create a method each_cons that accepts a list and a number n, and returns cascading subsets of the list of size n, like so:

// each_cons([1,2,3,4], 2)
//   #=> [[1,2], [2,3], [3,4]]

// each_cons([1,2,3,4], 3)
//   #=> [[1,2,3],[2,3,4]]
  
// As you can see, the lists are cascading; ie, they overlap, but never out of order.
const lst = [3, 5, 8, 13];

function eachCons(array, n) {
    let result=[]
    
    for(let i=0; i<=array.length-n; i++) {
      let temp=[]
      for (let j=0; j<n; j++) {
        temp.push(array[i+j])
      }
      result.push(temp)
    }
    return result
  }

// console.log(eachCons(lst, 3));
// -> [[3,5,8], [5,8,13]]

//=======================================================================
