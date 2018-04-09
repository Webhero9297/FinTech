import React from 'react';
import AbstractOrder from './AbstractOrder';

class AskOrder extends AbstractOrder {

  render() {
    return (
      <tr className="ask">
        <td>{this.props.cumulative}</td>
        <td>{this.props.quantity}</td>
        <td className="fill-ask" style={{backgroundSize: this.getPercentage() + "% 100%"}}>
          {this.props.price}
        </td>
      </tr>
    );
  }
}

export default AskOrder;
