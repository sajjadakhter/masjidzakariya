import moment from 'moment'
import React from "react";

const NextSalahDisplay = ({salahTimes, currTime}) => {
    console.log(salahTimes);
    if (salahTimes.nextIndex == -1) {
        return <div></div>
    }
    console.log(salahTimes);


    if (salahTimes.msg.includes("Prohibited")) {
        return (
            <div className={'next-salah'}>
                <div className={'alarm'}>  {salahTimes.msg} </div>
            </div>
        );
    }

    return (
        <div className={'next-salah'}>
            <div className={'title'}> {salahTimes.msg}</div>
        </div>
    );
};

export default NextSalahDisplay;
