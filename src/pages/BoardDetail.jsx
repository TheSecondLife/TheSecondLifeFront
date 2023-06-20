import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


function BoardDetail() {
  
  let { id } = useParams();
  let [post, setPost] = useState({});

  useEffect(()=> {
    const url = "/api/post/" + id;
    axios.get(url)
    .then((result) => {
      console.log(result.data);
      setPost(post);
    })
    .catch((err) => {
      console.log(err)
    })
  },[])

  return (
    <>
      { id }
    </>
  ) 
}


export default BoardDetail;