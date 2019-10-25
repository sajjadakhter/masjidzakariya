import React from 'react';
import {renderHook, act} from '@testing-library/react-hooks'
import {useNextSalah2} from "./useNextSalah2";
import moment from "moment";


function tt(t) {
    return moment(t, "hh:mm a")
}

function tt2(t) {
    return moment(t, "hh:mm a").add(1, "day")
}

const salahTimes = {
    today: {
        times: [
            {
                name: 'Fajar',
                start: tt("05:15 am"),
                end: tt("6:15 am"),
                iqamah: tt("05:45 am"),
                current: false,
                next: false
            },
            // {
            //     name: 'Shuruq',
            //     start: tt("06:15 am"),
            //     end: tt("1:15 pm"),
            // },
            {
                name: 'Zuhar',
                start: tt("13:15 pm"),
                end: tt("6:15 pm"),
                iqamah: tt("1:40 pm"),
                current: false,
                next: false
            },
            {
                name: 'Asar',
                start: tt("6:15 pm"),
                end: tt("8:00 pm"),
                iqamah: tt("7:00 pm"),
                current: false,
                next: false
            },
            {
                name: 'Magrib',
                start: tt("8:00 pm"),
                end: tt("10:15 pm"),
                iqamah: tt("8:00 pm"),
                current: false,
                next: false
            },
            {
                name: 'Isha',
                start: tt("10:15 pm"),
                end: tt("05:15 am").add(1, "day"),
                iqamah: tt("10:30 pm"),
                current: false,
                next: false
            }
            // ,
            // {
            //     name: 'Friday',
            //     start: tt("13:15"),
            //     end: tt("18:15"),
            //     iqamah: tt("13:40"),
            //     current: false,
            //     next: false
            // }
        ]
    },
    tomorrow: {
        times: [
            {
                name: 'Fajar',
                start: tt2("05:15 am"),
                end: tt2("6:15 am"),
                iqamah: tt2("05:45 am"),
                current: false,
                next: false
            },
            // {
            //     name: 'Shuruq',
            //     start: tt("06:15 am"),
            //     end: tt("1:15 pm"),
            // },
            {
                name: 'Zuhar',
                start: tt2("13:15 pm"),
                end: tt2("6:15 pm"),
                iqamah: tt2("1:40 pm"),
                current: false,
                next: false
            },
            {
                name: 'Asar',
                start: tt2("6:15 pm"),
                end: tt2("8:00 pm"),
                iqamah: tt2("6:45 pm"),
                current: false,
                next: false
            },
            {
                name: 'Magrib',
                start: tt2("8:00 pm"),
                end: tt2("10:15 pm"),
                iqamah: tt2("8:00 pm"),
                current: false,
                next: false
            },
            {
                name: 'Isha',
                start: tt2("10:15 pm"),
                end: tt2("05:15 am").add(1, "day"),
                iqamah: tt2("10:30 pm"),
                current: false,
                next: false
            }
            // ,
            // {
            //     name: 'Friday',
            //     start: tt("13:15"),
            //     end: tt("18:15"),
            //     iqamah: tt("13:40"),
            //     current: false,
            //     next: false
            // }
        ]
    }
};

const config = {mintoishraq: 10, mintozawal: 12};

test('before fajr test', () => {
    const {result} = renderHook(() => useNextSalah2(tt("04:10 am"), salahTimes, config));
    const [salahToDisplay, msg, current, next, isProhibted] = result.current;
    expect(msg).toEqual("Isha time ends in an hour");
    //expect(salahToDisplay[4].isCurrent).toEqual(true);
    expect(current).toEqual(4);
    expect(next).toEqual(0);
    expect(salahToDisplay[4].showTomorrow).toEqual(false);
});

test('right at fajr test', () => {
    const {result} = renderHook(() => useNextSalah2(tt("05:15 am"), salahTimes, config));
    const [salahToDisplay, msg, current, next, isProhibted] = result.current;
    expect(msg).toEqual("Iqamah for Fajar in 30 minutes");
    expect(current).toEqual(0);
    expect(next).toEqual(1);
});

test('before ishraq test', () => {
    const {result} = renderHook(() => useNextSalah2(tt("06:24 am"), salahTimes, config));
    const [salahToDisplay, msg, current, next, isProhibted] = result.current;
    expect(msg).toEqual("Prohibited time for Salah");
    expect(isProhibted).toEqual(true);
    expect(next).toEqual(1);
    expect(salahToDisplay[0].showTomorrow).toEqual(true);
});

