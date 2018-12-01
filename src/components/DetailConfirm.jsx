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
    this.ethereumService = new EthereumService(this.campaignAddr)
    console.log("______+++++++++++++++++", this.campaignAddr)
    this.state = {
      tokenAddr: "",
      amount: 0,
      deligatorAddr: "",
      modalIsOpen: false,
      pendingId: null
    }
  }

  componentDidMount = async () => {
    const pendingId = await this.ethereumService.getPendingRequestId()
    if(pendingId){
      const pendingInfo = await this.ethereumService.getPendingInfo(pendingId-1)
      console.log("**************", pendingInfo)
      this.setState({
        pendingId: {
          id: pendingId -1,
          info: pendingInfo
        }
      })
    }
  }

  onChangeToken = (e) => {
    console.log(e.target.value)
    this.setState({
      tokenAddr: e.target.value
    })
  }

  onConfirm = async (isApprove) => {

    if(this.state.pendingId != null) {
      const voteData = await this.ethereumService.voteData(this.state.pendingId.id, isApprove)
      const rawVote = utils.createRawTx(0, this.campaignAddr, voteData)

      if(window.web3){
        window.web3.eth.sendTransaction(rawVote, (err, txhash) => {
          if(err) alert(err)
          else alert("Transaction broadcasted to network " + txhash)
        })
      } else {
        alert("Metamask not install")
      }
  
    }
  }

  onReject = () => {
    if(this.state.pendingId){

    }
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
            <div className="page-title">
              <span>Cơm có thịt</span>
            </div>
            {
              this.state.pendingId && this.state.pendingId.info &&
                <div className="form-approval">
                <div className="title">Request withdraw</div>
                <div className="d-inline-block mr-5">Amount: {utils.toToken(this.state.pendingId.info._amount)} DAI</div>
                
                <div className="mt-1">Due Date: {new Date(+this.state.pendingId.info._endTime * 1000).toString()}</div>
                <div className="mt-1">To Address: {this.state.pendingId.info._toAddress}</div>
                <div className="group-btn">
                  <button className="h-btn mr-3" onClick={() => this.onConfirm(false)}>Reject</button>
                  <button className="h-btn h-blue" onClick={() => this.onConfirm(true)}>Accept</button>
                </div>
              </div>
            }
            


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
        
      {/* <button onClick={this.openModal}>Open Modal</button> */}
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
