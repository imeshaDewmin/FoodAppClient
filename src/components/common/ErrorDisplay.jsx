const { useEffect, useState } = require("react");

const ErrorDisplay = ({ message, OnDismiss }) => {
    useEffect(() => {
        const timer = setTimeout = (() => {
            OnDismiss();
        }, 5000)
        return () => clearTimeout(timer)
    }, [message, OnDismiss])


    if (!message) return null;

    return (
        <div className="error-display">
            <div className="error-content">
                <span className="error-message">{message}</span>
                <div className="error-progress"></div>
            </div>
        </div>
    )

}

export const UseError = () => {
    const [errorMessage, setErrorMessage] = useState(null);

    const showError = (message) => {
        setErrorMessage(message);
    }

    const dismissError = () => {
        setErrorMessage(null);
    }

    return {
        ErrorDisplay:
            <ErrorDisplay
                message={errorMessage}
                OnDismiss={dismissError}
            />
    },
        showError,
        dismissError
}

export default ErrorDisplay;

