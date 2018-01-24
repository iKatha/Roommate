import React from 'react';

const GeneralConfiguration = ({ configuration, onKitchenCheckboxChange, onToiletCheckboxChange, onBathroomCheckboxChange, onSalonCheckboxChange, onHallCheckboxChange, onDishWashingCheckboxChange, onWateringPlantsCheckboxChange}) => (
    <div>
        <div className ="column-one">
            {configuration.cleaning.cleaningKitchen.isChecked ? <input
                checked
                type="checkbox"
                id="cleaningKitchen"
                value="Sprzątanie kuchni"
                onChange={() => onKitchenCheckboxChange()} /> :
                <input
                    type="checkbox"
                    id="cleaningKitchen"
                    value="Sprzątanie kuchni"
                    onChange={() => onKitchenCheckboxChange()}
                />}
            <label htmlFor="cleaningKitchen"> Sprzątanie kuchni </label>

            {configuration.cleaning.cleaningToilet.isChecked ?
                <input
                    checked
                    type="checkbox"
                    id="cleaningToilet"
                    value="Sprzątanie toalety"
                    onChange={() => onToiletCheckboxChange()}
                /> :
                <input
                    type="checkbox"
                    id="cleaningToilet"
                    value="Sprzątanie toalety"
                    onChange={() => onToiletCheckboxChange()}
                />
            }
            <label htmlFor="cleaningToilet"> Sprzątanie toalety </label>

            {configuration.cleaning.cleaningBathroom.isChecked ?
                <input
                    checked
                    type="checkbox"
                    id="cleaningBathroom"
                    value="Sprzątanie łazienki"
                    onChange={() => onBathroomCheckboxChange()}
                /> :
                <input
                    type="checkbox"
                    id="cleaningBathroom"
                    value="Sprzątanie łazienki"
                    onChange={() => onBathroomCheckboxChange()}
                />}
            <label htmlFor="cleaningBathroom"> Sprzątanie łazienki </label>

            {configuration.cleaning.cleaningHall.isChecked ?
                <input
                    checked
                    type="checkbox"
                    id="cleaningHall"
                    value="Sprzątanie przedpokoju"
                    onChange={() => onHallCheckboxChange()}
                /> :
                <input
                    type="checkbox"
                    id="cleaningHall"
                    value="Sprzątanie przedpokoju"
                    onChange={() => onHallCheckboxChange()}
                />}
            <label htmlFor="cleaningHall"> Sprzątanie przedpokoju </label>
        </div>

        <div className="column-two">
            {configuration.cleaning.cleaningSalon.isChecked ?
                <input
                    checked
                    type="checkbox"
                    id="cleaningSalon"
                    value="Sprzątanie salonu"
                    onChange={() => onSalonCheckboxChange()}
                /> :
                <input
                    type="checkbox"
                    id="cleaningSalon"
                    value="Sprzątanie salonu"
                    onChange={() => onSalonCheckboxChange()}
                />}
            <label htmlFor="cleaningSalon"> Sprzątanie salonu </label>

            {configuration.dishWashing.isChecked ?
                <input
                    checked
                    type="checkbox"
                    id="dishWashing"
                    value="Mycie naczyń"
                    onChange={() => onDishWashingCheckboxChange()}
                /> :
                <input
                    type="checkbox"
                    id="dishWashing"
                    value="Mycie naczyń"
                    onChange={() => onDishWashingCheckboxChange()}
                />}
            <label htmlFor="dishWashing"> Mycie naczyń </label>

            {configuration.wateringPlants.isChecked ?
                <input
                    checked
                    type="checkbox"
                    id="wateringPlants"
                    value="Podlewanie kwiatków"
                    onChange={() => onWateringPlantsCheckboxChange()}
                /> :
                <input
                    type="checkbox"
                    id="wateringPlants"
                    value="Podlewanie kwiatków"
                    onChange={() => onWateringPlantsCheckboxChange()}
                />}
            <label htmlFor="wateringPlants"> Podlewanie kwiatków </label>
        </div>
    </div>
);

export default GeneralConfiguration;