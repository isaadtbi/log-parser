LOG PARSER


errorToJSON.js takes a file as an input inside the ./data directory and formats the logs into a json file with each error being represented
as an object inside an array. The object has key value pairing to make the next step easier. (but it can be combined into one)


index.js takes the json file which is an array of error objects and creates an occurenceMap (still need to sort)



This occurenceMap can be used to see which errors occur the most often.


TODO: take multiple files as input.