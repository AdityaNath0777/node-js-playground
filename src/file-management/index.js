console.log("**** File Management in Node.js ****");
console.log("\n\n");

/**
 * Async call
 */
// import fs from "node:fs";

// fs.stat("./file/hello.txt", (err, stats) => {
//   if (err) {
//     console.error(err);
//     return;
//   }

//   console.log("stats: ", stats);
// });

// console.log("yo");

/**
 * Synchronus call
 */
// import fs from "node:fs";

// try {
//   const stats = fs.statSync("./file/hello.txt");
// //   const stats = fs.statSync("/file/hello.txt"); // to throw error
//   console.log(stats);
// } catch (err) {
//   console.error(err);
// }

/**
 * Promise based Async call
 */
// import fs from "node:fs/promises";

// async function asyncFileCall(filePath) {
//   try {
//     const stats = await fs.stat(filePath);
//     console.log(stats);
//   } catch (err) {
//     console.error(err);
//   }
// }

// let filePath = "./file/hello.txt"; // uses relative path from the location where the script has been called
// let wrongFilePath = "/file/hello.txt"; // uses absolute path with respect to current disk (disk c, d, f, etc.)

// asyncFileCall(filePath);
// asyncFileCall(wrongFilePath);

/**
 * paths
 */
// import path from "node:path";

// /**
//  * Neither resolve nor normalize will check if the path exists.
//  * They just calculate a path based on the information they got.
//  */

// let filePath = "./file/hello.txt";

// console.log("file path: ", filePath);
// console.log("directory name: ", path.dirname(filePath));
// console.log("basename: ", path.basename(filePath));
// console.log("extension name: ", path.extname(filePath));

// // to get the file name
// console.log(
//   "file name: ",
//   path.basename(
//     filePath,
//     // suffix to remove from the result
//     path.extname(filePath)
//   )
// );

// // joining two & more paths
// const name = "yahoo";
// console.log(
//   "path joining example: ",
//   path.join("/", "users", name, "hello.txt")
// );

// // to get path from absolute path
// console.log(
//   "absolute path: ",

//   /**
//    * it will simply append hello.txt at the end of absolute path where the script has been invoked
//    */
//   path.resolve("hello.txt")
// );
// console.log("absolute path: ", path.resolve("file", "hello.txt"));

// console.log(
//   "absolute path: ",

//   /**
//    * starting with slash makes it absolute path
//    */
//   path.resolve("/file", "hello.txt") // F:\file\hello.txt // (on windows)
// );

// console.log(
//   "actual path: ",

//   /**
//    * it will try and calculate the actual path,
//    * when it contains relative specifiers like . or .., or double slashes:
//    */
//   path.normalize("/file/hello.txt"), //  \file\hello.txt (on windows)
//   path.normalize("/file/hello-txt/..//hello.txt") //  \file\hello.txt (on windows)
// );

/**
 * Working with file descriptors in Node.js
 *
 *
 * A file descriptor is a reference to an open file, a non-negative integer (fd),
 * it's not a memory address,
 * returned by opening the file using the open() method offered by the fs module.
 * This number (fd) uniquely identifies an open file in operating system
 *
 * fd is the key in the current process's table managed by the OS kernel
 * the OS manages the metadata such as location on disk, size, perms, stream,
 * access times, current offset (stream position) etc. for each open file
 *
 * when we read the file content, the OS kernel first loads it in the kernel buffer,
 * if frequently used, will cache it in the RAM
 * then will send it to the application code.
 *
 * Data is read from disk into these kernel-managed RAM buffers,
 * and then copied to our application's buffers.
 *
 * OS acts like a middleman between the node (or any other env. irrespective of programming language)
 * and the actual data for the disk
 *
 * OS maintains a table for each process and handles the state management
 *
 */
// import fs from "node:fs";
// import util from "node:util";

// let filePath = "./file/hello.txt";

