const fs = require("fs");

function logRequest(filename) {
  return (req, res, next) => {
    const logEntry = `\n${Date.now()}: ${req.ip} ${req.method} : ${req.path}`;
    
    fs.appendFile(filename, logEntry, "utf-8", (err) => {
      if (err) {
        console.error("Error writing to log file:", err);
      }
      next();
    });
  };
}

module.exports = {
  logRequest,
};
