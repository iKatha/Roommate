import React from 'react';

const DetailConfiguration = ({ name, configuration, idName, onDayCheckboxChange}) => (
    <div className="configuration__detail">
        <label className="configuration__header">{name}</label>
        
        <div className="column-one">
            {configuration.days.Monday ? <input
                checked
                type="checkbox"
                id={idName + 'Monday'}
                value="Monday"
                onChange={e => onDayCheckboxChange(e.target)} /> :
                <input
                    type="checkbox"
                    id={idName + 'Monday'}
                    value="Monday"
                    onChange={e => onDayCheckboxChange(e.target)}
                />}
            <label htmlFor={idName + 'Monday'}> Poniedziałek </label>

            {configuration.days.Tuesday ? <input
                checked
                type="checkbox"
                id={idName + 'Tuesday'}
                value="Tuesday"
                onChange={e => onDayCheckboxChange(e.target)} /> :
                <input
                    type="checkbox"
                    id={idName + 'Tuesday'}
                    value="Tuesday"
                    onChange={e => onDayCheckboxChange(e.target)}
                />}
            <label htmlFor={idName + 'Tuesday'}> Wtorek </label>

            {configuration.days.Wednesday ? <input
                checked
                type="checkbox"
                id={idName + 'Wednesday'}
                value="Wednesday"
                onChange={e => onDayCheckboxChange(e.target)} /> :
                <input
                    type="checkbox"
                    id={idName + 'Wednesday'}
                    value="Wednesday"
                    onChange={e => onDayCheckboxChange(e.target)}
                />}
            <label htmlFor={idName + 'Wednesday'}> Środa </label>

            {configuration.days.Thursday ? <input
                checked
                type="checkbox"
                id={idName + 'Thursday'}
                value="Thursday"
                onChange={e => onDayCheckboxChange(e.target)} /> :
                <input
                    type="checkbox"
                    id={idName + 'Thursday'}
                    value="Thursday"
                    onChange={e => onDayCheckboxChange(e.target)}
                />}
            <label htmlFor={idName + 'Thursday'}> Czwartek </label>
        </div>
        <div className="column-two">
            {configuration.days.Friday ? <input
                checked
                type="checkbox"
                id={idName + 'Friday'}
                value="Friday"
                onChange={e => onDayCheckboxChange(e.target)} /> :
                <input
                    type="checkbox"
                    id={idName + 'Friday'}
                    value="Friday"
                    onChange={e => onDayCheckboxChange(e.target)}
                />}
            <label htmlFor={idName + 'Friday'}> Piątek </label>

            {configuration.days.Saturday ? <input
                checked
                type="checkbox"
                id={idName + 'Saturday'}
                value="Saturday"
                onChange={e => onDayCheckboxChange(e.target)} /> :
                <input
                    type="checkbox"
                    id={idName + 'Saturday'}
                    value="Saturday"
                    onChange={e => onDayCheckboxChange(e.target)}
                />}
            <label htmlFor={idName + 'Saturday'}> Sobota </label>

            {configuration.days.Sunday ? <input
                checked
                type="checkbox"
                id={idName + 'Sunday'}
                value="Sunday"
                onChange={e => onDayCheckboxChange(e.target)} /> :
                <input
                    type="checkbox"
                    id={idName + 'Sunday'}
                    value="Sunday"
                    onChange={e => onDayCheckboxChange(e.target)}
                />}
            <label htmlFor={idName + 'Sunday'}> Niedziela </label>
        </div>
    </div>
);

export default DetailConfiguration;