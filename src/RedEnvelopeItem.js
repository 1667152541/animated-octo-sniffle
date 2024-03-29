/*
 * @Descripttion: js
 * @Version: 1.0
 * @Author: name
 * @Date: 2024-03-28 17:46:44
 * @LastEditors: name
 * @LastEditTime: 2024-03-29 02:36:22
 */
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
//----------------------------
import './RedEnvelopeItem.css'

dayjs.extend(duration);

export default function RedEnvelopeItem(props) {
  const { item } = props;

  const [isExpired,setIsExpired] = useState(false); // 是否已到期
  const [isUse, setIsUse] = useState(false); // 是否已使用
  const [countdown,setCountdown] = useState(item.restTime); // 倒计时
  const [timer,setTimer] = useState(null);
  useEffect(() => {
    if('restTime' in item) countdownFn(10)
    return () => {
      clearInterval(timer)
    }
  },[])

  // 倒计时
  const countdownFn = (count) => {
    let timer = setInterval(() => {
      if(count > 0){
        count--;
        setCountdown(count)
      }else{
        setIsExpired(true)
        clearInterval(timer)
      }
    }, 1000);
    setTimer(timer)
  }

  // 渲染倒计时间
  const renderCount = (count) =>{
    const countdown = dayjs.duration(count, 'seconds');
    let hours = countdown.hours() < 10 ? '0' + countdown.hours() : countdown.hours();
    let minutes = countdown.minutes() < 10 ? '0' + countdown.minutes() : countdown.minutes();
    let seconds = countdown.seconds() < 10 ? '0' + countdown.seconds() : countdown.seconds();
    return (
      <>
        <span>{hours}</span>:
        <span>{minutes}</span>:
        <span>{seconds}</span>
      </>
    )
  }

  // 按钮点击事件
  const handleClick = () =>{
    if(!isExpired){
      alert('已使用');
      setIsExpired(true)
      setIsUse(true)
      clearInterval(timer);
    }
  }

  return (
    <div className='redEnvelope'>
      <div className='money'>{item?.money || 0}</div>
      <div className='content'>
        <p>{item?.title || ''}</p>
        <p>{item?.description || ''}</p>
          {'restTime' in item && !isExpired ? <p className='count'>距结束：{renderCount(countdown)}</p> : <p className='time'>有效期：{dayjs(item?.time[0] || '').format('MM-DD HH:mm')} - {}{dayjs(item?.time[1] || '').format('MM-DD HH:mm')}</p>}
      </div>
      <div className='buttonBox'>
        <div onClick={handleClick} className={`button ${'restTime' in item && !isExpired ? '' : 'disabled'}`}>
          {'restTime' in item && !isExpired ? '使用' : isUse ? '已使用' : '已过期'}
          </div>
      </div>
    </div>
  )
}
