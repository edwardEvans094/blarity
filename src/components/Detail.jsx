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

class Detail extends Component {
  constructor() {
    super()

    this.campaignAddr = utils.getParameterByName('campaignAddr')
    this.ethereumService = new EthereumService(this.campaignAddr)
    console.log("______+++++++++++++++++", this.campaignAddr)

    this.needApprove = false
    this.state = {
      selectedToken: "ETH",
      amount: 0,
      deligatorAddr: "",
      modalIsOpen: false,
      txHash: '',
      currentAddr: '',
      allowance: 99999999
    }
  }

  componentDidMount(){
    this.getCoinbase()
  }

  onChangeToken = async (e) => {
    console.log("++++++++++++++++++*******", e.target.value)
    this.setState({
      selectedToken: e.target.value
    })

    if(this.state.currentAddr && e.target.value !== 'ETH'){
      const tokenObj = env.tokens[e.target.value]
      const allowance = await this.ethereumService.getAllowance(tokenObj.address, this.state.currentAddr)
      console.log(allowance)
      this.setState({
        allowance: +allowance
      })
    } else {
      this.setState({
        allowance: 99999999
      })
    }
    
    
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
  getCoinbase = () => {
    web3.eth.getCoinbase((error, result) => {
      if (error || !result) {
        console.log(error)
      }else{
        console.log(result)
        this.setState({
          currentAddr: result
        })
        
      }
    })
  }


  openModal = () =>  {
    this.setState({
      modalIsOpen: true,
      txHash: null
  });
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
    
  console.log("+++++++++++", this.state.allowance)
  if(!this.state.allowance){
    try {
      const approveData = await this.ethereumService.approveTokenData(selectedTokenAddr, utils.biggestNumber())
      const rawApprove = utils.createRawTx(0, selectedTokenAddr, approveData)
      console.log("++++++++++++++raw approve", rawApprove)
      if(window.web3){
        window.web3.eth.sendTransaction(rawApprove, (err, txhash) => {
          if(err) alert(err)
          else alert("Transaction broadcasted to network " + txhash)
        })
      } else {
        alert("Metamask not install")
      }
    } catch (error) {
      alert(error)
    }

  } else {
    
    let rawDonate = ''
    if(this.state.selectedToken !== 'ETH'){
      rawDonate = utils.createRawTx(0, this.campaignAddr, contributeData)
    } else {
      rawDonate = utils.createRawTx(this.state.amount, this.campaignAddr, contributeData)
    }
    if(window.web3){
      window.web3.eth.sendTransaction(rawDonate, (err, txhash) => {
        if(err) alert(err)
        else this.setState({txHash: txhash})
      })
    } else {
      alert("Metamask not install")
    }
  }
    
    



  }

  onClose = (e) => {
    this.setState({modalIsOpen: false});
  }

  approveToken = async (addr, amount) => {
    const tokenObj = env.tokens[this.state.selectedToken]
    const selectedTokenAddr = tokenObj.address
    const approveData = await this.ethereumService.approveTokenData()
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
            <button type="button" className="close" onClick={this.onClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            { this.state.txHash ? (
              <React.Fragment>
                <p>Transaction Hash:</p>
                <a className="hash" href={"https://ropsten.etherscan.io/tx/" + this.state.txHash} target="_blank">{this.state.txHash}</a>
              </React.Fragment>
            ) : (
              <form>
                {
                  this.state.currentAddr && 
                  <div className="form-group">
                    <label>Current Address: {this.state.currentAddr} </label>
                    
                  </div>
                }
                
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
                  <input type="number" className="form-control" id="exampleInputPassword1" placeholder="Amount" onChange={this.onChangeAmount} />
                </div>
                <label className="form-check-label">
                  Select delegator - <i className="text-muted">Optional</i>
                </label>
                <div className="form-group form-check mt-2">
                  <input type="checkbox" className="form-check-input" name="vehicle1" value="0x02ba31046726d98f652F839e5EB1d3d598B67EeD" id="check_1" onChange={this.onChangeDeligator} checked={this.state.deligatorAddr == "0x02ba31046726d98f652F839e5EB1d3d598B67EeD"}/>
                  <label className="form-check-label" htmlFor="check_1">Jenifer Apolo</label>
                </div>
                <div className="form-group form-check">
                  <input className="form-check-input" type="checkbox" name="vehicle2" value="0xf01fA4910d500795B6A9F3e1667489023f65e2d6" checked={this.state.deligatorAddr == "0xf01fA4910d500795B6A9F3e1667489023f65e2d6"} id="check_2" onChange={this.onChangeDeligator}/> 
                  <label className="form-check-label" htmlFor="check_2">Oliver Giroud</label>
                </div>
                <div className="form-group form-check">
                  <input className="form-check-input" type="checkbox" name="vehicle3" value="0x665d34f192f4940da4e859ff7768c0a80ed3ae10" id="check_3" checked={this.state.deligatorAddr == "0x665d34f192f4940da4e859ff7768c0a80ed3ae10"} onChange={this.onChangeDeligator}/>
                  <label className="form-check-label" htmlFor="check_3">Micheal Houbi</label>
                </div>
                <div className="text-center mt-4">
                  <button className="donate-btn" onClick={this.onSubmit}>Submit</button>
                </div>
              </form>
            )}
          </div>
        </Modal>
      </div>
    )
  }

}


export default Detail;
