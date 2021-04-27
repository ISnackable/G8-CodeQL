import javascript
import DataFlow
import semmle.javascript.security.SensitiveActions
import semmle.javascript.Regexp

// 'Function' to check for variable name
// regexpMatch uses regex expressions as the 'checker'
// .*(pass)*. = Any character before and after 'pass' 
bindingset[password]
predicate isDummyPassword(string password) {
    exists(string normalized | normalized = password.toLowerCase() |
      normalized.regexpMatch(".*(pass).*")
    )
}


// bindingset[tester]
// predicate isTest(string tester) {
//     exists(string normalized | normalized = tester.toLowerCase() |
//       normalized.matches("/^.{1}$/") or normalized.matches("/^.{1,20}$/")
//     )
// }


// Using a predefined weak password such as 'weakpass'
// Should always return false
bindingset[tester]
predicate isTest(string tester) {
    exists(string normalized | normalized = tester.toLowerCase() |
      normalized.regexpMatch("(?=.*[A-Za-z])(?=.*0-9)[A-Za-z0-9]{8,}")// Insert desired Regex for password complexity
    )
}


// Pulls detected regex from database and comapres it to 'weakpass'
// Returns true if password meets the regex requirement such as {1,20}
// Proves that the password regex does not require numbers or special characters .etc
// Therefore using 'or', True || False = True
// CodeQL will return the vulnerable regex

// If password complexity requirement is strong enough
// Should return false
// Therefore False || False == False
// CodeQL will not return anything
bindingset[tester2]
predicate isTest2(string tester2) {
    exists(string normalized  | normalized = "weakpass" |
      normalized.regexpMatch(tester2)  //or normalized.matches("/^.{1,20}$/") 
    )
}

from Variable vari

// isDummyPassword only used when finding specific variable containing 'pass'

// vari.getAnAssignedExpr() instanceof RegExpLiteral
// ^
// |____ Returns all regex variables in the database selected
where 

// Regex ^([/][\\^]) = Matches first character to be "/" and second character to be "^"
// Regex [$]([/])$ = Matches second last character to be "$" and last character to be "/"
isTest("weakpass") or isTest2(vari.getAnAssignedExpr().toString().regexpReplaceAll("^([/][\\^])", "").regexpReplaceAll("[$]([/])$", "")) and isDummyPassword(vari.getName()) and vari.getAnAssignedExpr() instanceof RegExpLiteral


//and isTest(vari.getAnAssignedExpr().toString())
select "Regex is weak for now", vari.getAnAssignedExpr()
