import * as fs from "node:fs";
import * as util from "node:util";

let filePath = "./src/file/hello.txt";

function closeFile(fd: number) {
  const close = util.promisify(fs.close);

  close(fd)
    .then((data) => {
      console.log(`File closed successfully with fd: ${fd}`);
      // as fs.close returns nothing, data will be undefined
      console.log("data: ", data); // undefined;
    })
    .catch((err) => console.error(err));
}

function readFile(filePath: string) {
  // async by default but w/o promise
  fs.open(filePath, "r", (err, fd) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log("fd: ", fd);
    closeFile(fd);
  });
}

readFile(filePath);
