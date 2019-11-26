---
title: "Some of JavaScript Tricks"
date: 2019-08-19 07:00:00
author: "jonath Frank"
image: ../../images/004-1.jpg
tags:
  - javaScript
  - webDevelopment
---

Calling functions is arguably one of the most frequent tasks you’ll do when programming. As an author of a function, you have to decide on the param- eters to receive. As a caller of a function, you have to pass the right argu- ments. And, from the extensibility and flexibility point of view, you may want functions to receive variable numbers of arguments. From the beginning, JavaScript is one of those few languages that has supported a variable number of arguments.

When calling a function, the spread operator removes the need to manually break down the values in an array into discrete parameters. That leads to less code, less noise, and more fluency. In combination with Array, you may also use the spread operator to combine values in arrays and discrete variables to pass arguments to functions that receive rest parameters.

### power of argument in old js

The ability to pass a variable number of arguments to a function is a feature that’s esoteric in many languages but is commonplace in JavaScript. Java- Script functions always take a variable number of arguments, even if we define named parameters in function definitions.

`const max = function(a, b) { if (a > b) { return a; } return b; }; console.log(max(1, 3)); console.log(max(4, 2)); console.log(max(2, 7, 1));`

We can invoke the function with two arguments, but what if we call it with three arguments, for example? Most languages will scoff at this point, but not JavaScript. Here’s the output:
3 4 7
It appears to even produce the right result when three parameters were passed—what’s this sorcery?

First, we may pass as many arguments to a function as we like. If we pass fewer arguments than the number of named parameters, the extra parameters turn up as undefined. If we pass more arguments than the number of parame- ters, then those are merely ignored. Thus the last argument 1 was ignored in the last call to the max() method.

JavaScript has always allowed passing a variable number of arguments to functions, but receiving a variable number of parameters has been messy until recently. Traditionally, the special arguments keyword is used to process the parameters,

`const max = function() { console.log(arguments instanceof Array); let large = arguments[0]; for(let i = 0; i < arguments.length; i++) { if(arguments[i] > large) { large = arguments[i]; } } return large; }; console.log(max(2, 1, 7, 4));`
This version of the max() function does not have any explicitly named param- eters declared. Within the function we query if arguments is an Array and then iterate over each element in that “thingy” to pick the largest value. The output from the code is shown here:
false 7

While in the past arguments has been used extensively in JavaScript, there are many issues with its use, as we see in this example:
• The method signature does not convey the intent—worse, it’s misleading. While it appears that the function does not take any arguments, the actions of the implementation are quite contrary to that.
• arguments is an Array wannabe—it may be used like an Array, but only on the surface; it’s largely deficient in its capabilities.
• The code is noisy and can’t make use of more elegant solutions that may be used if arguments were an Array.
arguments is beyond repair since JavaScript has to preserve backward compat- ibility. The rest parameter solves the issues—moving forward, don’t use argu- ments and use the rest parameter instead

### using the rest parameter

A rest parameter is defined using the ellipsis (...) to signify that that parameter is a placeholder for any number of arguments. The rest parameter directly addresses the issues with arguments. First, it stands for the rest of the param- eters and so is highly visible in the parameter list. Second, the rest parameter is of Array type.

`const max = function(...values) { console.log(values instanceof Array); let large = values[0]; for(let i = 0; i < values.length; i++) { if(values[i] > large) { large = values[i]; } } return large; }; console.log(max(2, 1, 7, 4));`

Let’s look at the output of this code before discussing further:
true 7
The output shows that the rest parameter is an Array. This means we can use better, more fluent, and expressive functions on the rest parameter than we could ever use on arguments.

JavaScript has some reasonable rules for the rest parameter:
• The rest parameter has to be the last formal parameter.
• There can be at most one rest parameter in a function’s parameter list. • The rest parameter contains only values that have not been given an
explicit name.

Overall the rest parameter is one of the good changes to the language. It makes a very powerful feature of receiving a variable number of arguments civil and sensible from both the syntax and the semantics point of view.

### the spread operator

The spread operator looks the same as the symbol (...) used for the rest parameter, but it appears on the calling side of functions instead of on the parameter or receiving side.

The intention of the spread operator is the opposite of that of the rest parameter—spread breaks a collection into discrete values whereas rest gathers discrete values into an array.

Suppose we have a greet() function that takes a rest parameter, like so:

`const greet = function(...names) { console.log('hello ' + names.join(', ')); };`

If we have discrete variables, we can readily send them to the greet() function:
`const jack = 'Jack'; const jill = 'Jill'; greet(jack, jill);`
If we had the names in an array, then we could pass them to the function after indexing into the array:
`const tj = ['Tom', 'Jerry']; greet(tj[0], tj[1]);`
But that’s boring—there’s gotta be a better way. Enter the spread operator.
`greet(...tj);`

The spread operator may be used with any iterable object, and it expands, or spreads, the contained values into discrete values.

The power and versatility of the spread operator is impressive. The spread oper- ator isn’t limited to the calling side of the rest parameter, like in the call to the greet() function. It may be used to spread an array to discrete parameters too, even when no rest parameter is involved.

