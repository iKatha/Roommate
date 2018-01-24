import React from 'react';
import { connect } from 'react-redux';
import MainContent from '../../components/Core/MainContent';
import ServerError from './ServerError';
//import { changeErrorState } from '../../actions/Error';
import { getIsError } from '../../reducers/Error';
import { withRouter } from 'react-router-dom';

class Main extends React.Component {
    render() {
        const { isError, changeErrorState } = this.props;
        if (isError) {
            return <ServerError changeErrorState={changeErrorState} />;
            console.log('error');
        } else {
            return <MainContent />;
        }
    }
}

const mapStateToProps = (state) => {
    return {
        isError: getIsError(state)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeErrorState : () => dispatch({
            type: 'CHANGE_ERROR_STATE'
        })
    };
};

Main = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Main));

export default Main;