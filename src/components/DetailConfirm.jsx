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
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
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
            <img src={title_project} alt=""/>
            <div className="form-approval">
              <div className="title">Request withdraw</div>
              <div className="d-inline-block mr-5">Amount: 12 ETH</div>
              <div className="d-inline-block">Due Date: 22 Jan 2019</div>
              <div className="mt-1">Due Date: 22 Jan 2019</div>
              <div className="group-btn">
                <button className="h-btn mr-3">Reject</button>
                <button className="h-btn h-blue">Accept</button>
              </div>
            </div>
            <div className="d-flex justify-content-between balance-area">
              <div className="title">Current Balance: </div>
              <div>
                <div className="balance">16 ETH</div>
                <button className="h-btn">History</button>
              </div>
            </div>
            <img src={content_project} alt=""/>
          </div>
        </div>
        <br />
        
      <button onClick={this.openModal}>Open Modal</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
        <form>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Select Token</label>
            <select onChange={this.onChangeToken.bind(this)}>
              {tokensSupport.map((t, i) => (
                <option value={t.address} key={i}>{t.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Amount</label>
            <input type="number" className="form-control" id="exampleInputPassword1" placeholder="Amount" onChange={this.onChangeAmount} />
          </div>
          <div className="form-group form-check">
            <label className="form-check-label" htmlFor="exampleCheck1">Select delegator</label>
            <div className="input-group mb-3">
              <input type="checkbox" name="vehicle1" value="Bike" checked={this.state.deligatorAddr == "Bike"} onChange={this.onChangeDeligator}/> I have a bike<br />
              <input type="checkbox" name="vehicle2" value="Car" checked={this.state.deligatorAddr == "Car"} onChange={this.onChangeDeligator}/> I have a car<br />
              <input type="checkbox" name="vehicle3" value="Boat" checked={this.state.deligatorAddr == "Boat"} onChange={this.onChangeDeligator}/> I have a boat<br />
            </div>
          </div>
          <button className="btn btn-primary" onClick={this.onSubmit}>Submit</button>
          <button className="btn" onClick={this.onClose}>close</button>
        </form>

        </Modal>
      </div>
    )
  }

}


export default Detail;
