var fs = require('fs');
var JSONStream = require( "JSONStream" );

  let folderPath = `./data/`;
  
  let lineCount = 0,
      occurenceMap = new Map();

  fs.readdir(folderPath, (err, files) => {
    files.forEach(file => {
      var lineReader = require('readline').createInterface({
        input: fs.createReadStream(`./data/${file}`)
      });

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
    
            //check if the errorObject already exists in occurenceMap
            if (occurenceMap.has(errorObject.message)) {
              occurenceMap.get(errorObject.message).occurence++;
            } else {
              occurenceMap.set(errorObject.message, {occurence: 1});
            }
    
            //errorsArray.push(errorObject);
            //save this new array to a file for every error for now.
        }
    
    
        //this is for testing with just one line. force exit the process to debug each line as needed.
        //process.exit(0);
        //console.log('Line from file:', line);
      });

      lineReader.on('close', function () {
        var transformStream = JSONStream.stringify();
        var outputStream = fs.createWriteStream(`./results/${file}_occurenceMap.json`);
        transformStream.pipe( outputStream );

        let newMap = new Map([...occurenceMap].sort(([k, v], [k2, v2])=> {
          if (v.occurence < v2.occurence) {
            return 1;
          }
          if (v.occurence > v2.occurence) {
            return -1;
          }
          return 0; 
        }));

        for (var entry of newMap.entries()) {
          transformStream.write(([entry[1], entry[0]]));
        }    
        transformStream.end();

        outputStream.on(
          "finish",
          function handleFinish() {
              console.log("Done");
          }
        );
      });
    });
  });

  

  
