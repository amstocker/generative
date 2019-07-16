import React from 'react';


export default class extends React.Component {
    handleClick (e) {
        e.preventDefault();
        this.props.engine.trigger();
    }

    render () {
        return (
            <div className={'content'} >
                <button onClick={(e) => this.handleClick(e)} >
                    {"Hit me"}
                </button>
            </div>
        );
    }
}
