import HijriDate from "./HijriDate";
import React from "react";
import moment from 'moment';

const CurrentDateDisplay = ({tick, hijri}) => {
    const time = moment();
    return (
        <div>
            <div className={'date'}>
                {time.format("dddd, MMMM Do")}
            </div>
            <div className={'date-hijri'}>
                <HijriDate day={hijri.day} month={hijri.month} year={hijri.year}/>
            </div>
        </div>
    );
};

export default CurrentDateDisplay;
