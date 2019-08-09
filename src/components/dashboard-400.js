import React from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import './dashboard-400.css';
import SalahTimesVertical from "./SalahTimesVertical"
import NextSalahDisplay from "./nextSalahDisplay";
import CurrentDateDisplay from "./CurrentDateDisplay";
import {useQueryParams, NumberParam} from "use-query-params";
import {useSalahTimes} from "./useSalahTimes";

function Dashboard400() {
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
                <Row className={'toprow'}>
                    <Col>
                        <CurrentDateDisplay time={datetime.now.second} hijri={datetime.hijri}/>
                        <NextSalahDisplay salahName={salah.next.name} salahMsg={salah.next.msg}
                                          salahtime={salah.next.time}/>
                    </Col>
                </Row>

                <SalahTimesVertical
                    className={'today'}
                    salahTimes={salah.times}
                />

            </Container>
        </div>);
}

export default Dashboard400;
