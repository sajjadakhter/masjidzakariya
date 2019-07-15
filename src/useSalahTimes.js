import React, {useEffect, useState} from 'react';
import axios from "axios";
import moment from "moment";


export const useSalahTimes = (day, month, year, masjidId) => {
    const [fajar, setFajar] = useState({});
    const [shuruq, setshuruq] = useState({});
    const [zuhar, setZuhar] = useState({});
    const [asar, setAsar] = useState({});
    const [magrib, setMagrib] = useState({});
    const [isha, setIsha] = useState({});
    const [hijri, setHijri] = useState({});

    const convertToDateTime = (time) => {
        const fullTime = time + year+':'+month+':'+day;
        const mtime = moment(fullTime, "hh:mm a YYYY:M:D");
        return mtime;
    };
    useEffect(()=>{
        const iqamahUrl = 'http://ummahsoft.org/salahtime/api/masjidi/v1/index.php/masjids/'+ masjidId + '/iqamahandprayertimes/'+ year +'/' + month;

        axios.get(iqamahUrl).then((result) => {
            console.log(result);
            console.log(result.data.iqamaTimes);

            const info = result.data.masjidInfo;
            const d = result.data.prayerTimes[day-1];

            setFajar({start: convertToDateTime(d.fajr_start_time), iqamah: convertToDateTime(info.fajr_iqama_time)});
            setshuruq( convertToDateTime(d.shuruq));
            setZuhar({start: convertToDateTime(d.zuhr_start_time), iqamah: convertToDateTime(info.zuhr_iqama_time)});
            setAsar({start: convertToDateTime(d.asr_start_time),  iqamah: convertToDateTime(info.asr_iqama_time)});
            setMagrib({start: convertToDateTime(d.magrib_start_time), iqamah: convertToDateTime(d.magrib_start_time)});
            setIsha({start: convertToDateTime(d.isha_start_time),  iqamah: convertToDateTime(info.isha_iqama_time)});
            setHijri({month: d.hijri_month, day: d.hijri_day, datea: d.hijri_date})

        }).catch((error) => {
            console.log(error);
        });
    },[day, masjidId, month, year]);

    return [fajar, zuhar, asar, magrib, isha, shuruq, hijri];
};
