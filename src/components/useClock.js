import {useState, useEffect} from 'react';
import moment from 'moment'

function useClock(props) {
    const [datetime, setdatetime] = useState(moment());
    const [hour, sethour] = useState(0);
    const [min, setmin] = useState(0);
    const [second, setsecond] = useState(0);

    //Replaces componentDidMount and componentWillUnmount
    useEffect(() => {
        var timerID = setInterval(() => tick(), 1000);

        return function cleanup() {
            clearInterval(timerID);
        };
    }, []);

    function tick() {
        var datetime = new Date();
        setdatetime(moment());
        sethour(datetime.getHours());
        setmin(datetime.getMinutes());
        setsecond(datetime.getSeconds());

    }

    return [datetime, hour, min, second];
}

export default useClock;
