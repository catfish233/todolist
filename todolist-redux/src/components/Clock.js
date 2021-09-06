import React, { useEffect, useState } from "react";

export default function Clock(){
	const[date, setDate] = useState('');

	useEffect(() =>{
		setTimeout(() =>{tick()}, 1000);
	})
		
	function tick(){
		setDate(new Date());
	}

	return (
      <div className="time">
        Current time：{date.toLocaleString()}
      </div>
    )
}