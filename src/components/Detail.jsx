import React, { Component } from 'react';
import env from "../env"
import * as utils from "../services/utils"
import Modal from 'react-modal';
import breadcrumb from '../assets/img/breadcrumb.png';
import title_project from '../assets/img/title_project.png';
import content_project from '../assets/img/content_project.png';
import right_sidebar from '../assets/img/right_sidebar.png';
import '../assets/css/detail.scss';

const tokensSupport = Object.keys(env.tokens).map(t => ({
  symbol: t,
  name: env.tokens[t].name,
  address: env.tokens[t].address
}))

const customStyles = {
  content : {
    top         : '50%',
    left        : '50%',
    right       : 'auto',
    bottom      : 'auto',
    marginRight : '-50%',
    transform   : 'translate(-50%, -50%)',
    width       : '80%',
    maxWidth    : '500px',
    padding     : 0,
  }
};

Modal.setAppElement('#app')

class Detail extends Component {
  constructor() {
    super()

    this.campaignAddr = utils.getParameterByName('campaignAddr')
    console.log("______+++++++++++++++++", this.campaignAddr)
    this.state = {
      tokenAddr: "",
      amount: 0,
      deligatorAddr: "",
      modalIsOpen: false
    }
  }

  onChangeToken = (e) => {
    console.log(e.target.value)
    this.setState({
      tokenAddr: e.target.value
    })
  }

  onChangeAmount = (e) => {
    console.log(e.target.value)
    this.setState({
      amount: e.target.value
    })
  }

  onChangeDeligator = (e) => {
    console.log(e.target.value)
    this.setState({
      deligatorAddr: e.target.value
    })
  }

  openModal = () =>  {
    this.setState({modalIsOpen: true});
  }

  onSubmit = (e) => {
    e.preventDefault()
    console.log("************** submit form: ", this.state.tokenAddr, this.state.amount, this.state.deligatorAddr)
  }

  onClose = (e) => {
    this.setState({modalIsOpen: false});
  }

  render() {
    return (
      <div>
        <div className="page-content">
          <img src={breadcrumb} alt=""/>
          <img className="right-sidebar" src={right_sidebar} alt=""/>
          <div className="article-content">
            <div className="donate-area">
              <div className="d-flex justify-content-between mb-4">
                <div className="page-title">
                  <span>Cơm có thịt</span>
                </div>
                <div>
                  <button className="donate-btn" onClick={this.openModal}>DONATE NOW</button>
                </div>
              </div>
              <div className="d-flex justify-content-between mb-2 align-items-baseline">
                <div>Target:</div>
                <div className="target">100 ETH</div>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <div>Deadline:</div>
                <div>27 January 2019</div>
              </div>
            </div>
            <img src={content_project} alt=""/>
          </div>
        </div>

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="modal-title">
            Donate
            <button type="button" class="close" onClick={this.onClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Select Token * </label>
                <select className="form-control" onChange={this.onChangeToken.bind(this)}>
                  {tokensSupport.map((t, i) => (
                    <option value={t.address} key={i}>{t.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Amount * </label>
                <input type="number" className="form-control" id="exampleInputPassword1" placeholder="Amount" onChange={this.onChangeAmount} />
              </div>
              <label className="form-check-label" htmlFor="exampleCheck1">
                Select delegator - <i className="text-muted">Optional</i>
              </label>
              <div class="form-group form-check mt-2">
                <input type="checkbox" class="form-check-input" name="vehicle1" value="Bike" id="check_1" onChange={this.onChangeDeligator} checked={this.state.deligatorAddr == "Bike"}/>
                <label class="form-check-label" for="check_1">Jenifer Apolo</label>
              </div>
              <div class="form-group form-check">
                <input className="form-check-input" type="checkbox" name="vehicle2" value="Car" checked={this.state.deligatorAddr == "Car"} id="check_2" onChange={this.onChangeDeligator}/> 
                <label class="form-check-label" for="check_2">Oliver Giroud</label>
              </div>
              <div class="form-group form-check">
                <input className="form-check-input" type="checkbox" name="vehicle3" value="Boat" id="check_3" checked={this.state.deligatorAddr == "Boat"} onChange={this.onChangeDeligator}/>
                <label class="form-check-label" for="check_3">Micheal Houbi</label>
              </div>
              <div className="text-center mt-4">
                <button className="donate-btn" onClick={this.onSubmit}>Submit</button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    )
  }

}


export default Detail;
