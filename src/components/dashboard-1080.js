import React from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import {useMasjidData} from './useMasjidData'
import moment from 'moment'
import './dashboard.css'
import './dashboard-1080.css';
import SalahTimesVertical from "./SalahTimesVertical"
import CurrentTimeDisplay from "./CurrentTimeDisplay";
import NextSalahDisplay from "./nextSalahDisplay";
import {useNextSalah} from "./useNextSalah";
import CurrentDateDisplay from "./CurrentDateDisplay";
import useClock from "./useClock"
import {useQueryParams, NumberParam} from "use-query-params";

function Dashboard1920() {

    //const {time, raw: currentTime} = useClock("HH:mm:ss");

    // const [datetime, hour, min, second] = useClock();
    //
    // const today = moment();
    // const tomorrow = moment().add(1, 'days');
    // const [query, setQuery] = useQueryParams({masjidid: NumberParam});
    //
    // const [hijri, salahTimes, masjidInfo] = useMasjidData(today.date(), today.month() + 1, today.year(), query.masjidid);
    // const [thijri, tsalahTimes] = useMasjidData(tomorrow.date(), tomorrow.month() + 1, tomorrow.year(), query.masjidid);
    // const [nextsalahName, nextsalah, salahMsg, updatedSalahTimes] = useNextSalah(tsalahTimes[0], today, salahTimes);

    return <div/>;
    // return (
    //     <div className="App">
    //         <Container fluid>
    //             <Row>
    //                 <Col className={'masjid-name'}>
    //                     {masjidInfo.name} {masjidInfo.shortname}
    //                 </Col>
    //             </Row>
    //             <Row className={'toprow'}>
    //                 <Col sm={1}/>
    //                 <Col sm={4}>
    //                     <Col sm={1}/>
    //                     <Col sm={10}>
    //
    //                         <NextSalahDisplay salahName={nextsalahName} salahMsg={salahMsg} salahtime={nextsalah}/>
    //                     </Col>
    //                     <Col sm={1}/>
    //                 </Col>
    //                 <Col sm={6} className={'timecontainer'}>
    //                     <CurrentTimeDisplay tick={second}/>
    //                     <CurrentDateDisplay time={second} hijri={hijri}/>
    //                 </Col>
    //                 <Col sm={1}/>
    //             </Row>
    //
    //             <Row style={{height: '100px'}}></Row>
    //
    //             <SalahTimesVertical
    //                 className={'today'}
    //                 salahTimes={updatedSalahTimes}
    //             />
    //
    //         </Container>
    //     </div>);
}

export default Dashboard1920;
