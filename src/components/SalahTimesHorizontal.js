import {Col, Row} from "react-bootstrap";
import Moment from "react-moment";
import React from "react";

const SalahTimesHorizontal = ({className, showIqamaTitle, salahTimes}) => {
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
                    {salahTimes.today.times.map((item, i) => {
                        return <Col
                            className={i === salahTimes.currentIndex ? 'current' : (i == salahTimes.nextIndex ? 'next' : '')}>
                            <div className={'title'}>{item.name}</div>
                            <Moment className={'time'}
                                    format={iqamFormat}>
                                {item.name === 'Shuruq' ? item.start : item.iqamah}
                            </Moment>
                            {item.name !== 'Shuruq' &&
                            <div className={'info'}>
                                <Moment format={iqamFormat}>
                                    {item.start}
                                </Moment>
                                <span>-</span>
                                <Moment format={iqamFormat}>{item.end}</Moment>
                            </div>
                            }
                        </Col>
                    })}
                </Row>
            </Col>
        </Row>
    );
};


export default SalahTimesHorizontal;
