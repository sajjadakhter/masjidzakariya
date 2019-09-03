import moment from 'moment'
import React from "react";

const NextSalahDisplay = ({salahTimes, currTime}) => {
    console.log(salahTimes);
    if (salahTimes.nextIndex == -1) {
        return <div></div>
    }
    var salah = salahTimes.today.times[salahTimes.nextIndex];
    var msg = ''
    if (salahTimes.currIndex >= 0) {
        if (salahTimes.today.times[salahTimes.currIndex].iqamah > currTime) {
            salah = salahTimes.today.times[salahTimes.currIndex]
            msg = 'iqamah '
        }
    }
    return (
        <div className={'next-salah'}>
            <div className={'title'}> {salah.name} {msg} is in</div>
            <div
                className={'time'}>  {moment.duration(moment(salah.start).diff(moment())).format(", h [hours], m [minutes]", {trim: true})}</div>
        </div>
    );
};

export default NextSalahDisplay;
