---
title: "Some of JavaScript Tricks"
date: 2019-08-19 07:00:00
author: "jonath Frank"
image: ../../images/004-1.jpg
tags:
  - javaScript
  - webDevelopment
---

Traditionally JavaScript has used var to define variables. Moving forward, we should not use that keyword. Instead, we should choose between using const and let.

In this Article, I’ll start by learning:

- why var is a bad idea,
- why it’s still there,
- and why we should avoid it.
- Then I’ll talk about the strengths, capabilities, and some limitations of using let.
- Finally, I’ll explore const and discuss when to use it instead of let.

### out with var

var does two things poorly. First, it does not prevent a variable from being redefined in a scope. Second, it does not have block scope. Let’s explore these two issues with examples.

#### redefining

check the below code :

    var max = 100;
    console.log(max); 4
    var max = 200;
    console.log(max);

If the programmer intended to assign a new value to an existing variable, then there should be no var declaration on that line. It appears, though, that the programmer intended to define a new variable, which happens to have the same name as an existing variable, thus accidentally erasing the previously stored value in that variable.

in various situations when you write several lines of code , it is possible that by accident you may redfine a variable for a different purpose . JS does not give any hint of the var being redefined !!

#### No block Scope

Variables defined using var within functions have function scope. Sometimes we may want to limit the scope of a variable to a smaller scope than the entire function. This is especially true for variables that are defined within a branch or a loop

        `
        console.log(message);
        console.log('before the loop');
         for(var i = 0; i < 3; i++)
         {
            console.log(message); //visible here, but undefined
            var message = 'spill ' + i;
        }
        console.log('after the loop');
        console.log(message);
        `

The variable message was defined within the loop—what happens in a loop should stay in the loop, but vars are not good at keeping secrets (poor encap- sulation). The variable spills over the loop and is visible outside the loop—var hoists the variable to the top of the function. As a result, both message and the loop index variable i are visible throughout the function.

Here’s the output of running the previous code:
undefined
Entering loop
undefined
spill 0
spill 1
Exiting loop
spill 2

In short, var is a mess; don’t use it.

### In with Let

let is the sensible replacement for var. Anywhere we used var correctly before we can interchange it with let. let removes the issues that plague var and is less error prone.

#### no redefinition

-let does not permit a variable in a scope to be redefined. Unlike var, let behaves a lot like variable definitions in other languages that strictly enforce variable declarations and scope. If a variable is already defined, then using let to redefine that variable will result in an error.

#### Block Scope

Variables declared using let have block scope. Their use and visibility is limited to the block of code enclosed by the {...} in which they’re defined. Furthermore, unlike var, variables defined using let are available only after their point of definition. That is, the variables are not hoisted to the top of the function or the block in which they’re defined.

//console.log(message); //ERROR if this line is uncommented
console.log('before the loop'); for(let i = 0; i < 3; i++) {
//console.log(message); //ERROR if this line is uncommented
let message = 'spill ' + i; }
console.log('after the loop');
//console.log(message); //ERROR if this line is uncommented

This code illustrates the semantic difference between var and let. First, the variable defined within the block is not visible outside the block. Furthermore, even within the block, the variable is not visible before the point of definition.

### const

The const keyword is used to define a variable whose value shouldn’t change. If you intend to modify the value in a variable, then define it using let; other- wise, define it using const.

`let price = 120.25; const tax = 0.825; price = 110.12; tax = 1.25;`

There’s no issue changing the value of the price variable. However, since tax is defined as a constant, we will get a runtime error when we try to modify the value:
tax = 1.25; ^
TypeError: Assignment to constant variable.

#### Limitations of const

Only primitive values, like number, and references to objects are protected from change. The actual object that the reference refers to does not receive any protection from the use of const.
check the below code :

`const max = 200; const ok = true; const nothing = undefined; const nope = null; const sam = { first: 'Sam', age: 2 }; //max = 200; //Not allowed //ok = true; //Not allowed //nothing = undefined; //Not allowed //nope = null; //Not allowed //sam = { first: 'Sam', age: 2 }; //Not allowed sam.age = 3;`

The variable max, of type number, is defined as a constant variable and initialized to a value of 200. The value of max is now set permanently, like my opinions of politicians. We can’t legally place max on the left-hand side of the equals sign, even under the pretense of resetting it to the value it already contains. The same is the case with ok, which is of type boolean, and nothing, which is of type undefined. nope and sam are references and can’t be altered.
JavaScript const is like final in Java and readonly in C#—all of these protect only primitives and references. None of these protect the object being referenced. In the previous example, the reference sam is a handle to an object with two properties: first and age. While the const prevents us from changing the reference sam, it does not care about any change to the internals of the object. Thus, setting the age of sam to a different value had no issues.

To make a reference immutable, use const. However, to make an object itself immutable, we need some additional help from JavaScript

#### how to make an object itself immutable

The answer is the freeze() method in Object.

`'use strict'; const sam = Object.freeze({ first: 'Sam', age: 2 }); //sam = {}; //ERROR, the reference sam is immutable sam.age = 3; console.log(sam.age);`

Right after we created the object, we passed it through the freeze() method of Object. This returns a reference to an object that is immutable. We assign the reference to a constant variable named sam. Now, the reference is immutable thanks to const. Furthermore, the object itself is immutable due to freeze(),

sam.age = 3; ^
TypeError: Cannot assign to read only property 'age' of object '#<Object>'

There’s a caveat in using the freeze() method, however. It is a shallow freeze, not deep. The freeze() method makes only top-level properties of an object read- only. If a property in turn refers to another object, instead of a primitive type, then that nested object is not made read-only by the call to the freeze() method.

### wrapping up :

- var declarations are globally scoped or function scoped while let and const are block scoped.

- var variables can be updated and re-declared within its scope; let variables can be updated but not re-declared; const variables can neither be updated nor re-declared.
- They are all hoisted to the top of their scope but while varvariables are initialized with undefined, let and const variables are not initialized.

- While var and let can be declared without being initialized, const must be initialized during declaration.
