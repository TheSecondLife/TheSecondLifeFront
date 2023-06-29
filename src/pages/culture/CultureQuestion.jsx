import {useSelector, dispatcher} from "react-redux";

const CultureQuestion = () => {

  //redux
  let state_culture = useSelector((state)=> state.culture);
  console.log(state_culture.culture_list);

  return(
    <div></div>
  )
}


export default CultureQuestion;