import React from 'react';

const CurrencyTable = ({currencies, mainCurrency}) => {
    return (
        <table>

            <thead>
            <tr>
                <th>Currency</th>
                <th>1 {mainCurrency.value} equals to</th>
                <th>Date</th>
            </tr>
            </thead>
            <tbody>

            {/*the data displayed will be in this order: currency, value, date*/}
            {currencies.map((item, index) => (
                <tr key={index}>
                    <td>{item.currName} {item.currSymbol}</td>
                    <td>{item.value}</td>
                    <td>{item.date}</td>
                </tr>
            ))}
            </tbody>

        </table>
    )
}

export default CurrencyTable;

