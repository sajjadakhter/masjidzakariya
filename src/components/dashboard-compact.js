import React from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import './dashboard.css'
import './dashboard-compact.css';
import SalahTimesHorizontal from "./SalahTimesHorizontal"
import CurrentTimeDisplay from "./CurrentTimeDisplay";
import NextSalahDisplay from "./nextSalahDisplay";
import CurrentDateDisplay from "./CurrentDateDisplay";
import {useQueryParams, NumberParam} from "use-query-params";
import {useSalahTimes} from "./useSalahTimes";

function DashboardCompact() {

    const [query] = useQueryParams({masjidid: NumberParam});
    const [salah, datetime, masjid] = useSalahTimes(query.masjidid);

    return (
        <div className="App compact-dashboard">
            <Container fluid>
                <Row>
                    <Col className={'masjid-name'}>
                        {masjid.name} {masjid.shortname}
                    </Col>
                </Row>
                <Row className={'clock'}>
                    <Col sm={4} className={'timecontainer'}>
                        <CurrentTimeDisplay tick={datetime.now.second}/>
                    </Col>
                </Row>
                <Row className={'toprow compact-top-meta'}>
                    <Col className={'compact-meta-left'}>
                        <CurrentDateDisplay time={datetime.now.second} hijri={datetime.hijri}/>
                        <NextSalahDisplay salahTimes={salah} currTime={datetime.now.raw}/>
                    </Col>
                </Row>

                <SalahTimesHorizontal
                    className={'today'}
                    salahTimes={salah}
                />

            </Container>
        </div>);
}

export default DashboardCompact;
