import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/Renting';
import { getIsOffertFetching } from '../../reducers/fetching';
import { getChosenOffert } from '../../reducers/Renting/offerts';
import { withRouter } from 'react-router-dom';
import Modal from '../../components/Core/Modal';

class ChosenOffert extends React.Component {
    componentDidMount() {
        const { fetchOffert, currentOffertId} = this.props;
        fetchOffert(currentOffertId);
    }

    render() {
        const { isOffertFetching, offert, closeModal, openModal } = this.props;
        if (isOffertFetching)
            return (
                <div className="chosen-offert__loader">
                    Loading
                <div className="first-dot"></div>
                    <div className="second-dot"></div>
                    <div className="third-dot"></div>
                </div>
            );
        else if (!offert)
            return (
                <div className="chosen-offert__empty">Brak oferty.</div>
            );
        else return (
            <div className="chosen-offert">
                <div className="offert__value--tittle">{offert.Tittle}</div>
                <div className="offert__value--description">{offert.Description}</div>
                <div className="chosen-offert__images">
                    {offert.Images.map((img, index) =>
                        <div key={index} className="chosen-offert__image-outer">
                            <img src={img} className="chosen-offert__image" onClick={()=>openModal(img)}/>
                        </div>
                    )}
                </div>
                <div>
                <div className="offert__column">
                    <div className="offert__small-column offert__small-column--labels">
                        <label className="offert__label">Data dodania: </label>
                        <label className="offert__label">Lokalizacja: </label>
                        <label className="offert__label">Ulica: </label>
                        <label className="offert__label">Nr mieszkania: </label>
                        <label className="offert__label">Nr budynku: </label>
                        <label className="offert__label">Nr piętra: </label>
                    </div>
                    <div className="offert__small-column">
                        <div className="offert__value">{offert.ShownCreateDate}</div>
                        <div className="offert__value">{offert.District}, {offert.City}, {offert.Province}</div>
                        <div className="offert__value">{offert.Street}</div>
                        {offert.ApartamentNumber ? <div className="offert__value">{offert.ApartamentNumber}</div> : <div className="offert__value">brak</div>}
                        <div className="offert__value">{offert.BuildingNumber}</div>
                        <div className="offert__value">{offert.FloorNumber}</div>
                    </div>
                </div>
                <div className="offert__column">
                    <div className="offert__small-column offert__small-column--labels">
                        <label className="offert__label">Cena: </label>
                        <label className="offert__label">Powierzchnia: </label>
                        <label className="offert__label">Rodzaj pokoju: </label>
                        <label className="offert__label">Ilość współlokatorów: </label>
                        <label className="offert__label">Nr telefonu: </label>
                        <label className="offert__label">Adres Email: </label>
                    </div>
                    <div className="offert__small-column">
                        <div className="offert__value">{offert.Price}</div>
                        <div className="offert__value">{offert.SurfaceArea}</div>
                        <div className="offert__value">{offert.RoomType}</div>
                        <div className="offert__value">{offert.RoommateQuantity}</div>
                        {localStorage.getItem('user') ? <div className="offert__value">{offert.User.Phone}</div>
                            : <div className="offert__value">********</div>
                            }
                        {localStorage.getItem('user') ? <div className="offert__value">{offert.User.Email}</div>
                            : <div className="offert__value">********</div>
                        }
                    </div>
                </div>
                <label className="offert__label offert__label--other-options">Inne opcje: </label>
                <div className="offert__value offert__value--other-options">{offert.IsEquipped && "Wyposażenie"} {offert.AreMediaIncluded && "Media w cenie"} {offert.ArePetsAllowed && "Zwierzęta dozwolone"}</div>
                </div>

                <Modal closeModal={closeModal} modalId="pictureModal">
                    <img className="chosen-offert__image chosen-offert__image--modal" id="offertPicture"></img>
                </Modal>
            </div>
            );
    }
}

const mapStateToProps = (state, { match }) => {
    const currentOffertId = match.params.id;
    return {
        isOffertFetching: getIsOffertFetching(state),
        offert: getChosenOffert(state),
        currentOffertId
    };
};

ChosenOffert = withRouter(connect(
    mapStateToProps,
    actions
)(ChosenOffert));

export default ChosenOffert;