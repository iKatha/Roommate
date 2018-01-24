import React from "react";

const PaymentList = ({ visiblePaymentNumber, payments }) => {

    return (
        <div className="payment__table-cover">
            <table>
                <thead>
                    <tr>
                        <th>Kto płacił</th>
                        <th>Data</th>
                        <th>Koszt</th>
                        <th>Koszt na osobę</th>
                        <th>Opis</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        payments.slice(0, visiblePaymentNumber).map(p =>
                            <tr key={p.Id}>
                                <td>{p.User.FirstName} {p.User.LastName}</td>
                                <td>{p.ShownDate}</td>
                                <td>{p.TotalCost}</td>
                                <td>{p.IndividualCharge}</td>
                                <td>{p.Reason}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}

export default PaymentList;