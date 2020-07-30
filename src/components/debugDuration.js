import React, {useEffect, useState} from 'react';
import Popout from "react-popout";
import {useQueryParam, BooleanParam} from "use-query-params";
import moment from "moment";

function DebugDuration({callback, datetime}) {

    const [showtime, setShowtime] = useQueryParam('showtime', BooleanParam);
    const [hour, setHour] = useState(0);
    const [min, setMin] = useState(0);
    const [time, setTime] = useState(0);

    const update = (hour1, min1) => {
        setHour(hour1);
        setMin(min1);
        let val = moment.duration(
            {
                seconds: 0,
                minutes: min1,
                hours: hour1
            }
        );
        setTime(val);
        callback(val)
    };

    return (
        <div>
            {showtime == true &&
            <div>
                <Popout title='Time debug'>
                    <div>
                        <input value={hour} onChange={(e) => update(parseInt(e.target.value, 10), min)}/>:<input
                        value={min} onChange={(e) => update(hour, parseInt(e.target.value, 10))}/>
                        <div>
                            <button onClick={() => update(hour + 1, min)}>up</button>
                            <button onClick={() => update(hour - 1, min)}>down</button>
                            :
                            <button onClick={() => update(hour, min + 1)}>up</button>
                            <button onClick={() => update(hour, min - 1)}>down</button>
                        </div>
                        <button onClick={() => update(0, 0)}>Reset
                        </button>
                        <div>{time.toString()}</div>
                        : <div>{datetime.now.timeoffset.toString()}</div>
                        <div>{datetime.now.raw.format(" h:mm:ss a")}</div>
                        <div>{datetime.now.adjusted.format(" h:mm:ss a")}</div>
                    </div>
                </Popout>
            </div>
            }
        </div>
    );

};

export default DebugDuration;
