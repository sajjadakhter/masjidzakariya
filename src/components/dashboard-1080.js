import React, {useState, useEffect} from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import Popout from 'react-popout'
import moment from 'moment';
import {useQueryParam, NumberParam, BooleanParam} from "use-query-params";

import './dashboard.css'
import './dashboard-1080.css';

import SalahTimesVertical from "./SalahTimesVertical"
import CurrentTimeDisplay from "./CurrentTimeDisplay";
import NextSalahDisplay from "./nextSalahDisplay";
import CurrentDateDisplay from "./CurrentDateDisplay";

import {useSalahTimes} from "./useSalahTimes";
import DebugDuration from "./debugDuration"

function Dashboard1920() {
    const [time, setTime] = useState(moment.duration(0, "hours"));
    const [masjidid, setMasjidId] = useQueryParam('masjidid', NumberParam);
    const [salah, datetime, masjid] = useSalahTimes(masjidid, time);

    return (
        <div className="App">
            <DebugDuration callback={setTime} datetime={datetime}/>
            <Container fluid>
                <Row>
                    <Col className={'masjid-name'}>
                        {masjid.name} {masjid.shortname}
                    </Col>
                </Row>
                <Row className={'toprow1'}>
                    <Col className={'timecontainer'}>
                        <CurrentTimeDisplay tick={datetime.now.second}/>
                    </Col>

                </Row>
                <Row className={'toprow2'}>
                    <Col className={'timecontainer'}>
                        <CurrentDateDisplay time={datetime.now.second} hijri={datetime.hijri}/>
                    </Col>

                </Row>
                <Row className={'toprow3'}>
                    <Col className={'timecontainer'}>
                        <NextSalahDisplay salahTimes={salah} currTime={datetime.now.raw}/>
                    </Col>

                </Row>

                <Row style={{height: '100px'}}></Row>

                <SalahTimesVertical
                    className={'today'}
                    salahTimes={salah}
                />

            </Container>
        </div>
    );
}

export default Dashboard1920;
