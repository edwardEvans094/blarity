import React, { Component } from 'react';
import env from "../env"
import * as utils from "../services/utils"


class DetailConfirm extends Component {
  constructor() {
    super()

    this.campaignAddr = utils.getParameterByName('campaignAddr')
    console.log("______+++++++++++++++++", this.campaignAddr)
    this.state = {
    }
  }


  onConfirm = () => {
    console.log("___________confirm")
  }

  onReject = () => {
    console.log("___________ reject")
  }

  render() {
    return (
      <div>
        This view show detail of campain

    - normal user can donate for campain
      input: amount, Address of user want to deligate

      if( want revert money) show button revert money for user

    - creator of campain
      show button clain money, input amount
      wait for DAO approve

    <br />
    <button onClick={this.onConfirm}>Confirm</button>
    <button onClick={this.onReject}>Reject</button>
    
      </div>
    )
  }

}


export default DetailConfirm;