for example, in the next piece of code the function doesn’t use a rest parameter but the caller uses a spread operator.

`const names1 = ['Laurel', 'Hardy', 'Todd']; const names2 = ['Rock']; const sayHello = function(name1, name2) { console.log('hello ' + name1 + ' and ' + name2); }; sayHello(...names1); sayHello(...names2);`

The function sayHello() takes two separate named parameters. We can use a spread operator to invoke this function. If we pass an array with more values than necessary, the extras are ignored. If we are shy, then the parameter becomes undefined. We can see this from the output:
hello Laurel and Hardy
hello Rock and undefined
We can also mix the spread operator with other discrete arguments and also when the receiver has a mixture of named parameters and the rest parameter.

`const mixed = function(name1, name2, ...names) { console.log('name1: ' + name1); console.log('name2: ' + name2); console.log('names: ' + names); }; mixed('Tom', ...['Jerry', 'Tyke', 'Spike']);`
The function has two named parameters and one rest parameter. The caller is passing a separate stand-alone value 'Tom' followed by a spread argument. The stand-alone argument binds to the first parameter, name1; the first value within the spread argument binds to the second named argument, name2; and the rest of the values in the spread argument go to the rest parameter

name1: Tom
name2: Jerry
names: Tyke,Spike

The spread operator can also be used to copy, concatenate, and manipulate arrays:

`const names1 = ['Tom', 'Jerry']; const names2 = ['Butch', 'Spike', 'Tyke']; console.log([...names1, 'Brooke']); console.log([...names1, ...names2]); console.log([...names2, 'Meathead', ...names1]);`

The argument passed to the first log() call creates a new array with all of the values from the array names1 and an additional value as the last element. The argument passed to the second log creates a new array by concatenating arrays names1 and names2. The last one creates a new array with all of the elements from names2 followed by one arbitrary new element, then again fol- lowed by all of the elements from the names1 array. The output reflects the action of the code:
[ 'Tom', 'Jerry', 'Brooke' ][ 'tom', 'jerry', 'butch', 'spike', 'tyke' ]
[ 'Butch', 'Spike', 'Tyke', 'Meathead', 'Tom', 'Jerry' ]

The spread operator has yet another charming capability. It may be used to copy contents of an object while optionally providing new values for some field and/or adding new fields.

const sam = { name: 'Sam', age: 2 };
console.log(sam);
console.log({...sam, age: 3});
console.log({...sam, age: 4, height: 100 });
console.log(sam);

We first print the original object created on the first line. Then we make a copy of the object while replacing the age field with a new value of 3. Then, we make another copy, this time replacing age with the value 4 while inserting a new height field. The last line outputs the original object to confirm it has not changed. Here’s the output:
{ name: 'Sam', age: 2 }
{ name: 'Sam', age: 3 }
{ name: 'Sam', age: 4, height: 100 }
{ name: 'Sam', age: 2 }

### defining default values for parameters

Parameters can take default values that step in for any missing arguments. We can benefit from default parameters in one of three ways:

- As a user of a function, we don’t have to pass in a value for a parameter if the value we intend to send is the same as the sensible default chosen by the creator of the function

- As the author of a function, we can evolve the function signature more freely, to add a new parameter, without breaking existing code

- We can compensate for the lack of function overloading in JavaScript. Many modern languages provide function overloading, but JavaScript does not. With default parameters, the caller may pass a different number of parameters, giving the illusion of using overloaded functions.

`const sortByTitle = function(books) { const byTitle = function(book1, book2) { return book1.title.localeCompare(book2.title); }; return books.slice().sort(byTitle); };`

Within the sortByTitle() function we sort the given books array, but instead of calling sort() directly on the array we first use slice() and then sort(). The reason for not using sort() directly is that it will modify the array on which it is called—changing the input given to a function is a poor programming practice. The slice() function makes a copy of the given array and the sort() function then sorts the copy, thus not affecting the original array given as input.

Let’s call the sortByTitle() function with some sample data.
const books = [
{ title: 'Who Moved My Cheese' },
{ title: 'Great Expectations' },
{ title: 'The Power of Positive Thinking' }
];

The output of this call is the books sorted by title:
[ { title: 'Great Expectations' },
{ title: 'The Power of Positive Thinking' },
{ title: 'Who Moved My Cheese' } ]

Now suppose after a few weeks we’re asked to enhance the function. While the users of our function mostly sort the books in the ascending order of the title, sometimes they may want to sort them in the descending order. We could write a new function for that, but that will result in duplication of sig- nificant code. If we change the function to take in an additional parameter, that may break existing code.

Technically, if we suddenly throw in a new extra parameter, the existing code will actually not be affected—at least not immediately. When the call is made, the value for the newly added parameter will come in as undefined. The code will then have to do undefined checks on the value of that new parameter
Furthermore, when the user of the function revisits he or she will be quite confused and start providing the necessary parameter; that’s no fun either. The solution: default parameters.

Let’s rework the function to use a default parameter:

