import React from 'react';

class TestCount extends React.Component {
  constructor(props:any){
    super(props);  
    this.state={
      count:120
    }
  }  

  componentDidMount(){
    const interval = setInterval(() => {
        const timing=this.state.count-1;
        this.setState({count:timing})
    }, 1000);
  }

  render () {
    const {count} =this.state;
    window.console.log("我执行了",count)
    return (
      <div>
          <h2>{count}</h2>       
      </div>
    )
  }
}

export default TestCount;
