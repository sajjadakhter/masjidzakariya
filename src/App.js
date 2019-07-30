import React, {useEffect, useState} from 'react';

import './app.css';


const App = () => {

    if (window.innerWidth >= 1920) {
        return require("./components/dashboard-1920").default();
    } else if (window.innerWidth >= 1080) {
        return require("./components/dashboard-1080").default();
    } else if (window.innerWidth >= 320) {
        return require("./components/dashboard-400").default();
    }

    return (
        <h1>
            Current screen width {window.innerWidth} is not currently supported
            Only supported devices with at least more than 320 width.
        </h1>
    );
};

export default App;
