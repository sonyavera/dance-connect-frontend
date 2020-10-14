import React, { Component } from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import '../App.css';
 
 
// One item component
// selected prop will be passed
const MenuItem = ({danceClassObj, selected}) => {
  return (
      <img className="scroll-div-img" key={danceClassObj.id} src={danceClassObj.instructor_avatar} alt=''/>
  )
};
 
// All items component
// Important! add unique key
const Menu = (list, selected) =>
  list.map(el => {
    // const {name} = el;
 
    return <MenuItem key={el.id} danceClassObj={el} selected={selected} />;
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
 
class TeacherScrollDiv extends Component {
  constructor(props) {
    super(props);
    // call it again if items count changes
    this.menuItems = Menu(this.props.danceClasses, selected);
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
          // onSelect={this.onSelect}
          wheel={false}
        />
      </div>
    );
  }
}

export default  TeacherScrollDiv;
 