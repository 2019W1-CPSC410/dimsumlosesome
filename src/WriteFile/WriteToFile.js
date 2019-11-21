import * as fs from 'fs';
import * as path from 'path';


class FileWriter {

    constructor(directory="FilesForAnalysis") {
        this.directory = directory;
    }

    // Writes a single file to FilesForAnalysis
    writeToFile (filename, data) {
        fs.writeFile(this.directory + '/' + filename, data, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
    };

    // Clears FilesForAnalysis of all files
    clearDirectory () {
        fs.readdir(this.directory, (err, files) => {
            if (err) throw err;

            files.map((file) => {
                fs.unlink(path.join(directory, file), err => {
                    if (err) throw err;
                });
            });
        });
    };

    // Checks if file is JavasScript file by the file extension
    isJavaScriptFile(fileName) {
        return fileName.split('.').pop() === 'js';
    };

}

export default FileWriter;
