function getRandomValue(top) {
    return Math.floor(Math.random() * top + 1);
}

var getRandomValueAlternative = function (top) {
    if (isNaN(top)) {
        throw new Error ('Invalid input');
    }
    return Math.floor(Math.random() * top + 1);
};

console.log(getRandomValue(4));
console.log(getRandomValueAlternative(4));

// Basic  Take input and display it
console.log('Hello JS');
var greeting = 'Hello';
var age = prompt('How old are you', '18');
document.write('<div>age<\div>');
alert(greeting + ' ' + age);
console.log(greeting + ' ' + age);

// Variables
var a = '1';
var b = '2';
var c = parseInt(a) + parseInt(b);
console.log(c);
var d = '2.2332';
var e = '2.1111';
var f = parseFloat(d) + parseFloat(e);
console.log(f);

// Generate randon number between 1 and 6
var randomNumber = Math.floor(Math.random() * 6 + 1);
console.log('Random number between 1 and 6: ' + randomNumber);

// Methods
console.log(Math.random());
console.log(Math.floor(2.2));
console.log(Math.ceil(2.2));

// Conditional Statements
if (parseInt(age)) {
    console.log('You are only ' + age + ' years old.');
} else {
    console.log('Invalid age.');
}

// Throw error when wrong input
getRandomValueAlternative('23a12');