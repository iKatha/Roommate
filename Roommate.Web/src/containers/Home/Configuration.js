import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions/Configuration';
import { getIsConfigurationFetching, getIsGeneratingTasks } from '../../reducers/fetching';
import { getConfiguration } from '../../reducers/Home/configuration';
import GeneralConfiguration from '../../components/Home/GeneralConfiguration';
import DetailConfiguration from '../../components/Home/DetailConfiguration';

class Configuration extends Component {
    componentDidMount() {
        const { fetchConfiguration } = this.props;
        fetchConfiguration();
    }

    render() {
        const { configuration, isConfigurationFetching, onKitchenCheckboxChange, onToiletCheckboxChange, onBathroomCheckboxChange, onSalonCheckboxChange, onHallCheckboxChange, onDishWashingCheckboxChange, onWateringPlantsCheckboxChange, onCleaningKitchenDayCheckboxChange, onCleaningToiletDayCheckboxChange, onCleaningBathroomDayCheckboxChange, onCleaningHallDayCheckboxChange, onCleaningSalonDayCheckboxChange, onDishWashingDayCheckboxChange, onWateringPlantsDayCheckboxChange, setConfiguration, generateTasks, isGeneratingTasks } = this.props;
        if (isConfigurationFetching) {
            return (
                <div className="configuration configuration__loader">
                    Loading
                <div className="first-dot"></div>
                    <div className="second-dot"></div>
                    <div className="third-dot"></div>
                </div>
            );
        }
        return (
            <div className="configuration">
                <label className="configuration__top-label">Kliknięcie w przycisk Wygeneruj spowoduje utworzeniu grafiku dyżurów od dnia jutrzejszego do końca bierzącego miesiąca. Dotychczasowy grafik obejmujący podany okres zostanie usunięty.</label>
                {!configuration.cleaning.cleaningKitchen.isChecked && !configuration.cleaning.cleaningToilet.isChecked && !configuration.cleaning.cleaningHall.isChecked && !configuration.cleaning.cleaningBathroom.isChecked && !configuration.cleaning.cleaningSalon.isChecked && !configuration.dishWashing.isChecked && !configuration.wateringPlants.isChecked ? <button className="configuration__button configuration__button--disabled disabled">Wygeneruj</button> :
                    <button className="configuration__button" onClick={() => generateTasks()}>Wygeneruj</button>}
                {isGeneratingTasks &&
                    <div className="configuration__loader configuration__loader--creating">
                        Trwa tworzenie grafiku
                    <div className="first-dot"></div>
                        <div className="second-dot"></div>
                        <div className="third-dot"></div>
                    </div>}

                {configuration.tasksMessage && <div className="configuration__message">{configuration.tasksMessage}</div>}

                <GeneralConfiguration configuration={configuration} onKitchenCheckboxChange={onKitchenCheckboxChange} onToiletCheckboxChange={onToiletCheckboxChange} onBathroomCheckboxChange={onBathroomCheckboxChange} onSalonCheckboxChange={onSalonCheckboxChange} onHallCheckboxChange={onHallCheckboxChange} onDishWashingCheckboxChange={onDishWashingCheckboxChange} onWateringPlantsCheckboxChange={onWateringPlantsCheckboxChange}/>
                {configuration.cleaning.cleaningKitchen.isChecked && <DetailConfiguration name="Sprzątanie kuchni" configuration={configuration.cleaning.cleaningKitchen} onDayCheckboxChange={onCleaningKitchenDayCheckboxChange} idName="cleaningKitchen"/>}
                {configuration.cleaning.cleaningToilet.isChecked && <DetailConfiguration name="Sprzątanie toalety" configuration={configuration.cleaning.cleaningToilet} onDayCheckboxChange={onCleaningToiletDayCheckboxChange} idName="cleaningToilet"/>}
                {configuration.cleaning.cleaningBathroom.isChecked && <DetailConfiguration name="Sprzątanie łazienki" configuration={configuration.cleaning.cleaningBathroom} onDayCheckboxChange={onCleaningBathroomDayCheckboxChange} idName="cleaningBathroom"/>}
                {configuration.cleaning.cleaningHall.isChecked && <DetailConfiguration name="Sprzątanie przedpokoju" configuration={configuration.cleaning.cleaningHall} idName="cleaningHall" onDayCheckboxChange={onCleaningHallDayCheckboxChange}/>}
                {configuration.cleaning.cleaningSalon.isChecked && <DetailConfiguration name="Sprzątanie salonu" configuration={configuration.cleaning.cleaningSalon} idName="cleaningSalon" onDayCheckboxChange={onCleaningSalonDayCheckboxChange}/>}
                {configuration.dishWashing.isChecked && <DetailConfiguration name="Mycie naczyń" configuration={configuration.dishWashing} idName="dishWashing" onDayCheckboxChange={onDishWashingDayCheckboxChange}/>}
                {configuration.wateringPlants.isChecked && <DetailConfiguration name="Podlewanie kwiatków" configuration={configuration.wateringPlants} idName="wateringPlants" onDayCheckboxChange={onWateringPlantsDayCheckboxChange} />}

                <label>Zapisanie konfiguracji: </label>
                <button className="configuration__button" onClick={() => setConfiguration(configuration)}>Zapisz</button>
                {configuration.configurationMessage && <div className="configuration__message">{configuration.configurationMessage}</div>}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isConfigurationFetching: getIsConfigurationFetching(state),
        configuration: getConfiguration(state),
        isGeneratingTasks: getIsGeneratingTasks(state)
    };
};

Configuration = withRouter(connect(
    mapStateToProps,
    actions
)(Configuration));

export default Configuration;