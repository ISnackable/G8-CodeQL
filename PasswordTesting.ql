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

// Using a predefined weak password such as 'weakpass'
// Should always return false
// Regex matches Minimum eight characters, at least one letter and one number
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
// e.g. Minimum 8 characters, 1 upper case, lowercase, numbers
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

/*
isTest Function

isTest("weakpass") basically compares the "weakpass" string against our regex
Should always returns false as it does not meet the minimum requirement

--------------------------------------------------------------------------------------------------------------------------------

isTest2 Function

var.getAnAssignedExpr() pulls the regex from the database which in this case the PASS_RE regex which is "/^.{1,20}$/"
toString() converts the value returned from the getAnAssignedExpr which is the regex to a string

Only works with a string which explains why toString() is needed
|
v
regexpReplaceAll(regexp, replacement) --> Uses regex to identify the specific character and replaces it with desired character.
Regex ^([/][\\^]) = Matches first character to be "/" and second character to be "^"
 Regex [$]([/])$ = Matches second last character to be "$" and last character to be "/"
 Two backslashes "\\" is require to escape an character apparently therefore the "[\\^]"

---------------------------------------------------------------------------------------------------------------------------------

Using the OR operator to test the functions isTest and isTest2
isTest will always return False

False || True == True
False || False == False

If the regex grabbed from the database has weak complexity requirement as it is compared against the string "weakpass, it will return True.

Returning True allows CodeQL to actually grab the variable from the database instead of ignoring it, therefore displaying it after querying

---------------------------------------------------------------------------------------------------------------------------------

isDummyPassword(vari.getName()) only grabs all regex variable with the names containing pass.
Other regex are unnecessary as this query is only related to passwords

---------------------------------------------------------------------------------------------------------------------------------

vari.getAnAssignedExpr() instanceof RegExpLiteral
This function identifies if the variable obtained is an actualy regex or not, therefore ensuring only regex is returned and nothing else.
*/
isTest("weakpass") or isTest2(vari.getAnAssignedExpr().toString().regexpReplaceAll("^([/][\\^])", "").regexpReplaceAll("[$]([/])$", "")) and isDummyPassword(vari.getName()) and vari.getAnAssignedExpr() instanceof RegExpLiteral


//and isTest(vari.getAnAssignedExpr().toString())
select "Regex related to password may be weak", vari.getAnAssignedExpr()
