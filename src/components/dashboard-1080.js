import React, {useEffect, useState} from 'react';
import {Col, Row, Container} from 'react-bootstrap';
import useClock from 'react-use-clock-hook';
import FitText from '@kennethormandy/react-fittext'
import Moment from 'react-moment';
import {useSalahTimes} from './useSalahTimes'
import moment from 'moment'
import './dashboard-1080.css';
import SalahTimes from "./salahtimes";
import HijriDate from "./HijriDate";


function Dashboard1080() {


    const [nextsalah, setNextsalah] = useState('');
    const [nextsalahName, setNextsalahName] = useState('Fajar');
    const [salahMsg, setsalahMsg] = useState('');
    const {time, raw} = useClock("HH:mm:ss");

    const today = moment();
    const tomorrow = moment().add(1, 'days');

    const [fajar, zuhar, asar, magrib, isha, shuruq, hijri] = useSalahTimes(today.date(), today.month() + 1, today.year(), 4230);
    const [tfajar, tzuhar, tasar, tmagrib, tisha, tshuruq, thijri] = useSalahTimes(tomorrow.date(), tomorrow.month() + 1, tomorrow.year(), 4230);

    const updateTimetype = (salahtime) => {
        if (today < salahtime.start) {
            setsalahMsg('starts');
            setNextsalah(salahtime.start);
        } else if (today < salahtime.iqamah) {
            setsalahMsg('iqamah');
            setNextsalah(salahtime.iqamah);
        }
    };

    useEffect(() => {
        if (today < fajar.start || today < shuruq) {
            setNextsalahName('Fajar');
            updateTimetype(fajar)
        } else if (today < zuhar.iqamah) {
            setNextsalahName('Zuhar');
            updateTimetype(zuhar);
        } else if (today < asar.iqamah) {
            setNextsalahName('Asar');
            updateTimetype(asar);
        } else if (today < magrib.iqamah) {
            setNextsalahName('Magrib');
            updateTimetype(magrib);
        } else if (today < isha.iqamah) {
            setNextsalahName('Isha');
            updateTimetype(isha);
        } else {
            setNextsalahName('Fajar');
            updateTimetype(tfajar);
        }

    }, [fajar, zuhar, asar, magrib, isha, shuruq, raw]);

    const iqamFormat = "h:mm";

    return (

        <div className="App">
            <Container fluid>
                <Row className={'masjid-name'}>
                    <Col sm="6">Masjid Zakariya</Col>
                    <Col sm="6"> مسجد ذکریا</Col>
                </Row>
                <Row className={'toprow'} sm={3}>
                    <Col sm={1}/>
                    <Col sm={4}>
                        <Col sm={1}/>
                        <Col sm={10} className={'next-salah'}>
                            <div className={'continer'}>
                                <div className={'title'}> {nextsalahName} {salahMsg} in</div>
                                <div
                                    className={'time'}>  {moment.duration(moment(nextsalah).diff(moment())).format(", h [hours], m [minutes]", {trim: true})}</div>
                            </div>

                        </Col>
                        <Col sm={1}/>
                    </Col>
                    <Col sm={1}/>
                    <Col sm={4} className={'timecontainer'}>
                        <div>
                            <div className={'time'}>
                                <div>{raw.format(" h:mm ")}</div>
                                <div className={'ampm'}>{raw.format(" ss a")}</div>
                            </div>
                        </div>
                        <div className={'date'}>
                            <div className={'shamsi'}>
                                {raw.format("dddd, MMMM Do")}
                            </div>
                            <div className={'date-hijri'}>
                                <HijriDate day={hijri.day} month={hijri.month} year={hijri.year}/>
                            </div>
                        </div>
                    </Col>
                    <Col sm={1}/>
                </Row>

                <SalahTimes
                    className={'middle-row'}
                    title={'Tomorrow'}
                    fajar={tfajar}
                    zuhar={tzuhar}
                    asar={tasar}
                    magrib={tmagrib}
                    isha={tisha}
                    shuruq={tshuruq}/>


                <Row className={'today'}>
                    <Col sm={12}>
                        <Row>

                            <Col className={'title'}> Fajar </Col>
                            <Col className={'time'}><Moment format={iqamFormat}>{fajar.iqamah}</Moment></Col>
                        </Row>
                        <Row>

                            <Col className={'title'}> Sharooq </Col>
                            <Col className={'time'}><Moment format={iqamFormat}>{shuruq}</Moment></Col>
                        </Row>
                        <Row>

                            <Col className={'title'}> Zuhar </Col>
                            <Col className={'time'}><Moment format={iqamFormat}>{zuhar.iqamah}</Moment></Col>
                        </Row>
                        <Row>
                            <Col className={'title'}> Aser </Col>
                            <Col className={'time'}><Moment format={iqamFormat}>{asar.iqamah}</Moment></Col>
                        </Row>
                        <Row>
                            <Col className={'title'}> Magrib </Col>
                            <Col className={'time'}><Moment format={iqamFormat}>{magrib.iqamah}</Moment></Col>
                        </Row>
                        <Row>
                            <Col className={'title'}> Isha </Col>
                            <Col className={'time'}><Moment format={iqamFormat}>{isha.iqamah}</Moment></Col>
                        </Row>
                    </Col>

                </Row>
            </Container>
        </div>

    );
}

export default Dashboard1080;
