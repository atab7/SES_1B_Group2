import React from 'react';
import { usePromiseTracker } from "react-promise-tracker";

const LoadingIndicator = (props) => {
    const { promiseInProgress } = usePromiseTracker();
    console.log("Loading Indicator here!");
    return (
        promiseInProgress &&
        <h1> Something is fetching... </h1>
    )
}

export default LoadingIndicator;