import React, {useEffect, useState} from 'react';


export const useNextSalah = (fajar, shuruq, zuhar, asar, magrib, isha, tfajar, today, time, salahTimes) => {
        const [nextsalah, setNextsalah] = useState('');
        const [nextsalahName, setNextsalahName] = useState('Fajar');
        const [salahMsg, setsalahMsg] = useState('');
        const [updatedSalahTimes, setUpdateSalahTimes] = useState([]);
        const updateTimetype = (salahtime) => {
            if (today < salahtime.start) {
                setsalahMsg('starts');
                setNextsalah(salahtime.start);
            } else if (today < salahtime.iqamah) {
                setsalahMsg('iqamah');
                setNextsalah(salahtime.iqamah);
            }
        };

        useEffect(() => {
            salahTimes.forEach(item => item.current = false);
            var i = 0;
            for (i = 0; i < salahTimes.length; i++) {
                var current = salahTimes[i]
                if (today < current.start && current.name !== 'Shuruq') {
                    current.current = true;
                    updateTimetype(current);
                    break;
                }
            }

            if (salahTimes.length > 0 && i >= salahTimes.length) {
                setNextsalahName('Fajar');
                updateTimetype(tfajar);
                salahTimes[0].current = true;
            }

            if (salahTimes.length > 6) {
                salahTimes[5].end = tfajar.start;
            }
            setUpdateSalahTimes(salahTimes);


        }, [fajar, zuhar, asar, magrib, isha, shuruq, time]);

        return [nextsalahName, nextsalah, salahMsg, updatedSalahTimes];
    }
;



