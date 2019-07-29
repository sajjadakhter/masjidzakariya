import React from "react";
import moment from 'moment'

const CurrentTimeDisplay = ({tick}) => {

    const time = moment();
    return (
        <div>
            <div>
                <div className={'time'}>
                    <div>{time.format(" h:mm ")}</div>
                    <div className={'ampm'}>{time.format(" ss a")}</div>
                </div>
            </div>

        </div>
    );
};

export default CurrentTimeDisplay;
