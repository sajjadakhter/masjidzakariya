import {useMasjidData} from "./useMasjidData";
import {useNextSalah2} from "./useNextSalah2";
import useClock from "./useClock";


export const useSalahTimes = (masjidId) => {

    const [datetiem, year, month, day, hour, min, second, tomorrowyear, tomorrowmonth, tomorrowday] = useClock();

    //console.log("date get...", day, month, year, tomorrowday, tomorrowmonth, tomorrowyear);
    const [salahTimes, otherTimes, hijri, masjidInfo] = useMasjidData(hour, day, month, year, masjidId);
    const [tsalahTimes, totherTimes] = useMasjidData(hour, tomorrowday, tomorrowmonth, tomorrowyear, masjidId);
    const [salahToDisplay, msg, current, next, isProhibted] = useNextSalah2(datetiem, {
        today: {times: salahTimes},
        tomorrow: {times: tsalahTimes}
    }, {mintoishraq: 10, mintozawal: 12});

    const salah = {
        today: {
            times: salahTimes,
            otherTimes: otherTimes,
        },
        tomorrow: {
            times: tsalahTimes,
            otherTimes: totherTimes,
        },
        currentIndex: current,
        nextIndex: next,
        salahToDisplay: salahToDisplay,
        msg: msg,
        isProhibted: isProhibted
    };

    const masjid = {
        name: masjidInfo.name,
        shortname: masjidInfo.shortname
    };

    const datetime = {
        hijri: hijri,
        now: {
            raw: datetiem,
            year: year,
            month: month,
            day: day,
            hour: hour,
            min: min,
            second: second
        }
    };

    return [salah, datetime, masjid]
};
