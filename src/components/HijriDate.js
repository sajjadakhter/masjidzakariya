import React from 'react';
import ordinal from "ordinal"

function hijriToString(day, month, year) {
    var months = new Array("Muharram", "Safar", "Rabi-al Awwal", "Rabi-al Thani", "Jumada al-Ula", "Jumada al-Thani", "Rajab", "Sha\'ban", "Ramadhan", "Shawwal", "Dhul Qa\'dah", "Dhul Hijjah");
    return ordinal(day) + " " + months[month - 1];
}

const HijriDate = ({dayplus, day, month, year}) => {

    if (day === undefined) return null;

    return (
        <div>
            {(dayplus ? '*' : '') + hijriToString(day + (dayplus ? 1 : 0), month, year)}
            <div style={{fontSize: '35%', color: 'pink'}}>*Islamic date changes at maghrib time</div>
        </div>
    );

};

export default HijriDate;