// fs.open(
//   filePath,
//   // read-only mode -> throw err if file doesn't exists
//   // positions stream at the top of the file // handled by the OS
//   "r",
//   (err, fd) => {
//     if (err) {
//       console.error(err);
//       return;
//     }

//     console.log("file descriptor: ", fd);

//     /**
//      *  to avoid memory-leak
//      */

//     // fs.close(fd, () => {
//     //   console.log("inside fs.close callback");
//     // });

//     // // this will be called first as fs.close will run asyncly
//     // console.log("Asynchronously: file closed successfully!");

//     const closeFileStream = util.promisify(fs.close);
//     closeFileStream(fd)
//       .then((data) => {
//         console.log(
//           "any data returned ? data (should be undefined as fs.close(fd) does not return anything): ",
//           data
//         );
//         console.log("Asynchronously: file closed successfully!"); // this will run after successfully closing the file
//       })
//       .catch((err) => console.error("Error closing file:", err));
//   }
// );

// try {
//   const fd = fs.openSync(filePath, "r");
//   console.log("file descriptor: ", fd);

//   // to avoid memory-leak
//   fs.closeSync(fd);
//   console.log("Synchronously: file closed successfully!");
// } catch (err) {
//   console.error(err);
// }

/**
 * r  -> read-only
 *    -> positions stream at the top of the file (i.e. current offset 0)
 *    -> throws err id file doesn't exists
 *
 * r+ -> read & write
 *    -> rest same as r
 *
 * w  -> write-only
 *    -> truncates the file content and positions the stream the top of the file  (i.e. current offset 0)
 *    -> creates new file it doesn't exists
 *
 * w+ -> read & write
 *    -> for both read & write, stream is at the top of the file (i.e. current offset 0)
 *    -> rest same as w
 *
 * a  -> write-only with append
 *    -> appends new data at the end of the file even if we use fs.seek to go to another location
 *        as by design OS will ignore any specified position
 *    -> positions stream at the end of the file (i.e. current offset moves to the end)
 *    -> creates new file it doesn't exists
 *
 * a+ -> read and write-with-append
 *    -> read stream is at the top (i.e. current offset is 0)
 *        & write stream is at the end of the file (i.e. current offset moves to the end)
 *    -> rest same as a
 */

/**
 * My notes enhanced by AI (gemini 2.5 flash (free-tier))
 */
/**
 * File Descriptors (FDs) - The Low-Level OS Handle
 *
 * An FD is a non-negative integer. It's not a memory address.
 * It's an index into the *per-process file descriptor table*, managed by the OS kernel.
 * This table points to the system-wide open file table, which holds file state (offset, mode).
 *
 * OS Responsibility:
 * The OS kernel is the sole authority managing disk I/O, file metadata (location, size, perms, access times),
 * and the current file offset (stream position) for *each open file*.
 *
 * Data Flow (Read):
 * 1. Application requests read (e.g., fs.read()).
 * 2. OS kernel loads data from disk into *its own kernel buffer/page cache* (RAM).
 * This cache is optimized; frequently accessed blocks *will* be cached for speed.
 * 3. Kernel copies requested data from its buffer to the *application's buffer* (your JavaScript `Buffer` object).
 *
 * The OS is the crucial intermediary (the "middleman") between your Node.js process
 * and the physical disk. It provides an abstraction layer over hardware complexities.
 * Each process gets its own FD table, isolated from others, for state management.
 */
// import fs from "node:fs"; // Explicit 'node:' protocol for built-in module clarity.
// import util from "node:util"; // For promisify, to convert callback APIs to Promises.

// const filePath = "./file/hello.txt"; // Define as const; it's not reassigned.

// // --- Asynchronous File Opening (Callback API) ---
// fs.open(
//   filePath,
//   // 'r' flag:
//   // - Read-only access.
//   // - Initial file offset is 0 (start of file).
//   // - **CRITICAL**: Fails with ENOENT error if file does not exist.
//   "r",
//   (err, fd) => {
//     // Always handle errors FIRST in callbacks. No error, no FD.
//     if (err) {
//       console.error(`ERROR (Async open): ${err.message}`); // Log error message for clarity.
//       return; // Terminate execution in this branch.
//     }

