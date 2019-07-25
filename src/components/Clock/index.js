import React, {useEffect, useState, useRef, useCallback} from 'react'
import styled, {ThemeProvider} from 'styled-components';


const useNodeRef = () => {
    console.log("useNodeRef");
    const [node, setNode] = useState(null);
    const ref = useCallback(node => {
        setNode(node);
    }, []);

    return [node, ref];
};

const useElementWidth = node => {
    console.log("useElementWidth");
    const [width, setWidth] = useState(0);

    const setFromEvent = e => {
        setWidth(node.getBoundingClientRect().width);

    };
    useEffect(
        () => {
            if (node) {
                setWidth(node.getBoundingClientRect().width);

                console.log("adding listner");
                window.addEventListener("resize", setFromEvent);
                return () => {
                    console.log("removing listner");
                    window.removeEventListener("resize", setFromEvent);
                }
            }
        },
        [node]
    );

    return width;
};

const Clock = (props) => {

    const [node, ref] = useNodeRef();
    const width = useElementWidth(node);

    const hourSizeFactor = 3.2;
    const secSizeFactor = 11;

    const TimeDiv = styled.div`
        display: inline-flex;
         justify-content: center;
           align-items: baseline; 
    `;

    return (

        <div ref={ref}>
            <TimeDiv>
                <div style={{fontSize: (width / hourSizeFactor)}}>
                    <div>{props.hour}:{props.min}</div>
                </div>

                <div style={{fontSize: (width / secSizeFactor)}}>:{props.sec} {props.ampm}</div>
            </TimeDiv>
        </div>
    );
};

export default Clock;
