import React, {useEffect, useState} from 'react';

import './app.css';


const App = () => {

    if (window.innerWidth >= 1920) {
        return require("./components/dashboard-1920").default();
    } else if (window.innerWidth >= 1080) {
        return require("./components/dashboard-1080").default();
    }

    return (
        <h1>
            Current screen width {window.innerWidth} is not currently supported
            Only supported with are 1920 and 1080
        </h1>
    );
};

export default App;
