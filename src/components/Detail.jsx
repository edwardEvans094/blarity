import React from 'react';
import env from "../env"

const tokensSupport = Object.keys(env.tokens).map(t => ({
  symbol: t,
  name: env.tokens[t].name,
  address: env.tokens[t].address
}))


console.log("___________", tokensSupport)

const Detail = () => (
  <div>
    This view show detail of campain

    - normal user can donate for campain
      input: amount, Address of user want to deligate

      if( want revert money) show button revert money for user

    - creator of campain
      show button clain money, input amount
      wait for DAO approve

    <br />
      <form>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Select Token</label>
          <select>            
            {tokensSupport.map((t, i) => (
              <option value={t.address} key={i}>{t.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Amount</label>
          <input type="number" className="form-control" id="exampleInputPassword1" placeholder="Amount" />
        </div>
        <div className="form-group form-check">
          <label className="form-check-label" htmlFor="exampleCheck1">Select delegator</label>
          <div className="input-group mb-3">
            <input type="checkbox" name="vehicle1" value="Bike" /> I have a bike<br/>
            <input type="checkbox" name="vehicle2" value="Car" /> I have a car<br/>
            <input type="checkbox" name="vehicle3" value="Boat" checked /> I have a boat<br/>
          </div>
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
  </div>
);

export default Detail;
