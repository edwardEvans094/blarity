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
      destAddr: "",
      modalIsOpen: false,
      pendingId: null,
      timeEnd: null
    }
  }

  componentDidMount = async () => {
    try {
      const pendingId = await this.ethereumService.getPendingRequestId()
      console.log("*************pemdimg", pendingId)
      if(pendingId){
        const infoPending = await this.ethereumService.getPendingInfo(pendingId - 1)
        console.log('************************', infoPending)
        this.setState({
          pendingId: {
            id: pendingId -1,
            info: infoPending
          }
        })
      }
    } catch (error) {
      console.log(error)
    }
    
  }

  onChangeToken = (e) => {
    console.log(e.target.value)
    this.setState({
      selectedToken: e.target.value
    })
  }

  onChangeAmount = (e) => {
    this.setState({
      amount: e.target.value
    })
  }

  onChangeTime = (e) => {

    this.setState({
      timeEnd: new Date(e.target.value).getTime() / 1000
    })
  }

  onChangeDest = (e) => {
    console.log(e.target.value)
    this.setState({
      destAddr: e.target.value
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

  onRequestFund = () => {
    if(!this.state.pendingId || (this.state.pendingId && this.state.pendingId.info._isEnded)){
      const DAI = env.tokens['DAI']
      const tokenAmount = utils.toTWei(this.state.amount, DAI.decimal)
      const dataMakeRequest = this.ethereumService.dataMakeRequestFund(tokenAmount, this.state.destAddr, this.state.timeEnd)
      const rawRequest = utils.createRawTx(0, this.campaignAddr, dataMakeRequest)
      if(window.web3){
        window.web3.eth.sendTransaction(rawRequest, (err, txhash) => {
          if(err) alert(err)
          else alert("Transaction broadcasted to network")
        })
      } else {
        alert("Metamask not install")
      }
    }
  }

  onClaim = () => {
    if(this.state.pendingId){
      console.log("***************", this.state.pendingId)
      const dataClaim = this.ethereumService.dataClaimFund(this.state.pendingId.id)
      const rawRequest = utils.createRawTx(0, this.campaignAddr, dataClaim)
      if(window.web3){
        window.web3.eth.sendTransaction(rawRequest, (err, txhash) => {
          if(err) alert(err)
          else alert("Transaction broadcasted to network")
        })
      } else {
        alert("Metamask not install")
      }
    }
  }

  onSubmit = async (e) => {
    e.preventDefault()
    this.onRequestFund()
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
            <button className="footer-btn" onClick={this.openModal}>DONATE</button>
              { (!this.state.pendingId || (this.state.pendingId && this.state.pendingId.info._isEnded)) &&
              <button className="footer-btn" onClick={this.openModal}>REQUEST FUND</button>
              }
              {
                this.state.pendingId && this.state.pendingId.info && !this.state.pendingId.info._isEnded  &&
                <button className="footer-btn" onClick={this.onClaim}>CLAIM</button>
              }
              
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
              <label>DAI* </label>

                {/* <label>Select Token * </label>
                <select className="form-control" onChange={this.onChangeToken.bind(this)}>
                  {tokensSupport.map((t, i) => (
                    <option value={t.symbol} key={i}>{t.name}</option>
                  ))}
                </select> */}
              </div>
              <div className="form-group">
                <label>Amount * </label>
                <input type="number" className="form-control" onChange={this.onChangeAmount} />
              </div>
              <div className="form-group">
                <label>Time </label>
                <input type="date" className="form-control" onChange={this.onChangeTime}/>
              </div>
              <div className="form-group">
                <label>Destination </label>
                <select className="form-control" onChange={this.onChangeDest}>
                  <option value="0xf01fA4910d500795B6A9F3e1667489023f65e2d6">Vinmec</option>
                  <option value="0xf01fA4910d500795B6A9F3e1667489023f65e2d6">CircleK</option>
                  <option value="0xf01fA4910d500795B6A9F3e1667489023f65e2d6">QSmart</option>
                  <option value="0xf01fA4910d500795B6A9F3e1667489023f65e2d6">Hai Ha</option>
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
