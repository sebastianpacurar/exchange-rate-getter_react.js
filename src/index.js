import React, {Fragment, useState, useEffect} from 'react';
import Select from 'react-select';
import ReactDOM from 'react-dom';
import './index.css';


// TODO: need to fix this
const Interval = ({handleCheckBox, checkStatus}) => {
    return (
        <div>
            <input
                type='checkbox'
                id='interval'
                name='interval'
                checked={handleCheckBox}
                style={{margin: '10px 0 10px 0'}}
            />
            <label htmlFor='interval' style={{margin: '10px 0 10px 0'}}> Interval</label>
        </div>
    );
}


const MaxDateInput = ({maxDate, performOnChange}) => {

    return (
        <div>
            <label htmlFor='Start Date' className='form'>Start Date: </label>
            <input
                type='date'
                className='form'
                max={maxDate}
                onChange={performOnChange}/>
        </div>
    );
}


const MinDateInput = ({maxDate, performOnChange}) => {

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


// the Select component used for creating the Select option functionality
const SelectCurrency = ({performOnChange}) => {

    return (
        <Select options={options} placeholder='EUR' onChange={performOnChange}/>
    );

}

const App = () => {

    // the date state is used to lock the possibility of choosing a day from the future. max day is current day
    const [date] = useState(new Date().toISOString().split("T")[0]);


    // the input and output states refer to the input of type date used to grab currency in different time spans. defaults to current date
    const [minInputVal, setMinInputVal] = useState(date);
    const [maxOutputVal, setMaxOutputVal] = useState(date);

    // used for querying rates from other dates mentioned in the max and min input
    const [checked, setChecked] = useState(false);

    // the state used to grab information from the SelectCurrency component
    const [selected, setSelected] = useState('EUR');

    // the states used for grabbing the API data
    const [data, setData] = useState([]);

    // handle the input start date value
    const handleInputChange = e => setMinInputVal(e);

    // handle the input end date value
    const handleOutputChange = e => setMaxOutputVal(e);

    // handle the Select option
    const handleOptionChange = option => setSelected(option);

    //TODO: need to fix this
    // handle the Interval checkbox for multiple dates
    const handleIntervalCheck = () => setChecked(!checked);


    // fetch data from the API for the given details
    const fetchData = async () => {

        let result = []

        // let url = `https://api.exchangeratesapi.io/latest?base=${selected}`;
        // let url = `https://api.exchangeratesapi.io/history?start_at=${minInputVal}&end_at=${maxOutputVal}&base=${selected}`;

        //Todo for test purposes
        let url = `https://api.exchangeratesapi.io/history?start_at=2018-01-01&end_at=2018-01-05&base=${selected}`;

        if (!checked) {

            const response = await fetch(url);
            const jsonData = await response.json();

            const items = jsonData.rates;

            // parse the data into an array of object elements which will also contain the date property for every single currency property
            for (let date in items) {

                if (items.hasOwnProperty(date)) {
                    for (let curr in items[date]) {

                        if (items[date].hasOwnProperty(curr)) {
                            result.push({'currency': curr, 'value': items[date][curr], 'date': date});
                        }
                    }
                }
            }

            // sort the array from lowest day to last day
            result.sort((a, b) => {
                const firstDate = new Date(a.date),
                    secondDate = new Date(b.date);

                return firstDate - secondDate;
            })


        } else {
            const response = await fetch(url);
            const jsonData = await response.json();
            const currencies = jsonData.rates;

            for (let curr in currencies) {

                // parse the data into an array of object elements
                if (currencies.hasOwnProperty(curr)) {
                    result.push({"currency": curr, "value": currencies[curr]});
                }
            }
        }
        return result;

    };

    // in case the result contains different dates for the currencies, it executes second after Layout Effect
    useEffect(() => {
        fetchData().then(res => setData(res));
    }, [selected]);


    return (
        <Fragment>
            <MaxDateInput maxDate={date} performOnChange={(e) => handleInputChange(e.target.value)}/>
            <MinDateInput maxDate={date} performOnChange={(e) => handleOutputChange(e.target.value)}/>
            <Interval
                checkStatus={checked}
                performOnChange={handleIntervalCheck}
            />

            {/*in order to set the state of the Select, it will be performed using onChange and the target is the option.value*/}
            <SelectCurrency performOnChange={(option) => handleOptionChange(option.value)}/>

            <table>

                <thead>
                <tr>
                    <th>Currency Code</th>
                    <th>Currency Value in {selected}</th>
                    <th>Date</th>
                </tr>
                </thead>

                {checked ?  // if checked is true

                    //map the json into an array composed of objects (every object contains currency, value and date)
                    data.map((item, index) =>
                        <tr key={index}>
                            <td>{Object.values(item)[0]}</td>
                            <td>{Object.values(item)[1]}</td>
                            <td>{Object.values(item)[2]}</td>
                        </tr>)


                    :   // if checked is false

                    //map the json into an array composed of objects (every object contains currency and value)
                    data.map((item, index) =>
                        <tr key={index}>
                            <td>{Object.values(item)[0]}</td>
                            <td>{Object.values(item)[1]}</td>
                            <td>{date}</td>
                        </tr>)
                }
            </table>
        </Fragment>
    );
}


// options are composed of 2 properties: values and labels
const options = [
    {value: 'AUD', label: 'Australian Dollar'},
    {value: 'BGN', label: 'Bulgarian Lev'},
    {value: 'BRL', label: 'Brazilian Real'},
    {value: 'CAD', label: 'Canadian Dollar'},
    {value: 'CNY', label: 'Chinese Yuan'},
    {value: 'HRK', label: 'Croatian Kuna'},
    {value: 'CZK', label: 'Czech Koruna'},
    {value: 'DKK', label: 'Danish Krone'},
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
