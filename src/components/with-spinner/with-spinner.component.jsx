import React from 'react';

import {SpinnerContainer , SpinnerOverlay} from './with-spinner.styles.scss';

const WithSpinner = WrappedComponent => {
    
    const spinner = ({isLoading, ...otherProps}) => {
    return isLoading ? (
        <SpinnerOverlay>
            <SpinnerContainer></SpinnerContainer>
        </SpinnerOverlay>
    ) : (
        <WrappedComponent {...otherProps}/>

    )

}
return spinner;
}

export default WithSpinner;