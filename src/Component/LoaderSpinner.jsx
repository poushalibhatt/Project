import React from 'react';
import Loader from 'react-loader-spinner';

function LoaderSpinner(){
    return (
        <Loader
        type="ThreeDots"
        color="brown"
        height={80}
        width={80}
        timeout={3000} //3 secs

     />
    )
}

export default LoaderSpinner