import {useState, useEffect} from 'react';
import moment from 'moment'

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function useClock(props) {
    const [datetime, setdatetime] = useState(0);
    const [year, setyear] = useState(0);
    const [month, setmonth] = useState(0);
    const [day, setday] = useState(0);
    const [hour, sethour] = useState(0);
    const [min, setmin] = useState(0);
    const [second, setsecond] = useState(0);
    const [tomorrowyear, settomorrowyear] = useState(0);
    const [tomorrowmonth, settomorrowmonth] = useState(0);
    const [tomorrowday, settomorrowday] = useState(0);

    //Replaces componentDidMount and componentWillUnmount
    useEffect(() => {
        tick();
        const timerID = setInterval(() => tick(), 15000);
        return function cleanup() {
            clearInterval(timerID);
        };

    }, []);

    function tick() {

        const now = moment();
        const tomorrow = moment().add(1, "days");

        setdatetime(now);
        setyear(now.year());
        setmonth(now.month() + 1);
        setday(now.date());
        sethour(now.hour());
        setmin(now.minute());
        setsecond(now.second());

        settomorrowday(tomorrow.date());
        settomorrowmonth(tomorrow.month() + 1);
        settomorrowyear(tomorrow.year());
    }

    return [datetime, year, month, day, hour, min, second, tomorrowyear, tomorrowmonth, tomorrowday];
}

export default useClock;
