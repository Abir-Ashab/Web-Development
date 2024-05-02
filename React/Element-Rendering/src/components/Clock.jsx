import React from 'react'

class Clock extends React.Component {
    render() {
        const element2 = <h1>Customized Time from different file component: {new Date.toLocaleTimeString(this.props.format)}</h1>;
        return element2;
      }
}
export default Clock;