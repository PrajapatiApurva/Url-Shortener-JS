const shortId=require('short-unique-id');
//Instantiate
const uid = new shortId();

// Random UUID
console.log(uid.rnd());

// Sequential UUID
// console.log(uid.seq());

// /^(http|http)