//     console.log(`Async FD opened: ${fd}`); // Confirm FD was successfully obtained.

//     // --- Resource Cleanup (Async - Promise-based) ---
//     // Promisify fs.close for modern async/await patterns.
//     const closeFileStream = util.promisify(fs.close);

//     closeFileStream(fd)
//       .then(() => { // fs.close resolves with no value; 'data' param is always 'undefined'.
//         console.log(`Async FD ${fd} closed successfully.`);
//       })
//       .catch((closeErr) => {
//         // ALWAYS catch promise rejections. Unhandled rejections crash processes.
//         console.error(`ERROR (Async close FD ${fd}): ${closeErr.message}`);
//       });
//   }
// );

// // --- Synchronous File Opening (Blocking API) ---
// // Use sparingly in server applications (blocks event loop).
// // Useful for startup, small scripts, or when strict sequentiality is required.
// try {
//   const fd = fs.openSync(filePath, "r"); // Throws error if file doesn't exist.
//   console.log(`Sync FD opened: ${fd}`);

//   // --- Resource Cleanup (Synchronous) ---
//   // Close the FD immediately. Essential to prevent resource leaks.
//   fs.closeSync(fd);
//   console.log(`Sync FD ${fd} closed successfully.`);
// } catch (err) {
//   // Catch errors for synchronous calls. Errors are thrown, not passed in callbacks.
//   console.error(`ERROR (Sync open/close): ${err.message}`); // Log error message.
// }

// /**
//  * File Open Flags (O_FLAGS) - Core Behaviors:
//  *
//  * 'r'  : Read-only.
//  * - Initial offset: 0.
//  * - **FAIL if file does not exist.**
//  *
//  * 'r+' : Read & Write.
//  * - Initial offset: 0.
//  * - **FAIL if file does not exist.**
//  *
//  * 'w'  : Write-only.
//  * - **CRITICAL**: If file exists, **TRUNCATES to 0 length** (destroys content).
//  * - Initial offset: 0 (after truncation).
//  * - **CREATES file if it does not exist.**
//  *
//  * 'w+' : Read & Write.
//  * - **CRITICAL**: If file exists, **TRUNCATES to 0 length**.
//  * - Initial offset: 0 (for both read/write, after truncation).
//  * - **CREATES file if it does not exist.**
//  *
//  * 'a'  : Write-only (Append).
//  * - **WRITES ALWAYS POSITIONED AT END OF FILE**, regardless of explicit seeks.
//  * (OS handles `O_APPEND` flag; it overrides current offset for writes).
//  * - Initial *read* offset: 0. (Though you mostly write).
//  * - **CREATES file if it does not exist.**
//  *
//  * 'a+' : Read & Write (Append).
//  * - **READS**: Start at offset 0.
//  * - **WRITES**: Always positioned at end of file.
//  * - **CREATES file if it does not exist.**
//  */

/**
 * Reading files with Node.js
 */

// import fs from "node:fs";
// import util from "node:util";

// var filePath = "/file/hello.txt";

// function closeFileStream(fd) {
//   const close = util.promisify(fs.close);
//   close(fd)
//     .then(() => console.log(`File with fd: ${fd} closed successfully!`))
//     .catch((err) =>
//       console.error(`Failed to close file with fd: ${fd} :: `, err)
//     );
// }

// fs.readFile(
//   filePath,
//   // encoding
//   "utf-8",
//   (err, data) => {
//     console.log(`***********************************************************`);

//     console.log("Async: read file");
//     if (err) {
//       console.error(`Async: Failed to open file with path: ${filePath}: `, err);
//       return;
//     }

//     console.log(`Async: file content: ${data}`);

