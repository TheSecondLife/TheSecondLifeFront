import HeaderComp from '../HeaderComp';
import Footer from '../FooterComp';
import { useNavigate } from 'react-router-dom';
import style from '../../css/ProfilePage.module.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import axios from 'axios';


function ProfilePage() {

  const navigate = useNavigate();
  let user = JSON.parse(sessionStorage.getItem("loginUser"));

  let [name, setName] = useState(user.name);
  let [nickname, setNickname] = useState(user.nickname);

  let [profile, setProfile] = useState(user.profileImg);
  // console.log(user)
  function update() {
    let user = JSON.parse(sessionStorage.getItem("loginUser"));
    const url = process.env.REACT_APP_SERVER + "/api/user/info";
    const data = {
      userId: user.id,
      name: name,
      nickname: nickname
    };
    console.log(data)
    const config = {"Content-Type": 'application/json'};
    axios.post(url, data, config)
    .then(() => {
      let user = JSON.parse(sessionStorage.getItem("loginUser"));
      user.name = name;
      user.nickname = nickname;
      user = JSON.stringify(user);
      sessionStorage.setItem("loginUser", user)
      alert("프로필 수정 완료!")
      navigate("/home")
    })
  }

  function handleName(event) {
    setName(event.target.value);
  };

  function handleNickname(event) {
    setNickname(event.target.value);
  };

  function handleProfileImg(event) {
    // console.log(event.target.value)
    // console.log(event.target.files[0])
    const url = process.env.REACT_APP_SERVER + "/api/user/profile";
    let data = new FormData();
    data.append("image", event.target.files[0]);
    data.append("id", user.id);
    console.log(data)
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };
    axios.post(url, data, config)
    .then((result) => {
      console.log(result.data)
      user.profileImg = result.data;
      let newUser = JSON.parse(sessionStorage.getItem("loginUser"));
      newUser.profileImg = result.data;
      newUser = JSON.stringify(newUser);
      sessionStorage.setItem("loginUser", newUser)
      setProfile(result.data);
      alert("프로필 사진 변경 완료!")
      navigate("/home")
    })
    .catch((err) => {

    })
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
        <input onChange={(event)=> {
          handleProfileImg(event)
        }} type="file" id='my-input' className={style.inputfile} multiple="multiple"/>
        <img className={style.userImage} src={profile} alt="프로필사진" />
        <Button className={style.profileBtn} onClick={() => {
          updatePicture()
        }}>프로필 사진 수정</Button>
      </div>
      <br></br><br></br>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label className={style.title}>이름</Form.Label>
          <Form.Control className={style.input} type="text" value={name} onChange={handleName}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label className={style.title}>닉네임</Form.Label>
          <Form.Control className={style.input} type="text" value={nickname} onChange={handleNickname}/>
        </Form.Group>
      </Form>

      <div style={{height: "51px"}}>
        <Footer />
      </div>
    </>
  )
}

export default ProfilePage;