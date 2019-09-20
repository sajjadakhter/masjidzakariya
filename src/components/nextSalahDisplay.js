import moment from 'moment'
import React from "react";

const NextSalahDisplay = ({salahTimes, currTime}) => {
    console.log(salahTimes);
    if (salahTimes.nextIndex == -1) {
        return <div></div>
    }
    console.log(salahTimes);
    var salah = salahTimes.today.times[salahTimes.currentIndex];
    var salahTime = salahTimes.today.times[salahTimes.nextIndex].start;
    var msg = 'is ending';
    var fajarend = salahTimes.today.times[0].end;
    //todo add config to calculate prohibted time
    if (currTime > fajarend && currTime < moment(fajarend).add(20, "m")) {
        msg = "Prohibited time for Salah";
    } else {
        var zuharstart = salahTimes.today.times[1].start;
        if (currTime < zuharstart && currTime > moment(zuharstart).subtract(10, "m")) {
            msg = "Prohibited time for Salah";
        }
    }

    if (msg.length > 9) {
        return (
            <div className={'next-salah'}>
                <div className={'alarm'}>  {msg} </div>
            </div>
        );
    }

    if (salahTimes.currentIndex >= 0 && currTime >= salahTimes.today.times[0].start) {
        if (salahTimes.today.times[salahTimes.currentIndex].iqamah > currTime) {
            salah = salahTimes.today.times[salahTimes.currentIndex];
            salahTime = salahTimes.today.times[salahTimes.currentIndex].iqamah
            msg = 'iqamah is '
        } else if (currTime.hour() > 12 && salahTimes.nextIndex == 0 && salahTimes.tomorrow.times != undefined && salahTimes.tomorrow.times.length >= 4) {
            //after isha next fajar
            salah = salahTimes.tomorrow.times[0];
            salahTime = salahTimes.tomorrow.times[0].start;
        } else {
            console.log(salahTimes.today.times[salahTimes.currentIndex].iqamah >= currTime)
        }
    }
    return (
        <div className={'next-salah'}>
            <div className={'title'}> {salah.name} {msg} in&nbsp;</div>
            <div
                className={'time'}>   {moment.duration(moment(salahTime).diff(moment())).format(", h [hours], m [minutes]", {trim: true})}</div>
        </div>
    );
};

export default NextSalahDisplay;
