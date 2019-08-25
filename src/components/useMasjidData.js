import {useEffect, useState} from 'react';
import axios from "axios";
import moment from "moment";

function convertToDateTime(time, year, month, day) {
    const fullTime = time + year + ':' + month + ':' + day;
    const mtime = moment(fullTime, "hh:mm a YYYY:M:D");
    return mtime;
};

export const useMasjidData = (hour, day, month, year, masjidId) => {
    const [hijri, setHijri] = useState({});
    const [salahTimes, setSalahTimes] = useState([]);
    const [masjidInfo, setMasjidInfo] = useState({});

    useEffect(() => {
        if (year === 0 || month === 0) {
            console.log("ignoring as invlad date/time");
            return
        }
        const iqamahUrl = '/salahtime/api/masjidi/v1/index.php/masjids/' + masjidId + '/iqamahandprayertimes/' + year + '/' + month;

        axios.get(iqamahUrl).then((result) => {
            console.log(result);
            console.log("year=", year, "month=", month, "hour=", hour, "fromCache=", result.request.fromCache);
            const info = result.data.masjidInfo;
            setMasjidInfo({name: info.title, shortname: JSON.parse(info.masjid_preferences).short_name});
            const d = result.data.prayerTimes[day - 1];
            setHijri({month: parseInt(d.hijri_month), day: parseInt(d.hijri_day), year: 1440, date: d.hijri_date});
            console.log("hijri", hijri);
            setSalahTimes([
                {
                    name: 'Fajr',
                    start: convertToDateTime(d.fajr_start_time, year, month, day),
                    end: convertToDateTime(d.shuruq, year, month, day),
                    iqamah: convertToDateTime(info.fajr_iqama_time, year, month, day),
                    current: false,
                    next: false
                },
                {
                    name: 'Shuruq',
                    start: convertToDateTime(d.shuruq, year, month, day),
                    end: convertToDateTime(d.zuhr_start_time, year, month, day)
                },
                {
                    name: 'Zuhr',
                    start: convertToDateTime(d.zuhr_start_time, year, month, day),
                    end: convertToDateTime(d.asr_start_time, year, month, day),
                    iqamah: convertToDateTime(info.zuhr_iqama_time, year, month, day),
                    current: false,
                    next: false
                },
                {
                    name: 'Asr',
                    start: convertToDateTime(d.asr_start_time, year, month, day),
                    end: convertToDateTime(d.magrib_start_time, year, month, day),
                    iqamah: convertToDateTime(info.asr_iqama_time, year, month, day),
                    current: false,
                    next: false
                },
                {
                    name: 'Magrib',
                    start: convertToDateTime(d.magrib_start_time, year, month, day),
                    end: convertToDateTime(d.isha_start_time, year, month, day),
                    iqamah: convertToDateTime(d.magrib_start_time, year, month, day),
                    current: false,
                    next: false
                },
                {
                    name: 'Isha',
                    start: convertToDateTime(d.isha_start_time, year, month, day),
                    end: convertToDateTime(d.fajr_start_time, year, month, day),
                    iqamah: convertToDateTime(info.isha_iqama_time, year, month, day),
                    current: false,
                    next: false
                },
                {
                    name: 'Jumua',
                    start: convertToDateTime(d.zuhr_start_time, year, month, day),
                    end: convertToDateTime(d.asr_start_time, year, month, day),
                    iqamah: convertToDateTime(info.jumma1_iqama, year, month, day),
                    current: false,
                    next: false
                },
            ]);
        }).catch((error) => {
            console.log(error);
        });
    }, [masjidId, hour, day, month, year]);

    return [salahTimes, hijri, masjidInfo];
};
