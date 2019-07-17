import React from 'react';


export default class extends React.Component {
    handleClick (e) {
        e.preventDefault();
        this.props.engine.trigger();
    }

    render () {
        return (
            <div className={'content'} >
                <p>{"Five Voices"}</p>
                <p><iframe width="560" height="315" src="https://www.youtube.com/embed/nRBCFsU_KDc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></p>
                <p><button onClick={(e) => this.handleClick(e)} >
                    {"Hit me"}
                </button></p>
            </div>
        );
    }
}
