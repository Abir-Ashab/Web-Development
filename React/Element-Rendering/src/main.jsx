import React from 'react'
import ReactDOM from 'react-dom/client'//DOM er kaj hocche web e jinishpati show kora, jehetu react e dom nai, tai react-dom package download kore oita theke ante hoy
import Clock from './components/Clock';
import Clock3 from './components/Clock3';

const element = <h1>Hello World</h1>
console.log(element);//eta dekhle bujha jabe je hello world lekhati props er children er bhitor achhe,jeta hocche ekta valid js object
console.log(element.props.children);

ReactDOM.createRoot(document.getElementById('root')).render(element)//rendering koray eta web e show kortese,eta rendering hocche index.html er div e by the ID "root"

setInterval(() => { // eta deya means time ta ke dynamic kora, eta lifecycle method
  const element2 = <h1>Time {new Date().toLocaleTimeString()}</h1>
  ReactDOM.createRoot(document.getElementById('root2')).render(element2)
}, 1000);


// functional component, it must start with uppercase letter
function Func({ format }) {
  const element2 = <h1>Customized Time: {new Date().toLocaleTimeString(format)}</h1>;
  return element2;
}
ReactDOM.createRoot(document.getElementById('root3')).render(Func({ format: 'bn-BD' }));
//This will also do the same : ReactDOM.createRoot(document.getElementById('root3')).render(<Func format = 'bn-BD' />);

// class component
class Clock2 extends React.Component {
  render() {
    const element2 = <h1>Customized Time from class component: {new Date().toLocaleTimeString(this.props.format)}</h1>;
    return element2;
  }
}
ReactDOM.createRoot(document.getElementById('root4')).render(<Clock2 format = 'en-US' />); //format = 'en-US' eta hocche propos


// call from different class
ReactDOM.createRoot(document.getElementById('root5')).render(<Clock format = 'en-US' />)

// call by react-lifecycle method component
ReactDOM.createRoot(document.getElementById('root6')).render(<Clock3 format = 'en-US' />)