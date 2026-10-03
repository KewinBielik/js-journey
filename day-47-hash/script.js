// Lesson 47 — passwords are stored as hashes. No Express, no React.
// Read LESSON.md. Run: node script.js
//
// scryptSync is NOT a global. randomUUID was. This one needs an import.

import { scryptSync, randomBytes, timingSafeEqual } from "node:crypto";


// TODO (Goal 1): make a salt with randomBytes(16), then hash a password with
// scryptSync(password, salt, 32). Log both. Run the script twice.

const salt = randomBytes(16);
const hash = scryptSync("someSeriousPassword1234", salt, 32);
console.log(`the salt - ${salt}, the hash - ${hash}`);


// TODO (Goal 2): hash the same password with the same salt again.
// Compare the two hashes with timingSafeEqual. Predict the result first.

const hash2 = scryptSync("someSeriousPassword1234", salt, 32)
console.log(`the other hash - ${hash2}`);
if (timingSafeEqual(hash, hash2)){
    console.log("they are equal");
}

// TODO (Goal 3): a checkPassword(password, salt, expectedHash) function.
// It should return true for the right password and false for a wrong one.
// Wrong passwords must return false, not throw.

function checkPassword(password, salt, expectedHash) {
    const checkingHash = scryptSync(password, salt, 32);
    if (timingSafeEqual(checkingHash, expectedHash)){
        return true;
    }
    return false;
}

console.log(checkPassword("someSeriousPassword1234", salt, hash));
console.log(checkPassword("notReallySeriousPassword", salt, hash));

// TODO (Goal 4): two users, same password, different salts.

const salt3 = randomBytes(16);
const hash3 = scryptSync("justAPassword", salt3, 32);
const salt4 = randomBytes(16);
const hash4 = scryptSync("justAPassword", salt4, 32);

if (!timingSafeEqual(hash3, hash4)){
    console.log("The hashes dont match");
}

// Log whether their hashes match. Predict first.
