var express = require("express");
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
var fs = require('fs');


//I used here post method for add the data.

app.post("/post", function (req, res) {
    var user = {
        courses_id: req.body.courses_id,
        courses: req.body.courses,
        exercises: req.body.exercise,
        exercises_id: req.body.exercise_id
    }
    // exercises_id:req.body.exercise_id

    // console.log(user)
    var data = fs.readFileSync("courses_name.json")
    data = data.toString();
    var jsonData = JSON.parse(data)
    let len = (jsonData.length);
    user.exercises_id = len + 1
    console.log(user)
    jsonData.push(user)
    // console.log(jsonData)
    fs.writeFileSync("courses_name.json", JSON.stringify(jsonData, null, 2))
    return res.json(jsonData)
})



// console.log(response);




//I used here get method for read the data......
app.get("/get", function (req, res) {
    let read_data = fs.readFileSync("courses_name.json");
    let courses_data = JSON.parse(read_data);
    res.send(courses_data)
    // console.log(courses_data);

})

// I used here put method for update the data....
app.put("/put/:exercises_id", function (req, res) {
    let exercises_id = req.params.exercises_id;
    var data = fs.readFileSync("courses_name.json")
    var Data = JSON.parse(data)
    Data[exercises_id]["courses"] = req.body.courses;
    Data[exercises_id]["exercises"] = req.body.exercises

    fs.writeFileSync("courses_name.json", JSON.stringify(Data, null, 2))
    res.json(Data)
});


//I used here delete method  for delete the data......
app.delete("/delete/:exercises_id", function (req, res) {
    var exercise_id = req.params.exercises_id;
    var data = fs.readFileSync("courses_name.json");
    var Data = JSON.parse(data);
    // console.log(Data)

    var index;
    for (index = 0; index < Data.length; index++) {
        var eid = Data[index].exercises_id
        if (exercise_id == eid){
            delete Data[index]
            res.send("data deleted ")
        }

    }fs.writeFileSync("courses_name.json", JSON.stringify(Data, null, 2))
    res.send("error")

});

var server = app.listen(8123, function () {
    console.log("saral_courses is listing 8123  ")
})
