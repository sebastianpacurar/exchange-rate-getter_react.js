import React, {Fragment, useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';


const Interval = ({performOnChange, isChecked}) => {
    return (
        <div>
            <input
                type='checkbox'
                id='interval'
                name='interval'
                checked={isChecked}
                onChange={performOnChange}
            />
            <label htmlFor='interval'> Interval</label>
        </div>
    );
}


const StartDate = ({maxDate, performOnChange}) => {
    return (
        <div>
            <label htmlFor='Start Date' className='form'>Start Date: </label>
            <input
                type='date'
                className='form'
                max={maxDate}
                onChange={performOnChange}
            />
        </div>
    );
}


const EndDate = ({maxDate, performOnChange}) => {
    return (
        <div>
            <label htmlFor='End Date' className='form'>End Date: </label>
            <input
                type='date'
                className='form'
                max={maxDate}
                onChange={performOnChange}
            />
        </div>
    );
}


// The Currency From which will be converted
const SelectFirstCurrency = ({performOnChange}) => {
    return (
        <div><label className={"form"} htmlFor="from-currency">From currency: </label>
            <select onChange={performOnChange}>

                {/*use slice to make the array start from 1, meaning that the first currency dropdown cannot be of label "None"*/}
                {options.slice(1).map((item, index) => (
                    <option key={index} value={item.value}>{item.label}</option>
                ))}
            </select>
        </div>
    );
}

// The currency to which will be converted
const SelectOptionalCurrency = ({performOnChange}) => {

    return (
        <div><label className={"form"} htmlFor={"to-currency"}>To currency: </label>
            <select onChange={performOnChange}>
                {options.map((item, index) => (
                    <option key={index} value={item.value}>{item.label}</option>
                ))}
            </select>
        </div>
    );
}

// the error displayed in case the start date is bigger than the end date
const ErrorDateMessage = ({value}) => {

    return <p>{value}</p>
}


const App = () => {

    // the date state is used to lock the possibility of choosing a day from the future. max day is current day
    const [currentDate] = useState(new Date().toISOString().split("T")[0]);

    // the input and output states refer to the input of type date used to grab currency in different time spans. defaults to current date
    const [startDate, setStartDate] = useState(currentDate);
    const [endDate, setEndDate] = useState(currentDate);

    // used for querying rates from different dates (historical data) mentioned in the max and min input
    const [checked, setChecked] = useState(false);

    // the state used to grab information from the SelectFirstCurrency component
    const [selectedMain, setSelectedMain] = useState('AUD');

    // the state used to grab information from the SelectSecondCurrency component
    // need to use string here instead of boolean because the option changed to None label (false value) will return a 'false' string instead of a boolean
    // therefore to check this value, i used the JSON.parse() method which converts the string 'false' to boolean string
    const [selectedOptional, setSelectedOptional] = useState('false');

    // the state used for grabbing the API data
    const [data, setData] = useState([]);

    // handle the input start date value
    const handleStartDateChange = e => setStartDate(e.target.value);

    // handle the input end date value
    const handleEndDateChange = e => setEndDate(e.target.value);

    // handle the Main Select option
    const handleMainSelectChange = e => setSelectedMain(e.target.value);

    // handle the Main Select option
    const handleOptionalSelectChange = e => setSelectedOptional(e.target.value);

    // handle the Interval checkbox for multiple dates
    const handleIntervalCheck = e => setChecked(e.target.checked);


    // fetch data from the API whenever the selects or startDate or endDate or checked states are changed
    useEffect(() => {

        // fetch data from the API for the given details
        const fetchData = async () => {

            let url = `https://api.exchangeratesapi.io/latest?base=${selectedMain}`;
            const result = [];

            if (!checked) {

                if (selectedOptional !== 'false') url = `https://api.exchangeratesapi.io/latest?symbols=${selectedOptional}&base=${selectedMain}`

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
                url = `https://api.exchangeratesapi.io/history?start_at=${startDate}&end_at=${endDate}&base=${selectedMain}`;

                // if start date is equal to current date, startDate will be equal to yesterday
                if (startDate === currentDate) {
                    const minDate = new Date();
                    minDate.setDate(minDate.getDate() - 1)
                    const yesterday = minDate.toISOString().split('T')[0];

                    url = `https://api.exchangeratesapi.io/history?start_at=${yesterday}&end_at=${endDate}&base=${selectedMain}`

                    // if selectedOptional currency is checked add symbol
                    if (selectedOptional !== 'false') {
                        url = `https://api.exchangeratesapi.io/history?start_at=${yesterday}&end_at=${endDate}&symbols=${selectedOptional}&base=${selectedMain}`
                    }
                }

                // if start day is not equal to current date
                else {
                    url = `https://api.exchangeratesapi.io/history?start_at=${startDate}&end_at=${endDate}&symbols=${selectedOptional}&base=${selectedMain}`

                    // if selectedOptional currency is set to None, remove symbols
                    if (selectedOptional === 'false') {
                        url = `https://api.exchangeratesapi.io/history?start_at=${startDate}&end_at=${endDate}&base=${selectedMain}`
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

    }, [selectedMain, selectedOptional, startDate, endDate, checked, currentDate]);


    // to highlight error if start Date is bigger than end Date


    return (
        <Fragment>
            <StartDate
                maxDate={currentDate}
                performOnChange={(e) => handleStartDateChange(e)}
            />
            <EndDate
                maxDate={currentDate}
                performOnChange={(e) => handleEndDateChange(e)}
            />
            <Interval
                isChecked={checked}
                performOnChange={(e) => handleIntervalCheck(e)}
            />

            {/*in order to set the state of the Select, it will be performed using onChange and the target is the e.target.value*/}
            <SelectFirstCurrency performOnChange={(e) => handleMainSelectChange(e)}/>
            <SelectOptionalCurrency performOnChange={(e) => handleOptionalSelectChange(e)}/>

            {new Date(startDate) > new Date(endDate) && checked

                ?
                // if Start Date is bigger than End Date and interval is checked
                <ErrorDateMessage
                    value={"Start Date cannot be bigger than End Date. Please pick a valid date interval"}
                />


                :
                // if Start Date is smaller than End Date and interval is not checked
                <table>

                    <thead>
                    <tr>
                        <th>Currency Code</th>
                        <th>1 {selectedMain} equals to</th>
                        <th>Date</th>
                    </tr>
                    </thead>
                    <tbody>

                    {/*the data displayed will be in this order: currency, value, date*/}
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{Object.values(item)[0]}</td>
                            <td>{Object.values(item)[1]}</td>
                            <td>{Object.values(item)[2]}</td>
                        </tr>)
                    )}
                    </tbody>

                </table>
            }
        </Fragment>
    );
}


// options are composed of 2 properties: values and labels
const options = [
    {value: false, label: 'None'},
    {value: 'AUD', label: 'Australian Dollar'},
    {value: 'BGN', label: 'Bulgarian Lev'},
    {value: 'BRL', label: 'Brazilian Real'},
    {value: 'CAD', label: 'Canadian Dollar'},
    {value: 'CNY', label: 'Chinese Yuan'},
    {value: 'HRK', label: 'Croatian Kuna'},
    {value: 'CZK', label: 'Czech Koruna'},
    {value: 'DKK', label: 'Danish Krone'},
    {value: 'EUR', label: 'Euro'},
    {value: 'GBP', label: 'Great Britain Pound Sterling'},
    {value: 'HKD', label: 'Hong Kong Dollar'},
    {value: 'HUF', label: 'Hungarian Forint'},
    {value: 'INR', label: 'Indian Rupee'},
    {value: 'IDR', label: 'Indonesian Rupiah'},
    {value: 'ILS', label: 'Israeli New Shekel'},
    {value: 'JPY', label: 'Japanese Yen'},
    {value: 'MYR', label: 'Malaysian Ringgit'},
    {value: 'MXN', label: 'Mexican Peso'},
    {value: 'NZD', label: 'New Zealand Dollar'},
    {value: 'NOK', label: 'Norwegian Krone'},
    {value: 'PSP', label: 'Philippine Peso'},
    {value: 'PLN', label: 'Poland Zloty'},
    {value: 'RON', label: 'Romanian Leu'},
    {value: 'RUB', label: 'Russian Ruble'},
    {value: 'SGD', label: 'Singapore Dollar'},
    {value: 'ZAR', label: 'South African Rand'},
    {value: 'KRW', label: 'South Korean Won'},
    {value: 'SEK', label: 'Swedish Krona'},
    {value: 'CHF', label: 'Swiss Franc'},
    {value: 'THB', label: 'Thai Baht'},
    {value: 'TRY', label: 'Turkish lira'},
    {value: 'USD', label: 'United States Dollar'},
]


ReactDOM.render(
    <App/>,
    document.getElementById('root'),
);
