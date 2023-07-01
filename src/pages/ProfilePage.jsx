import HeaderComp from './HeaderComp';
import Footer from './FooterComp';
import { useNavigate } from 'react-router-dom';
import style from '../css/ProfilePage.module.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';


function ProfilePage() {

  const navigate = useNavigate();
  let user = JSON.parse(sessionStorage.getItem("loginUser"));

  let [profile, setProfile] = useState();
  // console.log(user)
  function update() {
    console.log(1123)
  }

  function updatePicture() {
    let myInput = document.getElementById("my-input");
    myInput.click();
  }
  
  return(
    <>
      <div style={{height: "53px"}}>
        <HeaderComp />
      </div>
      <div>
        <div className={style.container}>
          <img className={style.cross} src="https://fitsta-bucket.s3.ap-northeast-2.amazonaws.com/secondlife/back.png" onClick={() => { navigate(-1) }}/>
          <img className={style.check} src="https://fitsta-bucket.s3.ap-northeast-2.amazonaws.com/secondlife/check.png" onClick={() => { update() }}/>
        </div>
        <input type="file" id='my-input' className={style.inputfile} />
        <img className={style.userImage} src={user.profileImg} alt="프로필사진" />
        <Button className={style.profileBtn} onClick={() => {
          updatePicture()
        }}>프로필 사진 수정</Button>
      </div>
      <br></br><br></br>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label className={style.title}>이름</Form.Label>
          <Form.Control className={style.input} type="text" value={user.name}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label className={style.title}>닉네임</Form.Label>
          <Form.Control className={style.input} type="text" value={user.nickname} />
        </Form.Group>
      </Form>

      <div style={{height: "51px"}}>
        <Footer />
      </div>
    </>
  )
}

export default ProfilePage;