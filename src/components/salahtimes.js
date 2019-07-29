import React, {useEffect, useState} from 'react';
import {Col, Row} from "react-bootstrap";
import Moment from "react-moment";

const SalahTimes = (props) => {

    if (props.fajar == undefined) return null;
    const iqamFormat = "h:mm";

    return (
        <Row className={props.className}>
            <Col sm={1}/>
            <Col sm={10} className={'title'}>
                <Row className={'title'}>
                    <Col sm={12}>
                        {props.title}
                    </Col>
                </Row>
                <Row className={'iqama'}>

                    <Col>
                        <Row>-</Row>
                        <Row>Start</Row>
                        <Row>Iqamah</Row>
                    </Col>
                    <Col>
                        <Row>Fajar</Row>
                        <Row><Moment format={iqamFormat}>{props.fajar.start}</Moment></Row>
                        <Row><Moment format={iqamFormat}>{props.fajar.iqamah}</Moment></Row>
                    </Col>
                    <Col>
                        <Row>Sharuq</Row>
                        <Row><Moment format={iqamFormat}>{props.shuruq.start}</Moment></Row>

                    </Col>
                    <Col>
                        <Row>Zuhar</Row>
                        <Row><Moment format={iqamFormat}>{props.zuhar.start}</Moment></Row>
                        <Row><Moment format={iqamFormat}>{props.zuhar.iqamah}</Moment></Row>
                    </Col>
                    <Col>
                        <Row>Asar</Row>
                        <Row><Moment format={iqamFormat}>{props.asar.start}</Moment></Row>
                        <Row><Moment format={iqamFormat}>{props.asar.iqamah}</Moment></Row>
                    </Col>
                    <Col>
                        <Row>Magrib</Row>

                        <Row><Moment format={iqamFormat}>{props.magrib.iqamah}</Moment></Row>
                    </Col>
                    <Col>
                        <Row>Isha</Row>
                        <Row><Moment format={iqamFormat}>{props.isha.start}</Moment></Row>
                        <Row><Moment format={iqamFormat}>{props.isha.iqamah}</Moment></Row>
                    </Col>


                </Row>
            </Col>
            <Col sm={1}/>
        </Row>
    );
}

export default SalahTimes;
