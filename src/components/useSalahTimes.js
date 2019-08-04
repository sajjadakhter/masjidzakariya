import {useMasjidData} from "./useMasjidData";
import {useNextSalah} from "./useNextSalah";
import useClock from "./useClock";


export const useSalahTimes = (masjidId) => {

    const [datetiem, year, month, day, hour, min, second, tomorrowyear, tomorrowmonth, tomorrowday] = useClock();

    //console.log("date get...", day, month, year, tomorrowday, tomorrowmonth, tomorrowyear);
    const [salahTimes, hijri, masjidInfo] = useMasjidData(hour, day, month, year, masjidId);
    const [tsalahTimes] = useMasjidData(hour, tomorrowday, tomorrowmonth, tomorrowyear, masjidId);
    const [nextsalahName, nextsalah, salahMsg, updatedSalahTimes] = useNextSalah(tsalahTimes[0], datetiem, salahTimes);

    const salah = {
        times: updatedSalahTimes,
        next: {
            name: nextsalahName,
            time: nextsalah,
            msg: salahMsg
        }
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
