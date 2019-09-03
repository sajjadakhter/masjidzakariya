import React from 'react';
import {renderHook, act} from '@testing-library/react-hooks'
import {useNextSalah} from "./useNextSalah";
import moment from "moment";


function tt(t) {
    return moment(t, "hh:mm a")
}

const salahTimes = [
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
        end: tt("05:15 am"),
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
];


test('before fajr test', () => {
    const {result} = renderHook(() => useNextSalah(tt("04:10 am"), salahTimes));
    const [current, next] = result.current;
    expect(current).toEqual(4);
    expect(next).toEqual(0);
});

test('after sharooq before zuhar', () => {
    const {result} = renderHook(() => useNextSalah(tt("06:16 am"), salahTimes));
    const [current, next] = result.current;
    expect(current).toEqual(-1);
    expect(next).toEqual(1);
});

test('at zuhar', () => {
    const {result} = renderHook(() => useNextSalah(tt("1:16 pm"), salahTimes));
    const [current, next] = result.current;
    expect(current).toEqual(1);
    expect(next).toEqual(2);
});

test('at asar', () => {
    const {result} = renderHook(() => useNextSalah(tt("6:16 pm"), salahTimes));
    const [current, next] = result.current;
    expect(current).toEqual(2);
    expect(next).toEqual(3);
});

test('at magrib', () => {
    const {result} = renderHook(() => useNextSalah(tt("8:16 pm"), salahTimes));
    const [current, next] = result.current;
    expect(current).toEqual(3);
    expect(next).toEqual(4);
});

test('at isha', () => {
    const {result} = renderHook(() => useNextSalah(tt("10:16 pm"), salahTimes));
    const [current, next] = result.current;
    expect(current).toEqual(4);
    expect(next).toEqual(0);
});
