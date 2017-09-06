import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteCard, moveCardRight, moveCardLeft } from "../actions";
import Edit from "./Edit";

class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalState: false
    }

    this.toggleModal = this.toggleModal.bind(this);

  }

  toggleModal() {
    this.setState((prev, props) => {
      const newState = !prev.modalState;

      return { modalState: newState };
    });
  }

  handleDelete(e){
    let target = parseInt(e.target.id);
    this.props.deleteCard(target);
  }

  handleMoveCardRight(e){
    this.props.moveCardRight(e.target.id)
  }

  handleMoveCardLeft(e){
    this.props.moveCardLeft(e.target.id)
  }

  handleNull(e){
    e.preventDefault();
  }

  render() {
    return (
      <div className="cardContainer">
        {
          this.props.cards.filter((card) => {
            return card.status === this.props.status
          })
          .map((card) => {
            return (
              <div key={card.id} className="card" id={this.props.status}>
                <header className="card-header">
                  <p className="card-header-title">
                    {card.title}

                  </p>
                  <a className="card-header-icon">
                    <span className="icon">
                      <i className="fa fa-trash-o" onClick={this.handleDelete.bind(this)} id={card.id}></i>
                    </span>
                  </a>
                </header>
                <div className="card-content">
                  <div className="content">
                    Priority: {card.priority}
                    <br/>
                    Created By: {card.createdBy}
                    <br/>
                    Assigned to: {card.assignedTo}
                  </div>
                </div>
                <footer className="card-footer">
                  <a className="card-footer-item" onClick={this.props.leftButton ? this.handleMoveCardLeft.bind(this) : this.handleNull.bind(this)} id={card.id}>{this.props.leftButton}</a>
                  <a className="card-footer-item" onClick={this.toggleModal}><i className="fa fa-pencil" aria-hidden="true"></i></a>
                  <a className="card-footer-item" onClick={this.handleMoveCardRight.bind(this)} id={card.id}>{this.props.rightButton}</a>
                </footer>
                <Edit
                  closeModal={this.toggleModal}
                  modalState={this.state.modalState}
                  id={card.id}
                  title={card.title}
                  priority={card.priority}
                  assignedTo={card.assignedTo}
                  createdBy={card.createdBy}
                >
                </Edit>
              </div>
            )
          })
        }
      </div>
    )
  }
}

const mapStatetoProps = (state) => {
  return {
    cards: state.cards
  }
}

const mapDispatchtoProps = (dispatch) => {
  return {
    deleteCard: (card) => {
      dispatch(deleteCard(card));
    },
    moveCardRight: (card) => {
      dispatch(moveCardRight(card))
    },
    moveCardLeft: (card) => {
      dispatch(moveCardLeft(card))
    }
  }
}

const ConnectedCard = connect(
  mapStatetoProps,
  mapDispatchtoProps
)(Card);

export default ConnectedCard;