//JavaScript dynamically typed hai.
/*
JavaScript ko koi problem nahi hogi, lekin baad me bug aa sakta hai.

Example:

function add(a, b) {
    return a + b;
}

console.log(add(10, 20));      // 30
console.log(add("10", 20));    // "1020"

Yahan mistake ho gayi, lekin JavaScript error nahi dega.
*/

/*
            TypeScript ka solution

TypeScript compile time par error pakad leta hai.

function add(a: number, b: number): number {
    return a + b;
}

add("10", 20);

Error:

Argument of type 'string' is not assignable to parameter of type 'number'

Code run hone se pehle hi bug mil gaya.

*/
let age = 20;
age = "twenty";  // Allowed