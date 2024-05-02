import React from 'react'

class Clock3 extends React.Component {
    // when we need to initialize something in that case we need to use constructor
    constructor(props) {
        super(props) //base class or React.Component er constructor
        this.state = {date : new Date()}
    }
    componentDidMount() {//A lifecycle method of react-dom
        setInterval(() => {
            this.setState({
                date : new Date(),
            });
        }, 1000);
    }
    render() {
      const element2 = <h1>Customized Time from different file component: {this.state.date.toLocaleTimeString(this.props.format)}</h1>;
      return element2;
    }
}

export default Clock3;