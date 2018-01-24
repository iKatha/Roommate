import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions/Payment';
import { getIsPaymentListFetching } from '../../reducers/fetching';
import { getPaymentList, getPaymentForm, getVisiblePaymentNumber, getValidationError } from '../../reducers/Home/payment';
import PaymentList from '../../components/Home/PaymentList';

class Payment extends Component {
    componentDidMount() {
        const { fetchPaymentList } = this.props;
        fetchPaymentList();
    }

    render() {
        const { isPaymentListFetching, paymentList, paymentForm, filterList, visiblePaymentNumber, showMore, addPayment, onCostInputBlur, onReasonInputBlur, validationError } = this.props;
        if (isPaymentListFetching && !paymentList.length) {
            return (
                <div className="payment payment__loader">
                    Loading
                <div className="first-dot"></div>
                    <div className="second-dot"></div>
                    <div className="third-dot"></div>
                </div>
            );
        }
        return (
            <div className="payment">
                <label className="payment__label">Koszt</label>
                <input className="payment__input" onBlur={e => onCostInputBlur(e.target)}></input>
                <label className="payment__label">Opis</label>
                <input className="payment__input" onBlur={e => onReasonInputBlur(e.target)}></input>

                {validationError || !paymentForm.TotalCost || !paymentForm.Reason ? <button className="payment__button payment__button--add" disabled onClick={() => addPayment(paymentForm)}>Dodaj</button> : <button className="payment__button payment__button--add" onClick={() => addPayment(paymentForm)}>Dodaj</button>}

                {validationError && <div>{validationError}</div>}
                
                <PaymentList payments={paymentList} visiblePaymentNumber={visiblePaymentNumber} />

                <button className="payment__button" onClick={() => showMore()}>Pokaż więcej</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isPaymentListFetching: getIsPaymentListFetching(state),
        paymentList: getPaymentList(state),
        paymentForm: getPaymentForm(state),
        visiblePaymentNumber: getVisiblePaymentNumber(state),
        validationError: getValidationError(state)
    };
};

Payment = withRouter(connect(
    mapStateToProps,
    actions
)(Payment));

export default Payment;