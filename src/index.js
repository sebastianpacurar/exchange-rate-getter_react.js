import React, {Fragment, useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Interval from "./components/interval";
import StartDate from "./components/startDate";
import EndDate from "./components/endDate";
import SelectFirstCurrency from "./components/selectFirstCurrency";
import SelectOptionalCurrency from "./components/selectOptionalCurrency";
import ErrorDateMessage from "./components/errorMessage";


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

            {(new Date(startDate) > new Date(endDate) || new Date(startDate) < new Date('2015-01-01')) && checked

                ?
                // if Start Date is bigger than End Date and interval is checked or Start Date is lower than 2015
                <ErrorDateMessage
                    value={"Start Date cannot be bigger than End Date and Start Date cannot be lower than 2015-01-01. Please pick a valid date interval"}
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


ReactDOM.render(
    <App/>,
    document.getElementById('root'),
);
