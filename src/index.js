import React, {Fragment, useState, useEffect} from 'react';
import Select from 'react-select';
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


const MaxDateInput = ({maxDate, defaultValue, performOnChange}) => {
    return (
        <div>
            <label htmlFor='Start Date' className='form'>Start Date: </label>
            <input
                type='date'
                className='form'
                value={defaultValue}
                max={maxDate}
                onChange={performOnChange}/>
        </div>
    );
}


const MinDateInput = ({maxDate, defaultValue, performOnChange}) => {
    return (
        <div>
            <label htmlFor='End Date' className='form'>End Date: </label>
            <input
                type='date'
                className='form'
                value={defaultValue}
                max={maxDate}
                onChange={performOnChange}
            />
        </div>
    );
}


// The Currency From which will be converted
const SelectFirstCurrency = ({performOnChange}) => {
    return (
        <div> <label className={"form"} htmlFor="from-currency">From currency: </label>
            <Select options={options} placeholder='EUR' onChange={performOnChange}/>
        </div>
    );
}

// The currency to which will be converted
const SelectOptionalCurrency = ({performOnChange}) => {

    return (
        <div> <label className={"form"} htmlFor={"to-currency"}>To currency: </label>
            <Select options={options} placeholder='None' onChange={performOnChange}/>
        </div>
    );
}


const App = () => {

    // the date state is used to lock the possibility of choosing a day from the future. max day is current day
    const [currentDate] = useState(new Date().toISOString().split("T")[0]);

    // the input and output states refer to the input of type date used to grab currency in different time spans. defaults to current date
    const [minInputVal, setMinInputVal] = useState(currentDate);
    const [maxOutputVal, setMaxOutputVal] = useState(currentDate);

    // used for querying rates from different dates (historical data) mentioned in the max and min input
    const [checked, setChecked] = useState(false);

    // the state used to grab information from the SelectFirstCurrency component
    const [selectedMain, setSelectedMain] = useState('EUR');

    // the state used to grab information from the SelectSecondCurrency component
    const [selectedOptional, setSelectedOptional] = useState(false);

    // the state used for grabbing the API data
    const [data, setData] = useState([]);

    // handle the input start date value
    const handleInputChange = e => setMinInputVal(e.target.value);

    // handle the input end date value
    const handleOutputChange = e => setMaxOutputVal(e.target.value);

    // handle the Main Select option
    const handleMainSelectChange = option => setSelectedMain(option.value);

    // handle the Main Select option
    const handleOptionalSelectChange = option => setSelectedOptional(option.value);

    // handle the Interval checkbox for multiple dates
    const handleIntervalCheck = (e) => setChecked(e.target.checked);


    // fetch data from the API whenever the selects or minInputVal or maxOutputVal or checked states are changed
    useEffect(() => {

        // fetch data from the API for the given details
        const fetchData = async () => {

            let url = `https://api.exchangeratesapi.io/latest?base=${selectedMain}`;
            const result = [];


            if (!checked) {

                if (selectedOptional) url = `https://api.exchangeratesapi.io/latest?symbols=${selectedOptional}&base=${selectedMain}`

                const response = await fetch(url);
                const jsonData = await response.json();
                const currencies = jsonData.rates;

                for (let curr in currencies) {

                    // parse the data into an array of object elements
                    if (currencies.hasOwnProperty(curr)) {
                        result.push({'currency': curr, 'value': currencies[curr], 'date': currentDate});
                    }
                }

            }

            else {

                // in case there only the main option is selected, bring the results for all currencies in the values of the selected main currency
                url = `https://api.exchangeratesapi.io/history?start_at=${minInputVal}&end_at=${maxOutputVal}&base=${selectedMain}`;

                if (selectedOptional) url = `https://api.exchangeratesapi.io/history?start_at=${minInputVal}&end_at=${maxOutputVal}&symbols=${selectedOptional}&base=${selectedMain}`

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

    }, [selectedMain, selectedOptional, minInputVal, maxOutputVal, checked]);


    return (
        <Fragment>
            <MaxDateInput
                defaultValue={currentDate}
                maxDate={currentDate}
                performOnChange={(e) => handleInputChange(e)}
            />
            <MinDateInput
                defaultValue={currentDate}
                maxDate={currentDate}
                performOnChange={(e) => handleOutputChange(e)}
            />
            <Interval
                isChecked={checked}
                performOnChange={(e) => handleIntervalCheck(e)}
            />

            {/*in order to set the state of the Select, it will be performed using onChange and the target is the option.value*/}
            <SelectFirstCurrency performOnChange={(option) => handleMainSelectChange(option)}/>
            <SelectOptionalCurrency performOnChange={(option) => handleOptionalSelectChange(option)}/>

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
