/***************************
 * React dashboard class.
 * Yu Han 2016
 * *************************/

//Webpage
var App=React.createClass({
   componentDidMount:function(){
       console.log('Render App.Generate id:'+this.id);
   } ,
    
   render:function(){
       return(
       <div className="df-col-flex-">
            <div className="df-col-sm3-silver-">
                
                <LeftBlock leftMenuOptionList={this.props.leftMenuOptionList} id='leftMenu'/>
            </div>
            <div className="df-col-sm7-silver-">
               
                <RightBlock ableToggleLetMenu='true' toggleMenuID='leftMenu'/>
            </div>
       </div>
    )
   },
});
       
//LeftBlock
var LeftBlock=React.createClass({
   
    componentDidMount:function(){
      
        console.log('Render LeftBlock.');
   } ,
    render:function(){
       
        return(
            <div className="navbar-collapse collapse df-col-silver- " id={this.props.id}>
                <VerticalMenu leftMenuOptionList={this.props.leftMenuOptionList} />
            </div>
    )
    },
});
       
//RightBlock
var RightBlock=React.createClass({
    componentDidMount:function(){
       console.log('Render RightBlock. Has toggle menu button:'+this.props.ableToggleLetMenu);
   } ,
   render:function(){
       var leftMenuToogleButton=!this.props.ableToggleLetMenu?
           '' :
           <div className="navbar-toggle collapsed df-sp-clickable-" data-toggle="collapse" data-target={"#"+this.props.toggleMenuID} aria-expanded="false">
                    <i className="fa fa-bars"/>
                </div>;
       return(
            <div className="df-col-silver-">
           {leftMenuToogleButton}
            </div>
    )
   },
    
});

//VerticalMenu
var VerticalMenu=React.createClass({
     componentDidMount:function(){
       console.log('Render VerticalMenu.');
     },
   render:function(){
     
       var optionlists=this.props.leftMenuOptionList.map(function(option){
           
           return (
                <li className="df-col-skyblue-sp-clickable--hvrmore-">
                <a href="#" className="df-mrgl-xsbf-">
                    {option.name}
                </a>
                </li>
           )
       });
       return(
            <ul className="nav navbar-nav df-col-silver-">
            {optionlists}
            </ul>
        )
   },
})

$(document).ready(function(){
    ReactDOM.render(
      <App leftMenuOptionList={sample.leftMenuOption} />,
      document.getElementById('app')
    );
});

