import React, {useEffect, useState} from 'react';
import {Col, Row} from 'react-bootstrap';
import useClock from 'react-use-clock-hook';
import Moment from 'react-moment';
import {useSalahTimes} from './useSalahTimes'
import moment from 'moment'
import './App.css';

function App() {


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

    return (

        <div className="App">
            <Row className={'toprow'}>
                <Col sm={5}>
                    <Row>
                        <Col>
                            <h3>Masjid Zakariya</h3>
                        </Col>
                        <Col>
                            <h3>مسجد ذکریا</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={1}></Col>
                        <Col sm={6} className={'next-salah'}>
                            <div className={'continer'}>
                                <div className={'title'}> {nextsalahName} {salahMsg} in</div>
                                <div className={'time'}>  {moment.duration(moment(nextsalah).diff(moment())).format(", h [hours], m [minutes]", {trim: true})}</div>
                            </div>

                        </Col>
                        <Col sm={1}></Col>
                    </Row>

                </Col>
                <Col sm={2}> </Col>
                <Col sm={5}>
                    <div className={'timecontainer'}>
                        <div className={'time'}>
                            <div>{raw.format(" h:mm ")}</div>
                            <div className={'ampm'}>{raw.format(" ss a")}</div>
                        </div>
                    </div>
                    <h3>
                        <div>{raw.format("dddd, MMMM Do YYYY")}</div>
                    </h3>
                    <h3>{hijri.day}, {hijri.month}, 1440</h3>
                </Col>
            </Row>
            <Row>
                <Col sm={1}/>
                <Col sm={10}>
                    <Row className={'tomorrow-title'}>
                        <Col sm={12}>
                            Tomorrow
                        </Col>
                    </Row>
                    <Row className={'tomorrow'}>

                        <Col>
                            <Row>-</Row>
                            <Row>Start</Row>
                            <Row>Iqamah</Row>
                        </Col>
                        <Col>
                            <Row>Fajar</Row>
                            <Row><Moment format={'h:m a'}>{tfajar.start}</Moment></Row>
                            <Row><Moment format={'h:m a'}>{tfajar.iqamah}</Moment></Row>
                        </Col>
                        <Col>
                            <Row>Sharuq</Row>
                            <Row><Moment format={'h:mm a'}>{tshuruq.start}</Moment></Row>

                        </Col>
                        <Col>
                            <Row>Zuhar</Row>
                            <Row><Moment format={'h:mm a'}>{tzuhar.start}</Moment></Row>
                            <Row><Moment format={'h:mm a'}>{tzuhar.iqamah}</Moment></Row>
                        </Col>
                        <Col>
                            <Row>Asar</Row>
                            <Row><Moment format={'h:mm a'}>{tasar.start}</Moment></Row>
                            <Row><Moment format={'h:mm a'}>{tasar.iqamah}</Moment></Row>
                        </Col>
                        <Col>
                            <Row>Magrib</Row>

                            <Row><Moment format={'h:mm a'}>{tmagrib.iqamah}</Moment></Row>
                        </Col>
                        <Col>
                            <Row>Isha</Row>
                            <Row><Moment format={'h:mm a'}>{tisha.start}</Moment></Row>
                            <Row><Moment format={'h:mm a'}>{tisha.iqamah}</Moment></Row>
                        </Col>


                    </Row>
                </Col>
                <Col sm={1}/>
            </Row>
            <Row className={'iqama'}>
                <Col sm={1}/>
                <Col sm={10}>
                    <Row className={'title'}>
                        <Col>

                        </Col>
                        <Col>Fajar</Col>
                        <Col>Sharooq</Col>
                        <Col>Zuher</Col>
                        <Col>Aser</Col>
                        <Col>Magrib</Col>
                        <Col>Isha</Col>
                    </Row>
                    <Row className={'times'}>
                        <Col>
                            <Row>Iqama</Row>
                        </Col>
                        <Col><Moment format={'h:mm a'}>{fajar.iqamah}</Moment></Col>
                        <Col><Moment format={'h:mm a'}>{shuruq}</Moment></Col>
                        <Col><Moment format={'h:mm a'}>{zuhar.iqamah}</Moment></Col>
                        <Col><Moment format={'h:mm a'}>{asar.iqamah}</Moment></Col>
                        <Col><Moment format={'h:mm a'}>{magrib.iqamah}</Moment></Col>
                        <Col><Moment format={'h:mm a'}>{isha.iqamah}</Moment></Col>

                    </Row>

                </Col>
                <Col sm={1}></Col>


            </Row>


        </div>
    );
}

export default App;
