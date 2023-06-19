import style from '../css/Header.module.css'


function HeaderComp() {
  return (
    <>
      <div className={`${style.headerComp }`}>
        {/* <img className={`${css.logo}`} src='https://fitsta-bucket.s3.ap-northeast-2.amazonaws.com/Cool+Text+-+SecondLife+437429606540630.png'/> */}
        <div className={`${style.headerCompLogo}`}>
          Second Life
        </div>
      </div>
    </>
  )
}


export default HeaderComp;