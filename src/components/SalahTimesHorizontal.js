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
                            className={salahTimes.salahToDisplay[i].isCurrent ? 'current' : (salahTimes.salahToDisplay[i].isNext ? 'next' : '')}>
                            <div className={'title'}>{item.name}</div>
                            {salahTimes.today.times[i].noiqamah ?
                                <time className={'time'} style={{fontSize: "60%"}}> no Iqamah</time>
                                :
                                <Moment className={'time'}
                                        format={iqamFormat}>
                                    {salahTimes.salahToDisplay[i].showTomorrow ? salahTimes.tomorrow.times[i].iqamah : (
                                        salahTimes.salahToDisplay[i].isCurrent && !salahTimes.salahToDisplay[i].isIqamah ? salahTimes.tomorrow.times[i].iqamah :
                                            item.iqamah)}
                                </Moment>
                            }

                            <div className={'info'}>
                                <Moment format={iqamFormat}>
                                    {salahTimes.salahToDisplay[i].showTomorrow ? salahTimes.tomorrow.times[i].start : item.start}
                                </Moment>
                                <span>-</span>
                                <Moment
                                    format={iqamFormat}>{salahTimes.salahToDisplay[i].showTomorrow ? salahTimes.tomorrow.times[i].end : item.end}</Moment>
                            </div>

                        </Col>
                    })}
                </Row>
            </Col>
        </Row>
    );
};


export default SalahTimesHorizontal;
