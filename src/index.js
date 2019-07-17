import React from 'react';
import ReactDOM from 'react-dom';

import Main from './components.js';
import Engine from './engine.js';


export class App extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            engine: new Engine(),
        };
    }
    
    render () {
        return (
            <Main engine={this.state.engine} />
        );
    }
}


ReactDOM.render(
    <App />,
    document.getElementById('app')
);
