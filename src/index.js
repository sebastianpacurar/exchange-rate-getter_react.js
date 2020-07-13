import React, {Fragment, StrictMode, useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';


// components related
import Interval from './components/Interval';
import DateInput from './components/DateInput';
import SelectCurrency from './components/SelectCurrency';
import CurrencyTable from './components/CurrencyTable'
import ErrorDateMessage from './components/ErrorMessage';


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
        main: 'AUD',
        optional: 'false',
    });

    // the state used for grabbing the API data
    const [data, setData] = useState([]);


    // handle the input start date value dynamically
    const handleDateChange = e => {
        const inputType = e.target.name

        setDate({
            ...date, [inputType]: e.target.value
        })
    }

    const handleSelectChange = e => {
        const type = e.target.name;

        setSelectedCurrency({
            ...selectedCurrency, [type]: e.target.value
        });
    }

    // handle the Interval checkbox for multiple dates
    const handleIntervalCheck = e => setChecked(e.target.checked);


    // fetch data from the API whenever the selects or date or checked states are changed
    useEffect(() => {

        // fetch data from the API for the given details
        const fetchData = async () => {

            let url = `https://api.exchangeratesapi.io/latest?base=${selectedCurrency.main}`;
            const result = [];

            if (!checked) {

                if (selectedCurrency.optional !== 'false') url = `https://api.exchangeratesapi.io/latest?symbols=${selectedCurrency.optional}&base=${selectedCurrency.main}`

                const response = await fetch(url);
                const jsonData = await response.json();
                const currencies = jsonData.rates;

                for (let curr in currencies) {

                    // parse the data into an array of object elements
                    if (currencies.hasOwnProperty(curr)) {
                        result.push({'currency': curr, 'value': currencies[curr], 'date': currentDate});
                    }
                }

            } else {

                // in case there only the main option is selected, bring the results for all currencies in the values of the selected main currency
                url = `https://api.exchangeratesapi.io/history?start_at=${date.start}&end_at=${date.end}&base=${selectedCurrency.main}`;

                // if start date is equal to current date, start will be equal to yesterday
                if (date.start === currentDate) {
                    const minDate = new Date();
                    minDate.setDate(minDate.getDate() - 1)
                    const yesterday = minDate.toISOString().split('T')[0];

                    url = `https://api.exchangeratesapi.io/history?start_at=${yesterday}&end_at=${date.end}&base=${selectedCurrency.main}`

                    // if optional currency is checked add symbol
                    if (selectedCurrency.optional !== 'false') {
                        url = `https://api.exchangeratesapi.io/history?start_at=${yesterday}&end_at=${date.end}&symbols=${selectedCurrency.optional}&base=${selectedCurrency.main}`
                    }
                }

                // if start day is not equal to current date
                else {
                    url = `https://api.exchangeratesapi.io/history?start_at=${date.start}&end_at=${date.end}&symbols=${selectedCurrency.optional}&base=${selectedCurrency.main}`

                    // if optional currency is set to None, remove symbols
                    if (selectedCurrency.optional === 'false') {
                        url = `https://api.exchangeratesapi.io/history?start_at=${date.start}&end_at=${date.end}&base=${selectedCurrency.main}`
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
                                result.push({'currency': curr, 'value': items[dateVal][curr], 'date': dateVal});
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
            return result;
        };

        fetchData()
            .then(res => setData(res))
            .catch(err => console.log(err));

    }, [selectedCurrency, date, checked, currentDate]);


    return (
        <Fragment>
            <StrictMode>
                <DateInput
                    maxDate={currentDate}
                    handleOnChange={e => handleDateChange(e)}
                />

                <Interval
                    isChecked={checked}
                    handleOnChange={e => handleIntervalCheck(e)}
                />

                {/*in order to set the state of the Select, it will be performed using onChange and the target is the e.target.value*/}
                <SelectCurrency handleOnChange={e => handleSelectChange(e)}/>

                {(new Date(date.start) > new Date(date.end) || new Date(date.start) < new Date('2015-01-01')) && checked

                    ?
                    // if Start Date is bigger than End Date and interval is checked or Start Date is lower than 2015, render Error Message
                    <ErrorDateMessage
                        value={"Start Date cannot be bigger than End Date and Start Date cannot be lower than 2015-01-01. Please pick a valid date interval"}
                    />


                    :
                    // if Start Date is smaller than End Date and interval is not checked, render table
                    <CurrencyTable currencies={data} mainCurrency={selectedCurrency.main}/>

                }
            </StrictMode>
        </Fragment>
    );
}


ReactDOM.render(
    <App/>,
    document.getElementById('root'),
);
