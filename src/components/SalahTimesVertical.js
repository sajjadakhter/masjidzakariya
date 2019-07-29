import {Col, Row} from "react-bootstrap";
import Moment from "react-moment";
import React from "react";

const SalahTimesVertical = ({fajar, shuruq, zuhar, asar, magrib, isha, friday, className, showIqamaTitle, salahTimes}) => {
    const iqamFormat = "h:mm";
    return (
        <Row className={className}>
            <Col sm={1}/>
            <Col sm={10}>
                <Row> </Row>
                {salahTimes.map((item) => {
                    return <Row style={{alignContent: 'center'}} className={item.current ? 'current' : ''}>
                        <Col className={'title'}>{item.name}</Col>
                        <Col> {item.name !== 'Shuruq' &&
                        <div className={'info'}>
                            <Moment format={iqamFormat}>
                                {item.start}
                            </Moment>-<Moment format={iqamFormat}>{item.end}</Moment>
                        </div>
                        } </Col>
                        <Col>
                            <Moment format={iqamFormat}>
                                {item.name === 'Shuruq' ? item.start : item.iqamah}
                            </Moment>

                        </Col>
                    </Row>
                })}
            </Col>
            <Col sm={1}></Col>
        </Row>
    );
};


export default SalahTimesVertical;