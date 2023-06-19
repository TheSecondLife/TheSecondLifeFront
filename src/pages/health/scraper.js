//참고 : https://www.youtube.com/watch?v=xbehh8lWy_A

const axios = require("axios");
const cheerio = require("cheerio");

const getHTML = async() => {
  
  try{
    return await axios.get("https://opendata.hira.or.kr/op/opc/selectColumnCodeList.do?tblId=TBOMA270&pageIndex=1")
  }catch(err){
    console.log(err);
  }
}

const getHTML2 = async() => {
  
  try{
    return await axios.get("https://opendata.hira.or.kr/op/opc/selectColumnCodeList.do?tblId=TBOMA270&pageIndex=2")
  }catch(err){
    console.log(err);
  }
}

const getHTML3 = async() => {
  
  try{
    return await axios.get("https://opendata.hira.or.kr/op/opc/selectColumnCodeList.do?tblId=TBOMA270&pageIndex=3")
  }catch(err){
    console.log(err);
  }
}

const getHTML4 = async() => {
  
  try{
    return await axios.get("https://opendata.hira.or.kr/op/opc/selectColumnCodeList.do?tblId=TBOMA270&pageIndex=4")
  }catch(err){
    console.log(err);
  }
}

const getHTML5 = async() => {
  
  try{
    return await axios.get("https://opendata.hira.or.kr/op/opc/selectColumnCodeList.do?tblId=TBOMA270&pageIndex=5")
  }catch(err){
    console.log(err);
  }
}

const getHTML6 = async() => {
  
  try{
    return await axios.get("https://opendata.hira.or.kr/op/opc/selectColumnCodeList.do?tblId=TBOMA270&pageIndex=6")
  }catch(err){
    console.log(err);
  }
}

let codes_info = [];
const parsing = async () => {
  let html = await getHTML();
  // console.log(html);
  let $ = cheerio.load(html.data);
  let $codeList = $("#codeTbl>tbody>tr");

  $codeList.each((idx, node)=>{
    
    codes_info.push({
      code: $(node).find("td:nth-child(3)").text(),
      region : $(node).find("td:nth-child(4)").text(),
    });
  })


  html = await getHTML2();
  $ = cheerio.load(html.data);
  // $codeList = $("#codeTbl");
  $codeList.each((idx, node)=>{
    
    codes_info.push({
      code: $(node).find("tr>td:nth-child(3)").text(),
      region : $(node).find("tr>td:nth-child(4)").text(),
    });
  })

  html = await getHTML3();
  $ = cheerio.load(html.data);
  // $codeList = $("#codeTbl");
  $codeList.each((idx, node)=>{
    
    codes_info.push({
      code: $(node).find("tr>td:nth-child(3)").text(),
      region : $(node).find("tr>td:nth-child(4)").text(),
    });
  })

  html = await getHTML4();
  $ = cheerio.load(html.data);
  // $codeList = $("#codeTbl");
  $codeList.each((idx, node)=>{
    
    codes_info.push({
      code: $(node).find("tr>td:nth-child(3)").text(),
      region : $(node).find("tr>td:nth-child(4)").text(),
    });
  })


  html = await getHTML5();
  $ = cheerio.load(html.data);
  // $codeList = $("#codeTbl");
  $codeList.each((idx, node)=>{
    
    codes_info.push({
      code: $(node).find("tr>td:nth-child(3)").text(),
      region : $(node).find("tr>td:nth-child(4)").text(),
    });
  })

  html = await getHTML6();
  $ = cheerio.load(html.data);
  // $codeList = $("#codeTbl");
  $codeList.each((idx, node)=>{
    
    codes_info.push({
      code: $(node).find("tr>td:nth-child(3)").text(),
      region : $(node).find("tr>td:nth-child(4)").text(),
    });
  })

  console.log(codes_info);

  return codes_info;
}

parsing();

// export {codes_info}; export쓰면 안되고 return으로 보내야함