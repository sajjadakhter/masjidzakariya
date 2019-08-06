import React, {useEffect, useState} from "react";
import moment from 'moment'

const CurrentTimeDisplay = ({tick}) => {
    const [datetime, setdatetime] = useState(moment());
    useEffect(() => {
        tick();
        const timerID = setInterval(() => tick(), 1000);
        return function cleanup() {
            clearInterval(timerID);
        };

    }, []);

    function tick() {
        const now = moment();
        setdatetime(now);

    }

    return (
        <div>
            <div>
                <div className={'time'}>
                    <div>{datetime.format(" h:mm ")}</div>
                    <div className={'ampm'}>{datetime.format(" ss a")}</div>
                </div>
            </div>

        </div>
    );
};

export default CurrentTimeDisplay;
