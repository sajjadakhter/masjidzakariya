import React, {useEffect, useState} from 'react';

export const useNextSalah = (currentTime, salahTimes) => {
        const [next, setNext] = useState(-1);
        const [current, setCurrent] = useState(-1);

        const getNextSalahIndex = (salahTimes) => {

            var i = 0;

            for (i = 0; i < salahTimes.length; i++) {
                var cur = salahTimes[i];
                if (currentTime < cur.start) {
                    return i;
                }
            }

            return 0; //its after ish then next is fajar
        };

        const getCurrentSalahIndex = (salahTimes) => {
            var i = 0;
            for (i = 0; i < salahTimes.length; i++) {
                var cur = salahTimes[i];
                if (i === 4 && (currentTime < cur.end || currentTime >= cur.start)) {
                    return 4;
                }

                if (currentTime >= cur.start && currentTime < cur.end) {
                    return i;
                }

            }

            return -1;
        };

        // const isItFriday = () => {
        //     return (currentTime.day() === 5);
        // };

        useEffect(() => {

            if (salahTimes === undefined || salahTimes.length < 5) {
                return;
            }

            const currIndex = getCurrentSalahIndex(salahTimes);
            setCurrent(currIndex);


            const nextIndex = getNextSalahIndex(salahTimes);
            setNext(nextIndex);

            console.log({currIndex: currIndex, nextIndex: nextIndex, currentTime: currentTime.toString()})
        }, [salahTimes, currentTime]);

        return [current, next];
    }
;
