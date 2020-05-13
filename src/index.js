import React, {Fragment, useState} from 'react';
import Select from 'react-select';
import ReactDOM from 'react-dom';
import './index.css';


const Interval = () => {
    return (
        <div>
            <input type='checkbox' id='interval' name='interval' style={{margin: '10px 0 10px 0'}}/>
            <label htmlFor='interval' style={{margin: '10px 0 10px 0'}}> Interval</label>
        </div>
    );
}


const StartInput = ({maxDate, performOnChange}) => {

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


const StopInput = ({maxDate, performOnChange}) => {

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


const DisplayButton = ({performOnClick}) => {

    return <button onClick={performOnClick} className='form'>Display results</button>
}


// the Select component used for creating the Select option functionality
const SelectCurrency = ({performOnChange}) => {

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

    return (
        <Select options={options} placeholder='EUR' onChange={performOnChange}/>
    );

}

const App = () => {

    // the date state is used to lock the possibility of choosing a day from the future. max day is current day
    const [date] = useState(new Date().toISOString().split("T")[0]);


    // the input and output states refer to the input of type date used to grab currency in different time spans
    const [inputVal, setInputVal] = useState(date);
    const [outputVal, setOutputVal] = useState(date);

    // TODO: need to implement
    const [checked, setChecked] = useState(false);


    // the state used to grab information from the SelectCurrency component
    const [selected, setSelected] = useState('EUR');


    // the states used for grabbing the API data
    const [data, setData] = useState({});


    // handle the input start date value
    const handleInputChange = (e) => setInputVal(e);


    // handle the input end date value
    const handleOutputChange = (e) => setOutputVal(e);

    // handle the Select option
    const handleOptionChange = (option) => setSelected(option);


    // fetch the API for the given details
    const handleClick = async () => {

        let url = `https://api.exchangeratesapi.io/latest?base=${selected}`;

        if (!checked) {

            const response = await fetch(url);
            const jsonData = await response.json();
            setData(jsonData.rates);
        }
    };

    return (
        <div>
            <StartInput maxDate={date} performOnChange={(e) => handleInputChange(e.target.value)}/>
            <StopInput maxDate={date} performOnChange={(e) => handleOutputChange(e.target.value)}/>
            <Interval/>

            {/*in order to set the state of the Select, it will be performed using onChange and the target is the option.value*/}
            <SelectCurrency performOnChange={(option) => handleOptionChange(option.value)}/>
            <DisplayButton performOnClick={handleClick}/>

            <Fragment>
                <thead>
                <tr>
                    <th>Currency</th>
                    <th>Value in {selected}</th>
                </tr>
                </thead>

                {/*map the json into an array composed of arrays (every array contains first element as key and second as value*/}
                {Object.entries(data).map(([key, value], index) =>
                    <tr key={index}>
                        <td>{key}</td>
                        <td>{value}</td>
                    </tr>)}
            </Fragment>
        </div>
    );
}


ReactDOM.render(
    <App/>,
    document.getElementById('root'),
);
