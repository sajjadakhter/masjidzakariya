import HijriDate from "./HijriDate";
import React from "react";
import moment from 'moment';

const CurrentDateDisplay = ({tick, hijri}) => {
    const time = moment();

    var dayplus = time > hijri.dateChangeTime && hijri.day < 29


    return (
        <div className={'date'}>
            <div className={'date2'}>
                {time.format("dddd, MMMM Do")}
            </div>
            <div className={'date-hijri'}>
                <HijriDate dayplus={dayplus} day={hijri.day} month={hijri.month} year={hijri.year}/>
            </div>
        </div>
    );
};

export default CurrentDateDisplay;
