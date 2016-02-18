/*******************************
 * React TwoPartModelView v 0.1
 * app > header + ( leftblock + rightblock )
 * Yu Han 2016 @claydata.com
 * hany@mynsmg.com.au
 * *****************************/

//App 
//set 1st as default selected component (display on the right-hand side) passed from model
var App=React.createClass({
	
	getInitialState: function() {
		var state={modeID:'',components:this.props.model};
		if(typeof this.props.model.map =='undefined')
	   {
		   //map JSON into JS array 
			state.components= Object.keys(this.props.model).map(function(k) { return {k:this.props.model[k]}});
	   };
	   state.modeID=0;
	   console.log('App State: ',state);
		return state;
	  },
	handleComponentChange:function(i){
		 //change modeID
		 console.log('Selected id:',i);
		
		this.setState({modeID:i});
	},
   
   render:function(){
	    console.log('Render App. Left Menu id:'+this.id);
       return(
	   <div className="container df-flex-jfmid-">
       <div className="df-col-sm9-flex-ver-start-">
			<AppHeader ableToggleLetMenu='true' toggleMenuID='leftMenu'/>
			<div className="df-flex-jfsb-">
				<div className="df-col-sm3-">
					
					<LeftBlock components={this.state.components} id='leftMenu' componentChange={this.handleComponentChange}/>
				</div>
				<div className="df-col-sm7-">
					<RightBlock displayConent={this.state.components[this.state.modeID]}/>
				</div>
			</div>
       </div>
	   </div>
    )
   },
});

var AppHeader=React.createClass({
	
	render:function(){
		 var leftMenuToogleButton=!this.props.ableToggleLetMenu?
           '' :
           <div className="navbar-toggle collapsed df-sp-clickable-" data-toggle="collapse" data-target={"#"+this.props.toggleMenuID} aria-expanded="false">
                    <i className="fa fa-bars df-clickable-"/>
                </div>;
				console.log('Render AppHeader. Has toggle menu button:'+this.props.ableToggleLetMenu);
       return(
	 <h3 className="df-title-pad-"> Edit Acount {leftMenuToogleButton} <small> Change profile or personal information</small>   </h3>
	 )
	}
	
});

//LeftBlock
var LeftBlock=React.createClass({
   
    render:function(){
        console.log('Render LeftBlock.');
        return(
            <div className="navbar-collapse collapse df-col- " id={this.props.id}>
                <VerticalMenu components={this.props.components}  componentChange={this.props.componentChange}/>
            </div>
    )
    },
});
       
//RightBlock
var RightBlock=React.createClass({
	//Only render the selected component
	
   render:function(){ 
		//create element based on tag type
		var displayTagElement='';
		console.log(this.props.displayConent.content.tag);
		switch (this.props.displayConent.content.tag)
		{
			case 'form':
				displayTagElement=this.props.displayConent.content.submitButtonText
			break;
			default:
				displayTagElement='No Content to Display.';
		}
	console.log('Render RightBlock.',displayTagElement);
       return(
            <div className="df-col-">
				{displayTagElement}
            </div>
    )
   },
    
});

//VerticalMenu
var VerticalMenu=React.createClass({
	getInitialState:function(){
		return {'selectedID':0}; 
	},	
	handleOnChange:function(i){
		this.props.componentChange(i);
		this.setState({selectedID:i});
		console.log(i);
	},
	render:function(){
		console.log('Render VerficalMenu');
       return(
            <ul className="nav navbar-nav df-col-">
            {
				this.props.components.map(function(component, i) {
				  return (
				  <li className="df-col-hvrmore-" onClick={this.handleOnChange.bind(this,i)} key={i}>
					<ComponentOption componentKey={i} selectedID={this.state.selectedID} componentName={component.option.name}/>
                </li>
					 
				  );
				}, this)
		}
            </ul>
        )
   },
})

//Component Option
var ComponentOption=React.createClass({
	
	render:function(){
		
		var active=this.props.componentKey==this.props.selectedID?'blue-title-sm-':'skyblue-';
		console.log('Render Option');
		return (
			<a href="#" className={"df-mrgl-xsbf-"+active}>
						{this.props.componentName}
			</a>
		)
		
	}

});
