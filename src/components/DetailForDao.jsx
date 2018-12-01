import React, { Component } from 'react';
import env from "../env"
import * as utils from "../services/utils"
import Modal from 'react-modal';
import breadcrumb from '../assets/img/breadcrumb.png';
import title_project from '../assets/img/title_project.png';
import content_project from '../assets/img/content_project.png';
import right_sidebar from '../assets/img/right_sidebar.png';
import '../assets/css/detail.scss';
import EthereumService from "../services/ethereum"
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

class DetailForDao extends Component {
  constructor() {
    super()

    this.campaignAddr = utils.getParameterByName('campaignAddr')
    this.ethereumService = new EthereumService(this.campaignAddr)
    console.log("______+++++++++++++++++", this.campaignAddr)
    this.state = {
      selectedToken: "ETH",
      amount: 0,
      deligatorAddr: "",
      modalIsOpen: false
    }
  }

  onChangeToken = (e) => {
    console.log(e.target.value)
    this.setState({
      selectedToken: e.target.value
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

  onSubmit = async (e) => {
    e.preventDefault()
    const tokenObj = env.tokens[this.state.selectedToken]
    const selectedTokenAddr = tokenObj.address
    const tokenTAmount = utils.toTWei(this.state.amount, tokenObj.decimal)
    const contributeData = await this.ethereumService.donateData(
      selectedTokenAddr,
      tokenTAmount,
      this.state.deligatorAddr
    )


    console.log("************** submit form: ",selectedTokenAddr,
    tokenTAmount,
    this.state.deligatorAddr,
    contributeData
  )


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

            <div className="d-flex mt-5 justify-content-between">
              <button className="footer-btn" onClick={this.openModal}>DONATE NOW</button>
              <button className="footer-btn" onClick={this.openModal}>REQUEST FUND</button>
              <button className="footer-btn" onClick={this.openModal}>CLAIM</button>
            </div>
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
            Request Fund
            <button type="button" class="close" onClick={this.onClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label>Select Token * </label>
                <select className="form-control" onChange={this.onChangeToken.bind(this)}>
                  {tokensSupport.map((t, i) => (
                    <option value={t.symbol} key={i}>{t.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Amount * </label>
                <input type="number" className="form-control" onChange={this.onChangeAmount} />
              </div>
              <div className="form-group">
                <label>Time </label>
                <input type="date" className="form-control" />
              </div>
              <div className="form-group">
                <label>Destination </label>
                <select className="form-control">
                  <option value="">Vinmec</option>
                  <option value="">CircleK</option>
                  <option value="">QSmart</option>
                  <option value="">Hai Ha</option>
                </select>
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


export default DetailForDao;
