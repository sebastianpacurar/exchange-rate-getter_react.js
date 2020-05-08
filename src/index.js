import React, {Fragment, Component} from 'react';
import ReactDOM from 'react-dom';


class StartInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            input: '',
        }
    }

    render() {
        return (
            <div>
                <label htmlFor='Start Date'>Start Date: </label>
                <input type='date' placeholder='Start Date'/>
            </div>
        );
    }
}


class StopInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            input: '',
        }
    }

    render() {
        return (
            <div>
                <label htmlFor='End Date'>End Date: </label>
                <input type='date' placeholder='End Date'/>
            </div>
        );
    }
}


const App = () => {
    return (
        <Fragment>
            <StartInput/>
            <StopInput/>
        </Fragment>
    )
}


ReactDOM.render(
    <App/>,
    document.getElementById('root'),
);
