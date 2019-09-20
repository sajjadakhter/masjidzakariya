import React from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import './dashboard.css'
import './dashboard-1920.css';
import SalahTimesHorizontal from "./SalahTimesHorizontal"
import CurrentTimeDisplay from "./CurrentTimeDisplay";
import NextSalahDisplay from "./nextSalahDisplay";
import CurrentDateDisplay from "./CurrentDateDisplay";
import {useQueryParams, NumberParam} from "use-query-params";
import {useSalahTimes} from "./useSalahTimes";

function Dashboard1920() {

    const [query, setQuery] = useQueryParams({masjidid: NumberParam});
    const [salah, datetime, masjid] = useSalahTimes(query.masjidid);

    return (
        <div className="App">
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
                <Row className={'toprow'}>
                    <Col sm={1}/>
                    <Col sm={5}>
                        <Col sm={1}/>
                        <Col sm={10}>
                            <CurrentDateDisplay time={datetime.now.second} hijri={datetime.hijri}/>
                            <NextSalahDisplay salahTimes={salah} currTime={datetime.now.raw}/>
                        </Col>
                        <Col sm={1}/>
                    </Col>
                    <Col sm={2}/>

                    <Col sm={1}/>
                </Row>

                <SalahTimesHorizontal
                    className={'today'}
                    salahTimes={salah}
                />

            </Container>
        </div>);
}

export default Dashboard1920;