test('right at ishraq test', () => {
    const {result} = renderHook(() => useNextSalah2(tt("06:25 am"), salahTimes, config));
    const [salahToDisplay, msg, current, next, isProhibted] = result.current;
    expect(msg).toEqual("Zuhar starts in 7 hours");
    expect(isProhibted).toEqual(false);
    expect(next).toEqual(1);
    expect(salahToDisplay[0].showTomorrow).toEqual(true);
});

test('after sharooq before zuhar', () => {
    const {result} = renderHook(() => useNextSalah2(tt("06:16 am"), salahTimes, config));
    const [salahToDisplay, msg, current, next, isProhibted] = result.current;
    expect(msg).toEqual("Prohibited time for Salah");
    expect(current).toEqual(-1);
    expect(next).toEqual(1);
    expect(salahToDisplay[0].showTomorrow).toEqual(true);
});

test('before prohibted start before zuhar', () => {
    const {result} = renderHook(() => useNextSalah2(tt("13:03 pm"), salahTimes, config));
    const [salahToDisplay, msg, current, next, isProhibted] = result.current;
    expect(msg).toEqual("Zuhar starts in 12 minutes");
    expect(isProhibted).toEqual(false); //issue
    expect(current).toEqual(-1);
    expect(next).toEqual(1);
    expect(salahToDisplay[0].showTomorrow).toEqual(true);
});

test('prohibted start before zuhar', () => {
    const {result} = renderHook(() => useNextSalah2(tt("13:05 pm"), salahTimes, config));
    const [salahToDisplay, msg, current, next, isProhibted] = result.current;
    expect(msg).toEqual("Prohibited time for Salah");
    expect(isProhibted).toEqual(true);
    expect(current).toEqual(-1);
    expect(next).toEqual(1);
    expect(salahToDisplay[0].showTomorrow).toEqual(true);
});

test('prohibted before zuhar', () => {
    const {result} = renderHook(() => useNextSalah2(tt("13:14 pm"), salahTimes, config));
    const [salahToDisplay, msg, current, next, isProhibted] = result.current;
    expect(msg).toEqual("Prohibited time for Salah");
    expect(isProhibted).toEqual(true);
    expect(current).toEqual(-1);
    expect(next).toEqual(1);
    expect(salahToDisplay[0].showTomorrow).toEqual(true);
});

test('at zuhar', () => {
    const {result} = renderHook(() => useNextSalah2(tt("1:16 pm"), salahTimes, config));
    const [salahToDisplay, msg, current, next, isProhibted] = result.current;
    expect(msg).toEqual("Iqamah for Zuhar in 24 minutes");
    expect(isProhibted).toEqual(false);
    expect(current).toEqual(1);
    expect(next).toEqual(2);
    expect(salahToDisplay[1].showTomorrow).toEqual(false);
});

test('at asar', () => {
    const {result} = renderHook(() => useNextSalah2(tt("6:16 pm"), salahTimes, config));
    const [salahToDisplay, msg, current, next, isProhibted] = result.current;
    expect(msg).toEqual("Iqamah for Asar in 44 minutes");
    expect(isProhibted).toEqual(false);
    expect(current).toEqual(2);
    expect(next).toEqual(3);
    expect(salahToDisplay[2].isIqamahChanging).toEqual(true);
    expect(salahToDisplay[0].showTomorrow).toEqual(true);
    expect(salahToDisplay[1].showTomorrow).toEqual(true);
});

test('at magrib', () => {
    const {result} = renderHook(() => useNextSalah2(tt("8:16 pm"), salahTimes, config));
    const [salahToDisplay, msg, current, next, isProhibted] = result.current;
    expect(msg).toEqual("Magrib time ends in 2 hours");
    expect(isProhibted).toEqual(false);
    expect(current).toEqual(3);
    expect(next).toEqual(4);
    expect(salahToDisplay[0].showTomorrow).toEqual(true);
    expect(salahToDisplay[1].showTomorrow).toEqual(true);
    expect(salahToDisplay[2].showTomorrow).toEqual(true);
});

test('at isha', () => {
    const {result} = renderHook(() => useNextSalah2(tt("10:16 pm"), salahTimes, config));
    const [salahToDisplay, msg, current, next, isProhibted] = result.current;
    expect(msg).toEqual("Iqamah for Isha in 14 minutes");
    expect(isProhibted).toEqual(false);
    expect(current).toEqual(4);
    expect(next).toEqual(0);
});

test('at isha after midnight', () => {
    const {result} = renderHook(() => useNextSalah2(tt("12:16 am"), salahTimes, config));
    const [salahToDisplay, msg, current, next, isProhibted] = result.current;
    expect(msg).toEqual("Isha time ends in 5 hours");
    expect(current).toEqual(4);
    expect(next).toEqual(0);
});
