import moment from 'moment'
import React from "react";

const NextSalahDisplay = ({salahTimes, currTime}) => {
    console.log(salahTimes);
    if (salahTimes.nextIndex == -1) {
        return <div></div>
    }
    var salah = salahTimes.today.times[salahTimes.nextIndex];
    var salahTime = salahTimes.today.times[salahTimes.nextIndex].start;
    var msg = ''
    if (salahTimes.currentIndex >= 0) {
        console.log({curr: salahTimes.today.times[salahTimes.currentIndex], time: currTime});
        if (salahTimes.today.times[salahTimes.currentIndex].iqamah > currTime) {
            console.log({next: salahTimes.today.times[salahTimes.currentIndex]})
            salah = salahTimes.today.times[salahTimes.currentIndex];
            salahTime = salahTimes.today.times[salahTimes.currentIndex].iqamah
            msg = 'iqamah '
        } else {
            console.log(salahTimes.today.times[salahTimes.currentIndex].iqamah >= currTime)
        }
    }
    return (
        <div className={'next-salah'}>
            <div className={'title'}> {salah.name} {msg} is in</div>
            <div
                className={'time'}>  {moment.duration(moment(salahTime).diff(moment())).format(", h [hours], m [minutes]", {trim: true})}</div>
        </div>
    );
};

export default NextSalahDisplay;
