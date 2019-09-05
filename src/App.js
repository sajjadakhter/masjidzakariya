import React, {useEffect} from 'react';

import './app.css';
import {useQueryParams, StringParam} from "use-query-params";


const App = () => {
    const [query, setQuery] = useQueryParams({dir: StringParam});
    useEffect(() => {
        console.log('screen size', window.innerWidth)
    }, [])
    console.log({dir: query.dir});
    if (query.dir === 'v') {
        return require("./components/dashboard-1080").default();
    }
    // if (window.innerWidth >= 1920) {
    return require("./components/dashboard-1920").default();
    //}
    // else if (window.innerWidth >= 1080) {
    //     return require("./components/dashboard-1080").default();
    // } else if (window.innerWidth >= 320) {
    //     return require("./components/dashboard-400").default();
    // }

    return (
        <h1>
            Current screen width {window.innerWidth} is not currently supported
            Only supported devices with at least more than 320 width.
        </h1>
    );
};

export default App;
