import {Col, Row} from "react-bootstrap";
import Moment from "react-moment";
import React from "react";


const SalahTimesVertical = ({className, showIqamaTitle, salahTimes}) => {
    const iqamFormat = "h:mm";

    return (
        <Row className={className}>
            <Col sm={1}/>
            <Col sm={10}>
                <Row> </Row>
                {salahTimes.today.times.map((item, i) => {
                    return <Row style={{alignContent: 'center'}}
                                className={salahTimes.salahToDisplay[i].isCurrent ? 'current' : (salahTimes.salahToDisplay[i].isNext ? 'next' : '')}>
                        <Col className={'title'}>{item.name}</Col>
                        <Col>
                            <div className={'info'}>
                                <Moment format={iqamFormat}>
                                    {salahTimes.salahToDisplay[i].showTomorrow ? salahTimes.tomorrow.times[i].start : item.start}
                                </Moment>-<Moment
                                format={iqamFormat}>{salahTimes.salahToDisplay[i].showTomorrow ? salahTimes.tomorrow.times[i].end : item.end}</Moment>
                            </div>
                        </Col>
                        <Col>
                            <Moment format={iqamFormat}>
                                {salahTimes.salahToDisplay[i].showTomorrow ? salahTimes.tomorrow.times[i].iqamah : (
                                    salahTimes.salahToDisplay[i].isCurrent && !salahTimes.salahToDisplay[i].isIqamah ? salahTimes.tomorrow.times[i].iqamah :
                                        item.iqamah)}
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
