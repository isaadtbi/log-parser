var fs = require('fs');
var lineReader = require('readline').createInterface({
    input: fs.createReadStream('./results/errors.json')
  });
  
  let lineCount = 0,
      occurenceMap = new Map();
  lineReader.on('line', function (line) {
    lineCount++
    //console.log(line);
    try {
      const data = JSON.parse(line);
      // output the parsed data
      data.forEach((value , index) => {
        let errorObject = data[index];
        if (occurenceMap.has(errorObject.message)) {
          //console.log('error exists in map, increment map');
          occurenceMap.get(errorObject.message).occurence++;
        } else {
          occurenceMap.set(errorObject.message, {occurence: 1});
        }
      })
    } catch (err) {
      console.error('Error while parsing JSON data:', err)
    }
    // if (line.length > 0 ) {
    //     let unparsedError = line;
    //     //if the string has content (just a double check incase linereader doesnt check it)
    //     var errorArr = unparsedError.split(/\[([^[\]]*)\]/);
    //     let date = errorArr[1], type = errorArr[3], pid = errorArr[5], ip = errorArr[7], message = errorArr[8].trim();
    //     //1. date 2. typeofError 3. pid 4. clientIP 5. Error
    //     //the only common error is the 5. error object.
    //     //todo: split them into 5 parts
    //     const errorObject = {
    //         date, type, pid, ip, message
    //     }
    //     errorsArray.push(errorObject);
    //     //save this new array to a file for every error for now.
    // }


    // //this is for testing with just one line. force exit the process to debug each line as needed.
    // //process.exit(0);
    // //console.log('Line from file:', line);
  });
  
  lineReader.on('close', function () {
        var json = occurenceMap;
        fs.writeFileSync("./results/occurenceMap.json", JSON.stringify([...occurenceMap]), function(err) {
            if (err) throw err;
            console.log('complete');
            }
        );
        //console.log(occurenceMap)
        //console.log(lineCount)
        process.exit(0);
  });