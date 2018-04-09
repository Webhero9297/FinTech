import React from 'react';
import AbstractOrder from './AbstractOrder';

class BidOrder extends AbstractOrder {

  render() {
    return (
      <tr className="bid">
        <td>
          {this.props.cumulative}
        </td>
        <td>{this.props.quantity}</td>
        <td className="fill-bid" style={{backgroundSize: this.getPercentage() + "% 100%"}}>{this.props.price}</td>
      </tr>
    );
  }
}

export default BidOrder;
