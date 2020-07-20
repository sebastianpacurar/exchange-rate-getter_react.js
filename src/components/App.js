import React, {Fragment, useState, useEffect} from 'react';
import {options} from '../utils/selectOptions';
import '../index.css';


// components related
import Interval from './Interval';
import DateInput from './DateInput';
import SelectCurrency from './SelectCurrency';
import CurrencyTable from './CurrencyTable'
import ErrorDateMessage from './ErrorMessage';
import Header from './Header';


const App = () => {

    // the date state is used to lock the possibility of choosing a day from the future. max day is current day
    const [currentDate] = useState(new Date().toISOString().split("T")[0]);

    // the date state for the start and end intervals
    const [date, setDate] = useState({
        start: currentDate,
        end: currentDate
    });

    // used for querying rates from different dates (historical data). if checked is true then historical data will be queried
    const [checked, setChecked] = useState(false);

    // the state used to grab information from the SelectCurrency component
    const [selectedCurrency, setSelectedCurrency] = useState({
        main: {
            value: 'AUD',
            label: 'Australian Dollar'
        },
        optional: {
            value: 'false',
            label: 'None'
        }
    });

    // the state used for grabbing the API data
    const [data, setData] = useState([]);


    // handle the input start date value dynamically
    const handleDateChange = e => {

        setDate({
            ...date, [e.target.name]: e.target.value
        })
    }

    const handleSelectChange = e => {

        setSelectedCurrency({
            ...selectedCurrency, [e.target.name]: {
                value: e.target.value,
                label: e.target.selectedOptions[0].label
            }
        });
    }

    // handle the Interval checkbox for multiple dates
    const handleIntervalCheck = e => setChecked(e.target.checked);

    // handle the switch currencies change
    const handleSwitchChange = () => {

        const main = selectedCurrency.main
        const optional = selectedCurrency.optional

        setSelectedCurrency({
            main: {
                value: optional.value,
                label: optional.label,
            },
            optional: {
                value: main.value,
                label: main.label
            }
        });
    }

    // fetch data from the API whenever the selects or date or checked states are changed
    useEffect(() => {

        // fetch data from the API for the given details
        const fetchData = async () => {

            let url = `https://api.exchangeratesapi.io/latest?base=${selectedCurrency.main.value}`;
            const result = [];

            if (!checked) {

                if (selectedCurrency.optional.value !== 'false') url = `https://api.exchangeratesapi.io/latest?symbols=${selectedCurrency.optional.value}&base=${selectedCurrency.main.value}`

                const response = await fetch(url);
                const jsonData = await response.json();
                const currencies = jsonData.rates;

                for (let curr in currencies) {

                    // parse the data into an array of object elements
                    if (currencies.hasOwnProperty(curr)) {
                        result.push({'currSymbol': curr, 'value': currencies[curr], 'date': currentDate});
                    }
                }

            } else {

                // in case there only the main option is selected, bring the results for all currencies in the values of the selected main currency
                url = `https://api.exchangeratesapi.io/history?start_at=${date.start}&end_at=${date.end}&base=${selectedCurrency.main.value}`;

                // if start date is equal to current date, start will be equal to yesterday
                if (date.start === currentDate) {
                    const minDate = new Date();
                    minDate.setDate(minDate.getDate() - 1)
                    const yesterday = minDate.toISOString().split('T')[0];

                    url = `https://api.exchangeratesapi.io/history?start_at=${yesterday}&end_at=${date.end}&base=${selectedCurrency.main.value}`

                    // if optional currency is checked add symbol
                    if (selectedCurrency.optional.value !== 'false') {
                        url = `https://api.exchangeratesapi.io/history?start_at=${yesterday}&end_at=${date.end}&symbols=${selectedCurrency.optional.value}&base=${selectedCurrency.main.value}`
                    }
                }

                // if start day is not equal to current date
                else {
                    url = `https://api.exchangeratesapi.io/history?start_at=${date.start}&end_at=${date.end}&symbols=${selectedCurrency.optional.value}&base=${selectedCurrency.main.value}`

                    // if optional currency is set to None, remove symbols
                    if (selectedCurrency.optional.value === 'false') {
                        url = `https://api.exchangeratesapi.io/history?start_at=${date.start}&end_at=${date.end}&base=${selectedCurrency.main.value}`
                    }
                }

                const response = await fetch(url);
                const jsonData = await response.json();

                const items = jsonData.rates;

                // parse the data into an array of object elements which will also contain the date property for every single currency property
                for (let dateVal in items) {

                    if (items.hasOwnProperty(dateVal)) {
                        for (let curr in items[dateVal]) {

                            if (items[dateVal].hasOwnProperty(curr)) {
                                result.push({'currSymbol': curr, 'value': items[dateVal][curr], 'date': dateVal});
                            }
                        }
                    }
                }

                // sort the array from earliest day to latest day
                result.sort((a, b) => {
                    const firstDate = new Date(a.date),
                        secondDate = new Date(b.date);

                    return firstDate - secondDate;
                });
            }

            // add the formatted currency name as a property for every object
            for (let item of options) {
                for (let i = 0; i < result.length; i++) {
                    if (item.value === result[i].currSymbol) {
                        const trimmed = item.label.split(' ');
                        trimmed.pop();
                        result[i]['currName'] = trimmed.join(' ');
                    }
                }
            }

            return result;
        };

        fetchData()
            .then(res => setData(res))
            .catch(err => console.log(err));

    }, [selectedCurrency, date, checked, currentDate]);


    return (
        <Fragment>

            <Header/>

            <div className='container'>
                <DateInput
                    maxDate={currentDate}
                    handleOnChange={handleDateChange}
                />

                <Interval
                    isChecked={checked}
                    handleOnChange={handleIntervalCheck}
                />

                {/*in order to set the state of the Select, it will be performed using onChange and the target is the e.target.value*/}
                <SelectCurrency
                    handleCurrencyOnChange={handleSelectChange}
                    isDisabled={selectedCurrency.optional.value === 'false'}
                    handleSwitchCurrencies={handleSwitchChange}
                />
            </div>

            {new Date(date.start) > new Date(date.end) && checked

                ?
                // if Start Date is bigger than End Date and interval is checked, render Error Message
                <ErrorDateMessage
                    value={"Start Date cannot be bigger than End Date, please pick a valid date interval"}
                />


                :
                // if Start Date is smaller than End Date and interval is not checked, render table
                <CurrencyTable currencies={data} mainCurrency={selectedCurrency.main}/>

            }

            {/*scroll to top button*/}
            <button id={'scroll-to-top'} onClick={() => window.scroll({top: 0, behavior: 'smooth'})}>
                Top
            </button>

        </Fragment>
    );
}

export default App;