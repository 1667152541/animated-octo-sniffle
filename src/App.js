/*
 * @Descripttion: js
 * @Version: 1.0
 * @Author: name
 * @Date: 2024-03-28 17:46:44
 * @LastEditors: name
 * @LastEditTime: 2024-03-29 01:56:42
 */
/*
 * @Descripttion: js
 * @Version: 1.0
 * @Author: name
 * @Date: 2024-03-28 17:46:44
 * @LastEditors: name
 * @LastEditTime: 2024-03-28 17:55:38
 */
import axios from 'axios';
//---------------------------
import RedEnvelopeItem from './RedEnvelopeItem';
import "./styles.css";
import { useEffect, useState } from 'react';

export default function App() {
  const [resData,setResData] = useState([]);
  useEffect(()=>{
    init();
  },[])

  const init = () =>{
    axios.get('https://systemjs.1688.com/krump/schema/1352.json')
  .then(res => {
    if(res?.status === 200){
      setResData(res?.data?.list || [])
    }
  })
  .catch(error => {
    console.error(error);
  });
  }
  return (
    <div className="App">
      <h1>1688 进货红包</h1>
      <div className='redEnvelopeBox'>
        <div></div>
        <div>{resData.map((item,index)=><RedEnvelopeItem key={index} item={item} />)}</div>
        <div></div>
      </div>
    </div>
  );
}
