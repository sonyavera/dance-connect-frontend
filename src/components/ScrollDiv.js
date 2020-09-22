import React, { Component } from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import '../App.css';
import ClassCard from './ClassCard'
 
 
// One item component
// selected prop will be passed
const MenuItem = ({danceClassObj, purchaseHandlerFunction, purchases, selected}) => {
  return <ClassCard key={danceClassObj.id} danceClass={danceClassObj} purchases={purchases} purchaseHandler={purchaseHandlerFunction}/>;
};
 
// All items component
// Important! add unique key
export const Menu = (list, purchaseHandlerFunction, purchasesArray, selected) =>
  list.map(el => {
    // const {name} = el;
    
    return <MenuItem key={el.id} danceClassObj={el} purchases={purchasesArray} purchaseHandlerFunction={purchaseHandlerFunction}  selected={selected} />;
  });
 
 
const Arrow = ({ text, className }) => {
  return (
    <div
      className={className}
    >{text}</div>
  );
};
 
 
const ArrowLeft = Arrow({ text: '<', className: 'arrow-prev' });
const ArrowRight = Arrow({ text: '>', className: 'arrow-next' });
 
const selected = 'item1';
 
class ScrollDiv extends Component {
  constructor(props) {
    super(props);
    // call it again if items count changes
    this.menuItems = Menu(this.props.danceClasses, this.props.purchaseHandler, this.props.purchases, selected);
  }
 
  state = {
    selected
  };
 
  onSelect = key => {
    this.setState({ selected: key });
  }
 
 
  render() {
    const { selected } = this.state;
    // Create menu from items
    const menu = this.menuItems;
 
    return (
      <div className="App"> 
        <ScrollMenu
          data={menu}
          arrowLeft={ArrowLeft}
          arrowRight={ArrowRight}
          selected={selected}
          onSelect={this.onSelect}
          wheel={false}
        />
      </div>
    );
  }
}
 

export default ScrollDiv;