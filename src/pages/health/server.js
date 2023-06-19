const {codes_info} = require("./scraper.js");

const express = require('express');
const path = require('path');
const app = express();

console.log(codes_info);

let info = [];
async function handleAsync(){
  info = codes_info;
  console.log("codes_info"+" "+info);
  return info;
}

app.listen(9000, function(){
  console.log('listening on 9000')
})

app.get("/api/crwal", async(req, res)=>{
  const result = await handleAsync();

  res.send([{
    result,
  }]);
});