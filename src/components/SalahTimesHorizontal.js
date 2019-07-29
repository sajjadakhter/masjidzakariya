import {Col, Row} from "react-bootstrap";
import Moment from "react-moment";
import React from "react";

const SalahTimesHorizontal = ({fajar, shuruq, zuhar, asar, magrib, isha, friday, className, showIqamaTitle, salahTimes}) => {
    const iqamFormat = "h:mm";
    return (
        <Row className={className}>
            <Col sm={1}/>
            <Col sm={10}>
                <Row className={'iqama'}>
                    {showIqamaTitle &&
                    <Col>
                        <Row>Iqama</Row>
                    </Col>
                    }
                    {salahTimes.map((item) => {
                        return <Col>
                            <div className={'title'}>{item.name}</div>
                            <Moment className={item.current ? 'current' : ''} format={iqamFormat}>
                                {item.name === 'Shuruq' ? item.start : item.iqamah}
                            </Moment>
                            {item.name !== 'Shuruq' &&
                            <div className={'info'}>
                                <Moment format={iqamFormat}>
                                    {item.start}
                                </Moment>-<Moment format={iqamFormat}>{item.end}</Moment>
                            </div>
                            }
                        </Col>
                    })}
                </Row>

            </Col>
            <Col sm={1}></Col>
        </Row>
    );
};


export default SalahTimesHorizontal;
