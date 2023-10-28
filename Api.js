const express = require("express");
const app = express();
const bodyP = require("body-parser");
const compiler = require("compilex");
const options = { stats: true };
app.use(bodyP.json());
compiler.init(options);
app.use(
  "/codemirror-5.65.15",
  express.static("C:/Users/Aniket/Desktop/Code Editor/codemirror-5.65.15")
);
//Hosting index.html using API
app.get("/", function (req, res) {
  res.sendFile("C:/Users/Aniket/Desktop/Code Editor/index.html");
});
// app.post("/compile", function (req, res) {
//   var code = req.body.code;
//   var input = req.body.input;
//   var lang = req.body.lang;



  app.post("/compile", function (req, res) {
    var code = req.body.code;
    var input = req.body.input;
    var lang = req.body.lang;


  try {
    if (lang == "Cpp") {
      if (!input) {
        //if windows
        var envData = { OS: "windows", cmd: "g++",options:{timeout:10000} }; // (uses g++ command to compile )
        //else
        //var envData = { OS : "linux" , cmd : "gcc" }; // ( uses gcc command to compile )
        compiler.compileCPP(envData, code, function (data) {
          if (data.output) {
            res.send(data); // Change 'Data' to 'data'
          } else {
            res.send({ output: "error" });
          }
          
          //data.error = error message
          //data.output = output value
        });

        //res is the response object
      } else {
        //if windows
        var envData = { OS: "windows", cmd: "g++",options:{timeout:10000}}; // (uses g++ command to compile )
        //else
        // var envData = { OS : "linux" , cmd : "gcc" }; // ( uses gcc command to compile )
        compiler.compileCPPWithInput(envData, code, input, function (data) {
          if (data.output) {
            res.send(data); // Change 'Data' to 'data'
          } else {
            res.send({ output: "error" });
          }
          
        });
      }
    } else if (lang == "Java") {
        if (!input) {
          // If there's no input, compile the Java code without input
          var envData = { OS: "windows" };
          compiler.compileJava(envData, code, function (data) {
            if (data.output) {
              res.send(data);
            } else {
              res.send({ output: "error" });
            }
          });
        }  else {
        //if windows
        var envData = { OS: "windows" };
        //else
        var envData = { OS: "linux" }; // (Support for Linux in Next version)
        compiler.compileJavaWithInput(envData, code, input, function (data) {
          if (data.output) {
            res.send(data); // Change 'Data' to 'data'
          } else {
            res.send({ output: "error" });
          }
          
        });
      }
    } else if(lang=="Python"){
      if (!input) {
        //if windows
        var envData = { OS: "windows" };
        //else
        //var envData = { OS : "linux" };
        compiler.compilePython(envData, code, function (data) {
          if (data.output) {
            res.send(data); // Change 'Data' to 'data'
          } else {
            res.send({ output: "error" });
          }
          
        });
      } else {
        //if windows
        var envData = { OS: "windows" };
        //else
        //var envData = { OS: "linux" };
        compiler.compilePythonWithInput(envData, code, input, function (data) {
          if (data.output) {
            res.send(data); // Change 'Data' to 'data'
          } else {
            res.send({ output: "error" });
          }
          
        });
      }
    }
  } catch (e) {
    console.log("error");
  }
});
//Port
app.listen(8000);
