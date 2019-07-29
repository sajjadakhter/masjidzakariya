import {Col} from "react-bootstrap";

import moment from 'moment'
import React from "react";


const NextSalahDisplay = ({salahName, salahtime, salahMsg}) => {
    return (
        <div className={'next-salah'}>
            <div className={'title'}> {salahName} {salahMsg} in</div>
            <div
                className={'time'}>  {moment.duration(moment(salahtime).diff(moment())).format(", h [hours], m [minutes]", {trim: true})}</div>
        </div>
    );
};

export default NextSalahDisplay;