//     // closeFileStream(fd); // no need as it's done internally
//   }
// );

// try {
//   console.log(`***********************************************************`);

//   console.log("Sync: read file");
//   const data = fs.readFileSync(filePath, "utf-8");
//   console.log("Sync: type of data: ", typeof data);
//   console.log("Sync: file content: ", data);
// } catch (err) {
//   console.error(`Sync:: Failed to read file with path: ${filePath}: `, err);
// }

// async function readFileExample(filePath, encoding = "utf-8") {
//   console.log(`***********************************************************`);
//   console.log("Async helper: custom read file exmaple function");

//   try {
//     const read = util.promisify(fs.readFile);
//     const data = await read(filePath, encoding);

//     console.log(`Async helper: file content: `, data);
//   } catch (err) {
//     console.error(
//       `Async helper:: Failed to read filwe with path: ${filePath}: `,
//       err
//     );
//   }
// }

// readFileExample(filePath);

/**
 * All three of fs.readFile(), fs.readFileSync() and fsPromises.readFile()
 * read the full content of the file in memory before returning the data.
 *
 * This means that big files are going to have a major impact on your memory consumption
 * and speed of execution of the program.
 */

// /**
//  * In this case, a better option is to read the file content using streams.
//  */

// import fs from "node:fs";
// import path from "node:path";
// import { pipeline, finished } from "node:stream/promises";

// const fileUrl = "https://www.gutenberg.org/files/2701/2701-0.txt";
// const outputFilePath = path.join(process.cwd(), "my-output.md");

// async function downloadFile(url, outputPath) {
//   try {
//     const response = await fetch(url);
//     // console.log("response: ", response);

//     if (!response.ok) {
//       throw new Error(`Failed to fetch ${url}, Status: ${response.status}`);
//     }

//     // pass the file path into the write stream
//     const fileStream = fs.createWriteStream(outputPath);
//     console.log(`Downloading file from ${url} to ${outputPath}`);

//     // pass pipeline src and fileStream to the pipeline
//     await pipeline(response.body, fileStream);
//     console.log(`File downloaded successfully`);
//   } catch (err) {
//     throw err;
//   }
// }

// async function readFile(filePath) {
//   const readStream = fs.createReadStream(filePath);

//   try {
//     for await (const chunk of readStream) {
//       console.log("");
//       console.log(`--- File chunk start ---`);
//       console.log(chunk); // on observation I found the chunk is binary buffer
//       console.log(`--- File chunk end ---`);
//       console.log("");
//     }

//     console.log(`Finished reading the file.`);
//   } catch (err) {
//     console.error(`Error reading file: ${err.message}`);
//   }
// }

// async function readWriteStreamExample(url, outputPath) {
//   try {
//     // download and write the file in chunks
//     await downloadFile(url, outputPath);

//     // read the file in chunks
//     await readFile(outputFilePath);
//   } catch (err) {
//     console.error(err);
//     process.exit(1);
//   }
// }

// readWriteStreamExample(fileUrl, outputFilePath);

/**
 * AI enhanced version of read & write file in Node.js using streams
 */

