import React from 'react';
import {renderHook, act} from '@testing-library/react-hooks'
import {useNextSalah} from "./useNextSalah";
import moment from "moment";


function tt(t) {
    return moment(t, "hh:mm")
}

const salahTimes = [
    {
        name: 'Fajar',
        start: tt("05:15"),
        end: tt("6:15"),
        iqamah: tt("05:45"),
        current: false,
        next: false
    },
    {
        name: 'Shuruq',
        start: tt("06:15"),
        end: tt("13:15"),
    },
    {
        name: 'Zuhar',
        start: tt("13:15"),
        end: tt("18:15"),
        iqamah: tt("13:40"),
        current: false,
        next: false
    },
    {
        name: 'Asar',
        start: tt("18:15"),
        end: tt("20:00"),
        iqamah: tt("19:00"),
        current: false,
        next: false
    },
    {
        name: 'Magrib',
        start: tt("20:00"),
        end: tt("22:15"),
        iqamah: tt("22:30"),
        current: false,
        next: false
    },
    {
        name: 'Isha',
        start: tt("22:15"),
        end: tt("05:15"),
        iqamah: tt("22:30"),
        current: false,
        next: false
    },
    {
        name: 'Friday',
        start: tt("13:15"),
        end: tt("18:15"),
        iqamah: tt("13:40"),
        current: false,
        next: false
    }
];


test('basic test', () => {
    const {result} = renderHook(() => useNextSalah(salahTimes[0], tt("04:10"), salahTimes));
    const [nextsalahName, nextsalah, salahMsg, updatedSalahTimes] = result.current;
    expect(nextsalahName).toEqual('Fajar');
    expect(updatedSalahTimes[5].current).toEqual(true);
    expect(updatedSalahTimes[0].next).toEqual(true);
});

test('after sharooq before zuhar', () => {
    const {result} = renderHook(() => useNextSalah(salahTimes[0], tt("06:16"), salahTimes));
    const [nextsalahName, nextsalah, salahMsg, updatedSalahTimes] = result.current;
    expect(nextsalahName).toEqual('Zuhar');
    expect(updatedSalahTimes[0].current).toEqual(false);
    expect(updatedSalahTimes[2].next).toEqual(true);
});

test('at zuhar', () => {
    const {result} = renderHook(() => useNextSalah(salahTimes[0], tt("13:16"), salahTimes));
    const [nextsalahName, nextsalah, salahMsg, updatedSalahTimes] = result.current;
    expect(nextsalahName).toEqual('Asar');
    expect(updatedSalahTimes[2].current).toEqual(true);
    expect(updatedSalahTimes[3].next).toEqual(true);
});

test('at asar', () => {
    const {result} = renderHook(() => useNextSalah(salahTimes[0], tt("18:16"), salahTimes));
    const [nextsalahName, nextsalah, salahMsg, updatedSalahTimes] = result.current;
    expect(nextsalahName).toEqual('Magrib');
    expect(updatedSalahTimes[3].current).toEqual(true);
    expect(updatedSalahTimes[4].next).toEqual(true);
});

test('at magrib', () => {
    const {result} = renderHook(() => useNextSalah(salahTimes[0], tt("20:16"), salahTimes));
    const [nextsalahName, nextsalah, salahMsg, updatedSalahTimes] = result.current;
    expect(nextsalahName).toEqual('Isha');
    expect(updatedSalahTimes[4].current).toEqual(true);
    expect(updatedSalahTimes[5].next).toEqual(true);
});

test('at isha', () => {
    const {result} = renderHook(() => useNextSalah(salahTimes[0], tt("22:16"), salahTimes));
    const [nextsalahName, nextsalah, salahMsg, updatedSalahTimes] = result.current;
    expect(nextsalahName).toEqual('Fajar');
    expect(updatedSalahTimes[5].current).toEqual(true);
    expect(updatedSalahTimes[0].next).toEqual(true);
});
