import axios from 'axios'

function xml() {
  return(
    <>
      <button onClick={() => {
        getData();
      }}>데이터 받아서 콘솔 출력 JSON</button>
    </>
  )

  function getData() {
    "http://openapi.work.go.kr/opi/opi/opia/wantedApi.do?authKey=WNLITIN7GFVJY3J17FMWQ2VR1HK&callTp=L&returnType=XML&startPage=1&display=10"
    const url = `http://localhost:8080/api/open`
    const data = {
      openAPI:"http://openapi.work.go.kr/opi/opi/opia/wantedApi.do?authKey=WNLITIN7GFVJY3J17FMWQ2VR1HK&callTp=L&returnType=XML&startPage=1&display=10"
    }
    const config = {"Content-Type": 'application/json'};
    axios.post(url, data, config)
    .then((result) => {
      console.log(result.data)
      console.log(result.data.wantedRoot.wanted)
    })
  }
}

export default xml