// /**
//  * Asynchronous File Streaming with Node.js
//  *
//  * This example demonstrates downloading a file over HTTP(S) and streaming its content
//  * to a local file, then reading that local file in chunks using Node.js streams.
//  *
//  * Key Concepts:
//  * 1.  `fetch`: The modern, promise-based API for making network requests.
//  * - `response.body`: A `ReadableStream` providing the network response data.
//  * 2.  `fs.createWriteStream`: Creates a `WritableStream` for writing data to a file.
//  * 3.  `fs.createReadStream`: Creates a `ReadableStream` for reading data from a file.
//  * 4.  `node:stream/promises.pipeline`: The robust way to connect Readable and Writable streams.
//  * - Handles backpressure (flow control) automatically.
//  * - Manages stream closing and error propagation across the pipeline.
//  * - Returns a Promise, simplifying async flow.
//  * 5.  `for await...of` with `ReadableStream`: Modern, elegant way to consume stream data in chunks.
//  *
//  * Design Principles for Robust I/O:
//  * - **Error Handling**: Crucial for all I/O operations. Anticipate network issues, file system errors, etc.
//  * - Catch errors at the source (`fetch`, `pipeline`, `readStream`).
//  * - Propagate errors up the call stack to a central handler.
//  * - **Resource Management**: Explicitly close file handles or rely on abstractions that do it for you (`pipeline`).
//  * - `createWriteStream` and `createReadStream` manage underlying FDs internally,
//  * and `pipeline` ensures they're closed on completion/error.
//  * - **Streaming**: Essential for large files. Avoid loading entire files into memory (`fs.readFile`)
//  * unless absolutely necessary, to prevent OOM (Out Of Memory) errors.
//  * - **Asynchronicity**: All network and file I/O should be non-blocking. Use `async/await` with promises.
//  */

import fs from "node:fs"; // Node.js File System module.
import path from "node:path"; // Node.js Path module for cross-platform path handling.
import { Transform } from "node:stream";
import { pipeline } from "node:stream/promises"; // For robust stream piping. `finished` is often unnecessary when using `pipeline`.

// Source URL for the file to download.
const fileUrl = "https://www.gutenberg.org/files/2701/2701-0.txt";
// Destination path for the downloaded file. `process.cwd()` is current working directory.
const outputFilePath = path.join(process.cwd(), "temp/my-output.md");

/**
 * Downloads a file from a URL and streams it to a local file.
 * Handles network errors and stream pipeline errors.
 * @param {string} url - The URL of the file to download.
 * @param {string} outputPath - The local path to save the downloaded file.
 * @returns {Promise<void>} - A Promise that resolves when the download is complete.
 */
async function downloadFile(url, outputPath) {
  try {
    const response = await fetch(url); // Initiate network request.

    // Validate HTTP response status. Non-2xx indicates a server-side issue.
    if (!response.ok) {
      // Throw a specific error for failed HTTP status.
      throw new Error(
        `Failed to fetch ${url}, Status: ${response.status} ${response.statusText}`
      );
    }

    // `fs.createWriteStream` creates a writable stream to the specified path.
    // It automatically opens/closes the underlying file descriptor.
    const fileStream = fs.createWriteStream(outputPath);
    console.log(`Downloading file from ${url} to ${outputPath}...`);

    // `pipeline` connects the readable stream (response.body) to the writable stream (fileStream).
    // It automatically handles backpressure, error propagation, and stream closing.
    await pipeline(response.body, fileStream);
    console.log(`File downloaded successfully to ${outputPath}.`);
  } catch (err) {
    // Re-throw the error to be caught by the calling function.
    // Ensure the original error cause is preserved for debugging.
    console.error(`ERROR in downloadFile:`, err); // Log the error at this stage.
    throw new Error(`Download failed for ${url}: ${err.message}`, {
      cause: err,
    });
  }
}

/**
 * Reads a local file in chunks and logs each chunk.
 * Demonstrates consuming a ReadableStream using `for await...of`.
 * @param {string} filePath - The path to the file to read.
 * @returns {Promise<void>} - A Promise that resolves when the file is fully read.
 */
async function readFile(filePath) {
  // `fs.createReadStream` creates a readable stream for the file.
  // It automatically opens/closes the underlying file descriptor.
  const readStream = fs.createReadStream(filePath);

  try {
    // Iterate over chunks yielded by the readable stream.
    // `for await...of` handles the stream's asynchronous iteration.
    for await (const chunk of readStream) {
      // Chunks are typically Buffers by default.
      // Log chunk details for demonstration. In real apps, process data here.
      console.log(`\n--- File chunk (${chunk.length} bytes) start ---`);
      console.log(chunk.toString("utf8").substring(0, 100) + "..."); // Log a preview of the chunk.
      console.log(`--- File chunk end ---\n`);
    }
    console.log(`Finished reading the file: ${filePath}.`);
  } catch (err) {
    // Errors during stream reading (e.g., file disappeared, permissions changed) are caught here.
    console.error(`ERROR reading file ${filePath}: ${err.message}`, {
      cause: err,
    });
    throw new Error(
      `File read operation failed for ${filePath}: ${err.message}`,
      { cause: err }
    );
  }
}

