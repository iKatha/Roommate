import React from 'react';

class ServerError extends React.Component {

    render() {
        
        return (
            <div className="error">
                Ups.. Coś poszło nie tak :(
                <button className="error__button" onClick= {this.props.changeErrorState}> Powrót </button>
            </div>

        );
        
    }
}

export default ServerError;