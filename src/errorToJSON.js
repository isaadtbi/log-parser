var fs = require('fs');
var lineReader = require('readline').createInterface({
    input: fs.createReadStream('./data/ssl_error_log-20240413.txt')
  });
  
  let lineCount = 0;
  let errorsArray = [];
  lineReader.on('line', function (line) {
    lineCount++
    //console.log(line);
    
    if (line.length > 0 ) {
        let unparsedError = line;
        //if the string has content (just a double check incase linereader doesnt check it)
        var errorArr = unparsedError.split(/\[([^[\]]*)\]/);
        let date = errorArr[1], type = errorArr[3], pid = errorArr[5], ip = errorArr[7], message = errorArr[8].trim();
        //1. date 2. typeofError 3. pid 4. clientIP 5. Error
        //the only common error is the 5. error object.
        //todo: split them into 5 parts
        const errorObject = {
            date, type, pid, ip, message
        }
        errorsArray.push(errorObject);
        //save this new array to a file for every error for now.
    }


    //this is for testing with just one line. force exit the process to debug each line as needed.
    //process.exit(0);
    //console.log('Line from file:', line);
  });
  
  lineReader.on('close', function () {
    // var json = JSON.stringify(errorsArray);
    // fs.writeFileSync("./results/errors.json", json, function(err) {
    //     if (err) throw err;
    //     console.log('complete');
    //     }
    // );
        console.log(lineCount)
        process.exit(0);
  });