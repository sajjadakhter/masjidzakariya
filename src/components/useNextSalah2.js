import React, {useEffect, useState} from 'react';
import moment from 'moment'

export const useNextSalah2 = (currentTime, salahTimes, config) => {
        const [next, setNext] = useState(-1);
        const [current, setCurrent] = useState(-1);
        const [isProhibted, setisProhibted] = useState(false);
        const [salahToDisplay, setSalahToDisplay] = useState([
            {showTomorrow: false, isIqamah: false, isIqamahChanging: false, isCurrent: false, isNext: false},
            {showTomorrow: false, isIqamah: false, isIqamahChanging: false, isCurrent: false, isNext: false},
            {showTomorrow: false, isIqamah: false, isIqamahChanging: false, isCurrent: false, isNext: false},
            {showTomorrow: false, isIqamah: false, isIqamahChanging: false, isCurrent: false, isNext: false},
            {showTomorrow: false, isIqamah: false, isIqamahChanging: false, isCurrent: false, isNext: false}
        ]);
        const [msg, setMsg] = useState("");

        const getNextSalahIndex = () => {
            for (var i = 0; i < salahToDisplay.length; i++) {
                if (salahToDisplay[i].isNext) {
                    return i;
                }
            }
            return 0;
        };

        const getCurrentSalahIndex = () => {
            for (var i = 0; i < salahToDisplay.length; i++) {
                if (salahToDisplay[i].isCurrent) {
                    return i;
                }
            }

            return -1;
        };

        // const isItFriday = () => {
        //     return (currentTime.day() === 5);
        // };

        const isItProhibtedTime = () => {
            const fajarend = salahTimes.today.times[0].end;
            const zuharstart = salahTimes.today.times[1].start;

            return (currentTime > fajarend && currentTime < moment(fajarend).add(config.mintoishraq, "m")) ||
                (currentTime < zuharstart && currentTime > moment(zuharstart).subtract(config.mintozawal, "m"));
        };


        var minutesOfDay = function (m) {
            return m.minutes() + m.hours() * 60;
        };

        const UpdatreSalahTimesToShow = () => {
            console.log(salahTimes);
            //pick salah times to display
            //if iqama is over + config.waitforsalah (8min)
            //Show tomorrow's iqama
            //if tomorrow's iqama is changing flash it (except magrib)
            //once salah time is ended and time is after tomorrow's salah end then show tomorrow's salah star,end
            if (salahTimes.today.times.length < 4 || salahTimes.tomorrow.times.length < 4) {
                return;
            }
            let i;
            let foundNext = false;
            let foundCurrent = false;

            for (i = 0; i < salahTimes.today.times.length; i++) {
                salahToDisplay[i].isCurrent = false;
                salahToDisplay[i].isNext = false;
            }
            if (currentTime < salahTimes.today.times[0].start) {
                //its after midnight but before fajar
                foundCurrent = true;
                foundNext = true;
                salahToDisplay[0].isNext = true;
                salahToDisplay[4].isCurrent = true;

            }
            for (i = 0; i < salahTimes.today.times.length; i++) {
                let currSallah = salahTimes.today.times[i];

                salahToDisplay[i].isIqamahChanging = (minutesOfDay(currSallah.iqamah) !== minutesOfDay(salahTimes.tomorrow.times[i].iqamah));
                if (!foundCurrent) {
                    salahToDisplay[i].isCurrent = (currentTime >= currSallah.start && currentTime < currSallah.end);
                }

                if (!foundNext && currentTime < currSallah.start) {
                    foundNext = true;
                    salahToDisplay[i].isNext = true;
                }

                salahToDisplay[i].showTomorrow = (currentTime > currSallah.end);
                salahToDisplay[i].isIqamah = (currentTime >= currSallah.start && currentTime < currSallah.iqamah);
            }

            if (salahToDisplay[4].isCurrent) { //if current is isha then fajar is next
                salahToDisplay[0].isNext = true;
            }

            setSalahToDisplay(salahToDisplay);
        };


        useEffect(() => {

            if (salahTimes.today.times.length < 4 || salahTimes.tomorrow.times.length < 4) {
                return;
            }

            UpdatreSalahTimesToShow();
            const currIndex = getCurrentSalahIndex();
            const nextIndex = getNextSalahIndex();
            const prohibtedTiem = isItProhibtedTime();

            setCurrent(currIndex);
            setNext(nextIndex);
            setisProhibted(prohibtedTiem);

            if (currIndex !== -1) {
                if (salahToDisplay[currIndex].isIqamah) {
                    setMsg("Iqamah for " + salahTimes.today.times[currIndex].name + " in " + moment.duration(currentTime.diff(salahTimes.today.times[currIndex].iqamah)).humanize())
                } else {
                    setMsg(salahTimes.today.times[currIndex].name + " time ends in " + moment.duration(currentTime.diff(salahTimes.today.times[currIndex].end)).humanize())

                    if (currentTime < salahTimes.today.times[0].start) {
                        setMsg(salahTimes.today.times[4].name + " time ends in " + moment.duration(currentTime.diff(salahTimes.today.times[0].start)).humanize())
                    }
                }
            } else {
                if (prohibtedTiem) {
                    setMsg("Prohibited time for Salah")
                } else {
                    setMsg(salahTimes.today.times[nextIndex].name + " starts in " + moment.duration(currentTime.diff(salahTimes.today.times[nextIndex].start)).humanize())
                }
            }

            //   console.log({currIndex: currIndex, nextIndex: nextIndex, currentTime: currentTime.toString()})
        }, [salahTimes, currentTime]);

        return [salahToDisplay, msg, current, next, isProhibted];
    }
;
