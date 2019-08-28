import React, {useEffect, useState} from 'react';

export const useNextSalah = (tfajar, today, salahTimes) => {
        const [nextsalah, setNextsalah] = useState('');
        const [currentSalah, setCurrentsalah] = useState('');
        const [nextsalahName, setNextsalahName] = useState('Fajar');
        const [salahMsg, setsalahMsg] = useState('');
        const [updatedSalahTimes, setUpdateSalahTimes] = useState([]);

        function jsonCopy(src) {
            return JSON.parse(JSON.stringify(src));
        }

        const updateTimetype = (salahtime) => {
            if (today < salahtime.start) {
                setsalahMsg('starts');
                setNextsalah(salahtime.start);
            } else if (today < salahtime.iqamah) {
                setsalahMsg('iqamah');
                setNextsalah(salahtime.iqamah);
            }
        };

        const getNextSalah = (salahTimes, tfajar, i) => {

            if (i >= salahTimes.length - 2) {
                if (today.hours() > 12) {
                    return [tfajar, 0];
                } else {
                    return [salahTimes[0], 0]
                }
            }
            if (i === 0 || i === 1) {
                return [salahTimes[2], 2];
            }
            return [salahTimes[i + 1], i + 1];
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

            if (salahTimes === undefined || salahTimes.length < 5 || tfajar === undefined) {
                return;
            }
            var salahTimes2 = jsonCopy(salahTimes);

            var currIndex = getCurrentSalahIndex(salahTimes2);
            var [nextSalah, nextIndex] = getNextSalah(salahTimes2, tfajar, currIndex);

            salahTimes2.forEach(item => {
                item.next = false;
                item.current = false
            });

            if (currIndex !== 1) { // there is no current between sharuq and zuhar
                salahTimes2[currIndex].current = true;
            }
            salahTimes2[nextIndex].next = true;

            setNextsalahName(nextSalah.name);
            setNextsalah(nextSalah.iqamah);
            setsalahMsg("");

            setUpdateSalahTimes(salahTimes2);
        }, [tfajar, salahTimes]);

        return [nextsalahName, nextsalah, salahMsg, updatedSalahTimes];
    }
;
