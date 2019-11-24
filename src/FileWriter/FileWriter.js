import * as fs from 'fs';
import * as path from 'path';


class FileWriter {

    constructor(directory="FilesForAnalysis") {
        this.directory = directory;
    }

    // Writes a single file to FilesForAnalysis
    writeToFile (fileName, data) {
        return new Promise((resolve, reject) => {
            fs.writeFile(fileName, data, error => {
                if (error) {
                    console.log('writeToFile errror!!!!');
                    reject(error)};
                resolve(`${fileName} written to ${this.directory}!`);
            });
        });
    };


    // Clears FilesForAnalysis of all files
    clearDirectory () {
        return new Promise ((resolve, reject) => {
            fs.readdir(this.directory, (err, files) => {
                if (err) {
                    console.log('clearDirectory error!!!!');
                    reject(err);
                };

                let filesForDeletion = [];
                console.log('clearsDirectory()');
                console.log(files);

                files.map(async (fileName) => {
                    filesForDeletion.push(this.deleteFile(fileName));
                });

                Promise.all(filesForDeletion).then((files) => {
                    resolve(`All files deleted from ${this.directory}!`)

                }).catch((err) => {
                    reject(err);
                });
            });
        });
    };

    deleteFile (fileName) {
        return new Promise((resolve, reject) => {
            fs.unlink(path.join(directory, fileName), err => {
                if (err) reject(err);
                resolve(`${fileName} deleted from ${this.directory}!`)
            });
        })
    }

    // Checks if file is JavasScript file by the file extension
    isJavaScriptFile(fileName) {
        return fileName.split('.').pop() === 'js';
    };
}

export default FileWriter;
