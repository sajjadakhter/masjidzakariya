import React, {useEffect, useState} from 'react';
import axios from "axios";
import moment from "moment";
import {
    useQueryParams,
    StringParam,
    NumberParam,
    ArrayParam,
} from 'use-query-params';

export const useSalahTimes = (day, month, year, masjidId) => {
    const [fajar, setFajar] = useState({});
    const [shuruq, setshuruq] = useState({});
    const [zuhar, setZuhar] = useState({});
    const [asar, setAsar] = useState({});
    const [magrib, setMagrib] = useState({});
    const [isha, setIsha] = useState({});
    const [hijri, setHijri] = useState({});
    const [salahTimes, setSalahTimes] = useState([]);
    const [masjidInfo, setMasjidInfo] = useState({});

    const convertToDateTime = (time) => {
        const fullTime = time + year + ':' + month + ':' + day;
        const mtime = moment(fullTime, "hh:mm a YYYY:M:D");
        return mtime;
    };


    useEffect(() => {
        const iqamahUrl = 'https://ummahsoft.org/salahtime/api/masjidi/v1/index.php/masjids/' + masjidId + '/iqamahandprayertimes/' + year + '/' + month;

        axios.get(iqamahUrl).then((result) => {
            console.log(result);
            console.log(result.data.iqamaTimes);

            const info = result.data.masjidInfo;
            const d = result.data.prayerTimes[day - 1];
            setMasjidInfo({name: info.title, shortname: JSON.parse(info.masjid_preferences).short_name});
            setFajar({start: convertToDateTime(d.fajr_start_time), iqamah: convertToDateTime(info.fajr_iqama_time)});
            setshuruq(convertToDateTime(d.shuruq));
            setZuhar({start: convertToDateTime(d.zuhr_start_time), iqamah: convertToDateTime(info.zuhr_iqama_time)});
            setAsar({start: convertToDateTime(d.asr_start_time), iqamah: convertToDateTime(info.asr_iqama_time)});
            setMagrib({start: convertToDateTime(d.magrib_start_time), iqamah: convertToDateTime(d.magrib_start_time)});
            setIsha({start: convertToDateTime(d.isha_start_time), iqamah: convertToDateTime(info.isha_iqama_time)});
            setHijri({month: parseInt(d.hijri_month), day: parseInt(d.hijri_day), year: 1440, date: d.hijri_date});
            setSalahTimes([
                {
                    name: 'Fajar',
                    start: convertToDateTime(d.fajr_start_time),
                    end: convertToDateTime(d.shuruq),
                    iqamah: convertToDateTime(info.fajr_iqama_time),
                    current: false
                },
                {name: 'Shuruq', start: convertToDateTime(d.shuruq)},
                {
                    name: 'Zuhar',
                    start: convertToDateTime(d.zuhr_start_time),
                    end: convertToDateTime(d.asr_start_time),
                    iqamah: convertToDateTime(info.zuhr_iqama_time),
                    current: false
                },
                {
                    name: 'Asar',
                    start: convertToDateTime(d.asr_start_time),
                    end: convertToDateTime(d.magrib_start_time),
                    iqamah: convertToDateTime(info.asr_iqama_time),
                    current: false
                },
                {
                    name: 'Magrib',
                    start: convertToDateTime(d.magrib_start_time),
                    end: convertToDateTime(d.isha_start_time),
                    iqamah: convertToDateTime(d.magrib_start_time),
                    current: false
                },
                {
                    name: 'Isha',
                    start: convertToDateTime(d.isha_start_time),
                    end: convertToDateTime(d.fajr_start_time),
                    iqamah: convertToDateTime(info.isha_iqama_time),
                    current: false
                },
                {
                    name: 'Friday',
                    start: convertToDateTime(d.zuhr_start_time),
                    end: convertToDateTime(d.asr_start_time),
                    iqamah: convertToDateTime(info.jumma1_iqama),
                    current: false
                },
            ]);
        }).catch((error) => {
            console.log(error);
        });
    }, [day, masjidId, month, year]);

    return [fajar, zuhar, asar, magrib, isha, shuruq, hijri, salahTimes, masjidInfo];
};