`const sortByTitle = function(books, ascending = true) { const multiplier = ascending ? 1 : -1; const byTitle = function(book1, book2) { return book1.title.localeCompare(book2.title) \* multiplier; }; return books.slice().sort(byTitle); };`

We added a second parameter, ascending, but gave it a default value of true. If the caller does not provide a value for this parameter, then a value of true is assumed for it. If a value is given, however, then that value is used.
Within the function, we create a local variable named multiplier, which holds a value of 1 if the value of ascending is true and -1 otherwise. We used the ternary operator, to keep the code concise, for this evaluation of multiplier. The localeCom- pare returns a positive number, a zero, or a negative number depending on whether the first value is greater, equal to, or smaller, respectively, than the second value. The multiplier of 1 will preserve that ordering whereas a value of -1 reverses it.

Let’s repeat the old call to the function, but also add a new call to pass the value of false to the newly added parameter.
console.log(sortByTitle(books)); console.log(sortByTitle(books, false));
Since the first call is not passing any value for the second argument, the default value kicks in for the second parameter and the sorting happens in the ascending order. However, since a value is passed to the second argument in the second call, that value will appear for the second parameter. Let’s quickly take a look at the output of these two calls:
[ { title: 'Great Expectations' },
{ title: 'The Power of Positive Thinking' },
{ title: 'Who Moved My Cheese' } ][ { title: 'who moved my cheese' }, { title: 'the power of positive thinking' }, { title: 'great expectations' } ]

### multiple default parameters

A function can have any number of default parameters. For example, let’s define a function with one regular parameter and two default parameters.

`const fetchData = function( id, location = { host: 'localhost', port: 443 }, uri = 'employees') { console.log('Fetch data from https://' + location.host + ':' + location.port + '/' + uri); };`

The caller of this function may pass three arguments, pass two arguments and leave out the value of the last parameter, or pass one argument and leave out both of the default parameters.

`fetchData(1, { host: 'agiledeveloper', port: 404 }, 'books'); fetchData(1, { host: 'agiledeveloper', port: 404 }); fetchData(2);`

In the first call, the given values were used for all three parameters, as we see in the following output. In the second call, the default value was used for the uri parameter. In the third call, both uri and location received the default values.
Fetch data from https://agiledeveloper:404/books
Fetch data from https://agiledeveloper:404/employees
Fetch data from https://localhost:443/employees

### Passing undefined \*\*\* tricky

Pass what?! Yep, that nasty undefined.
What if the calling code of the fetchData() function wants to pass a value for the uri parameter but not for location—it wants to use the default value for that.

We can think of two possibilities, neither of which is true in JavaScript:
• Don’t permit that. Some languages that provide default parameters follow this rule. They will require values for all parameters to the left if you specify the values for a default parameter. In other words, in these languages, if we choose to use the default value for a parameter, we are forced to use default values for all parameters that follow. JavaScript does not have that rule.

• Require an empty parameter, like for example, fetchData(3,, 'whatever'). Thankfully, JavaScript does not allow that—imagine a function call like foo(1,,, 7,,, 20), delivered straight from hell.

But JavaScript permits passing undefined, and that has a special horror effect. Here are the JavaScript rules:
• If a good value is passed to the default parameter, then that given value is used.
• If null is passed, then the value for the parameter is null—fair deal. So, don’t pass null; after all, null is a smell.
• If undefined is passed, however, then the default value is given to the parameter in place of undefined.
Due to this feature, we may call the fetchData() function to provide a value for uri and use the default value for the location parameter, like so:

`fetchData(3, undefined, 'books');`
That call will give this result:
Fetch data from https://localhost:443/books

Passing undefined arguments in method calls is rather unpleasant, but the feature of mapping undefined to default values is quite powerful.

### Expressions as Default Values

The default values are not limited to literals. Expressions are welcome as well, and that’s quite powerful

The expression that evaluates a default value for a parameter may use other parameters to the left. This gives the ability to compute the default value for a parameter based on other parameters’ values, default or not.

`const computeTax = function(amount, stateTax = 15, localTax = stateTax * .10) { console.log('stateTax: ' + stateTax + ' localTax: ' + localTax); };`

The computeTax() function takes a required parameter followed by stateTax, which has a default value. The last parameter, localTax, uses an expression to compute the default value. The expression computes the value based on the current value of stateTax.
If the user gives a value for stateTax and localTax, then those given values are used and neither the default value nor the expression has any effect. If the user gives a value for the stateTax only, then the localTax is computed based on the given value for stateTax. If both stateTax and localTax are left out by the caller, then localTax is computed based on the default value for stateTax.

computeTax(100, 10, 2);
computeTax(100, 10);
computeTax(100);
Let’s glance at the output:
stateTax: 10 localTax: 2
stateTax: 10 localTax: 1
stateTax: 15 localTax: 1.5

### wrapping up

The rest parameter is a good replacement for arguments—just as powerful minus the perils. The same symbol (...) when used on the calling side becomes the spread operator. In addition to these two additions related to function param- eters/arguments, JavaScript now has the ability to assign default values to parameters. This last feature especially is very useful to extend existing functions for adding new parameters. In the next chapter, we will look at nice ways to iterate over collections of data.
