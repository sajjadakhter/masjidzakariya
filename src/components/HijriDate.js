import React, {useEffect, useState} from 'react';
import ordinal from "ordinal"

function hijriToString(day, month, year) {
    var months = new Array("Muharram", "Safar", "Rabi-al Awwal", "Rabi-al Thani", "Jumada al-Ula", "Jumada al-Thani", "Rajab", "Sha\'ban", "Ramadhan", "Shawwal", "Dhul Qa\'dah", "Dhul Hijjah");
    return ordinal(day) + " " + months[month - 1];
}

const HijriDate = ({day, month, year}) => {

    if (day === undefined) return null;
    return (
        <div>
            {hijriToString(day, month, year)}
        </div>
    );

};

export default HijriDate;
