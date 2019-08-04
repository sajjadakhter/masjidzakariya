import React, {useEffect, useState} from 'react';


export const useNextSalah = (tfajar, today, salahTimes) => {
        const [nextsalah, setNextsalah] = useState('');
        const [currentSalah, setCurrentsalah] = useState('');
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

        const getNextSalah = (salahTimes, i) => {
            if (i >= salahTimes.length - 2) {
                return salahTimes[0];
            }
            if (i === 0 || i === 1) {
                return salahTimes[2];
            }
            return salahTimes[i + 1];
        };

        const getCurrentSalahIndex = (salahTimes) => {
            var i = 0;
            for (i = 0; i < salahTimes.length; i++) {
                var cur = salahTimes[i];
                if (today >= cur.start && today < cur.end) {
                    return i;
                }
            }

            return 5;
        };

        const isItFriday = () => {
            return (today.day() === 5);
        };

        useEffect(() => {
            if (salahTimes === undefined || salahTimes.length < 5) {
                return;
            }
            var currIndex = getCurrentSalahIndex(salahTimes);
            var next = getNextSalah(salahTimes, currIndex);

            salahTimes.forEach(item => {
                item.next = false;
                item.current = false
            });

            salahTimes[currIndex].current = true;
            next.next = true;

            setNextsalahName(next.name);
            setNextsalah(next.iqamah);
            setsalahMsg("");


            setUpdateSalahTimes(salahTimes);
        }, [tfajar, salahTimes]);

        return [nextsalahName, nextsalah, salahMsg, updatedSalahTimes];
    }
;