/**
 * Orchestrates the download and subsequent reading of a file using streams.
 * Centralized error handling for the overall process.
 * @param {string} url - The URL to download from.
 * @param {string} outputPath - The local path for the downloaded file.
 * @returns {Promise<void>} - A Promise that resolves when the entire workflow is complete.
 */
async function readWriteStreamExample(url, outputPath) {
  try {
    // Step 1: Download the file via streaming.
    await downloadFile(url, outputPath);

    // Step 2: Read the downloaded file via streaming.
    await readFile(outputPath);
  } catch (err) {
    // Top-level error handler for the entire workflow.
    // Log the full error, including the 'cause' from nested errors.
    console.error(`\nFATAL ERROR in readWriteStreamExample:`);
    console.error(err); // This will log the error object, including its 'cause'.
    // If running a server, you might exit, send an error response, or log to a metrics system.
    process.exit(1); // Exit with a non-zero code to indicate failure in a script.
  }
}

// Execute the main function.
// readWriteStreamExample(fileUrl, outputFilePath);

// size limiter
class StreamSizeLimiter extends Transform {
  // default maxSize = 1 MB = 1 * 1024 * 1024 Bytes
  constructor(maxSize = 1 * 1024 * 1024, options) {
    super(options);
    this.maxSize = maxSize;
    this.currentSize = 0; // initialize the size counter
  }

  _transform(chunk, encoding, callback) {
    this.currentSize += chunk.length;
    if (this.currentSize > this.maxSize) {
      this.destroy(
        new Error(`File size exceeded limit of ${this.maxSize} bytes`)
      );
    } else {
      // pass the chunk through if within limits
      this.push(chunk);
      callback(); // call the callback to perform the main operation
    }
  }

  _flush(callback) {
    console.log(
      `Finished processing stream. Total size: ${this.currentSize} bytes`
    );
    callback();
  }
}

async function downloadFileWithSizeLimiter(url, outputPath) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}, Status: ${response.status}`);
    }

    const contentLength = response.headers.get("Content-Length");
    const MAX_DOWNLOAD_SIZE = 5 * 1024 * 1024; // 5 MB

    if (contentLength > MAX_DOWNLOAD_SIZE) {
      throw new Error(
        `Content-Length (${contentLength} bytes) exceeds maximum allowed size (${MAX_DOWNLOAD_SIZE} bytes).`
      );
    }

    const fileStream = fs.createWriteStream(outputPath);
    const sizeLimiter = new StreamSizeLimiter(MAX_DOWNLOAD_SIZE);

    await pipeline(
      // src
      response.body,

      // transform func
      sizeLimiter,

      // file stream
      fileStream
    );
    console.log(`File downloaded successfully to ${outputPath}.`);
  } catch (err) {
    console.error(`ERROR in downloadFile:`, err); // Log the error at this stage.
    throw new Error(`Download failed for ${url}: ${err.message}`, {
      cause: err,
    });
  }
}

async function readWriteStreamExampleWithSizeLimiter(url, outputPath) {
  try {
    await downloadFileWithSizeLimiter(url, outputPath);
    await readFile(outputPath);
  } catch (err) {
    console.error(`\nFATAL ERROR in readWriteStreamExample:`);
    console.error(err); // This will log the error object, including its 'cause'.
    // If running a server, you might exit, send an error response, or log to a metrics system.
    // process.exit(1);
  }
}


readWriteStreamExampleWithSizeLimiter(fileUrl, outputFilePath);