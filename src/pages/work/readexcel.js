const express = require('express');
const app = express();

const xlsx = require('xlsx');
const workbook = xlsx.readFile(__dirname + '/work_code.xls');

const json = {};
let i = workbook.SheetNames.length;

while (i--) {
    const sheetname = workbook.SheetNames[i];
    json[sheetname] = xlsx.utils.sheet_to_json(workbook.Sheets[sheetname]);
}

console.log(json);

// return json;

app.listen(9000, function(){
  console.log('listening on 9000')
})

app.get("/api/crwal/2", async(req, res)=>{
  // const result = await handleAsync();

  res.send([{
    json,
  }]);
});