import { useEffect, useState } from 'react'

function TestMain() {
  
  let [loginUser, setLoginUser] = useState({})

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loginUser"))
    console.log(user)
    setLoginUser(user);
  },[])
  
  return(
    <>
      메인페이지<br></br>
      {/* {JSON.stringify(loginUser)} */}
    </>
  )
}

export default TestMain;