import React from "react";

interface ErrorBoundaryState {
    hasError: boolean
}

class ErrorBoundary extends React.Component<{}, ErrorBoundaryState> {
    constructor(props: any) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(error: any, info: any) {
        this.setState({ hasError: true });
    }

    render() {
        if (this.state.hasError) {
            return <div>There was a problem</div>
        }
        return this.props.children
    }
}

class Bomb extends React.Component<any, any> {
    render() {
        //@ts-ignore
        return this['💣'].caboom()
    }
}

class BombButton extends React.Component {
    state = { renderBomb: false }
    handleBombClick = () => this.setState({ renderBomb: true })
    render() {
        return (
            <ErrorBoundary>
                {this.state.renderBomb ? (
                    <Bomb />
                ) : (
                        <button onClick={this.handleBombClick}>
                            <span role="img" aria-label="bomb">
                                💣
                            </span>
                        </button>
                    )}
            </ErrorBoundary>
        )
    }
}

export { BombButton }

export default ErrorBoundary;