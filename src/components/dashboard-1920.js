import React from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import {useSalahTimes} from './useSalahTimes'
import moment from 'moment'
import './dashboard-1920.css';
import SalahTimesHorizontal from "./SalahTimesHorizontal"
import CurrentTimeDisplay from "./CurrentTimeDisplay";
import NextSalahDisplay from "./nextSalahDisplay";
import {useNextSalah} from "./useNextSalah";
import CurrentDateDisplay from "./CurrentDateDisplay";
import useClock from "./useClock"

function Dashboard1920() {

    //const {time, raw: currentTime} = useClock("HH:mm:ss");

    const [datetime, hour, min, second] = useClock();

    const today = moment();
    const tomorrow = moment().add(1, 'days');

    const [fajar, zuhar, asar, magrib, isha, shuruq, hijri, salahTimes, masjidInfo] = useSalahTimes(today.date(), today.month() + 1, today.year(), 4230);
    const [tfajar, tzuhar, tasar, tmagrib, tisha, tshuruq, thijri, tsalahTimes] = useSalahTimes(tomorrow.date(), tomorrow.month() + 1, tomorrow.year(), 4230);
    const [nextsalahName, nextsalah, salahMsg, updatedSalahTimes] = useNextSalah(fajar, shuruq, zuhar, asar, magrib, isha, tfajar, today, datetime, salahTimes);

    return (
        <div className="App">
            <Container fluid>
                <Row>
                    <Col className={'masjid-name'}>
                        {masjidInfo.name} {masjidInfo.shortname}
                    </Col>
                </Row>
                <Row className={'toprow'}>
                    <Col sm={1}/>
                    <Col sm={4}>
                        <Col sm={1}/>
                        <Col sm={10}>
                            <CurrentDateDisplay time={second} hijri={hijri}/>
                            <NextSalahDisplay salahName={nextsalahName} salahMsg={salahMsg} salahtime={nextsalah}/>

                        </Col>
                        <Col sm={1}/>
                    </Col>
                    <Col sm={2}/>
                    <Col sm={4} className={'timecontainer'}>
                        <CurrentTimeDisplay tick={second}/>
                    </Col>
                    <Col sm={1}/>
                </Row>

                <SalahTimesHorizontal
                    className={'today'}
                    salahTimes={updatedSalahTimes}
                    fajar={fajar.iqamah}
                    shuruq={shuruq}
                    zuhar={zuhar.iqamah}
                    asar={asar.iqamah}
                    magrib={magrib.iqamah}
                    isha={isha.iqamah}
                    friday={zuhar.iqamah}/>

            </Container>
        </div>);
}

export default Dashboard1920;
