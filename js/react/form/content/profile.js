var ProfileForm = React.createClass({
  getInitialState: function() {
	  
	  console.log(this.props.data);
    return {avatar:this.props.data.avatar,fname: this.props.data.fname, lname: this.props.data.lname};
  },
  handleAvatarChange: function(e) {
    this.setState({avatar: e.target.value});
  },  
  handleFNameChange: function(e) {
    this.setState({fname: e.target.value});
  },
  handleLNameChange: function(e) {
    this.setState({lname: e.target.value});
  },
  handleSubmit: function(e) { 
    e.preventDefault();
    var fname = this.state.fname?this.state.fname.trim():'';
    var lname = this.state.lname?this.state.lname.trim():'';
    var avatar = this.state.avatar?this.state.avatar.trim():'';
    if (!fname && !lname && !avatar) {
		//no changes
		console.log('No changes');
      return;
    }
    this.props.onProfileSubmit({fname: fname, lname: lname,avatar:avatar});
    this.setState({fname: '', lname: '',avatar:''});
  },
  render: function() {
    return (
      <form name="editaccount" className="form df-sp-" onSubmit={this.handleSubmit}>
	  <label className="df-col-">Name</label>
		<fieldset className="form-group col-xs-5 pr-px"> 
		<input
		  className="form-control"
          type="text"
          placeholder="First name"
          value={this.state.fname}
          onChange={this.handleFNameChange}
        />
		</fieldset>
		<fieldset className="form-group col-xs-5 pr-px">
		<input
		  className="form-control"
          type="text"
          placeholder="Last name"
          value={this.state.lname}
          onChange={this.handleLNameChange}
        />
		</fieldset>
		<label className="df-col-">Avatar URL</label>
		<fieldset className="form-group pr-w">
				
        <input
		  className="form-control"
          type="text"
          placeholder="Avatar URL"
          value={this.state.avatar}
          onChange={this.handleAvatarChange}
        />
		</fieldset>
        <input className="df-col-title-sm-sp-purple-box- hvr-float-shadow signupformubmit-btn" type="submit" value="Update" />
      </form>
    );
  }
});

var AccountBox = React.createClass({
  loadAccountFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleProfileSubmit: function(profile) {
    var profiledata = this.state.data;
   
    profile.id = Date.now();
    var newProfiledata = profiledata.concat([profile]);
    this.setState({data: newProfiledata});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: profile,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data: profiledata});
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  // componentDidMount is a method called automatically by React after a component is rendered for the first time. 
  componentDidMount: function() {
    this.loadAccountFromServer();
    //setInterval(this.loadAccountFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="df-white-card-col-sm5-sp-">
	  <label className="df-title-sm-">
		Edit Profile
	  </label>
	  <div className="df-col-sp-">
        <ProfileCurrent data={this.state.data} />
        <ProfileForm data={this.state.data} onProfileSubmit={this.handleProfileSubmit} />
      </div>
	  </div>
    );
  }
}); 

var ProfileCurrent = React.createClass({
  render: function() {
	var profiledata=this.props.data;
	console.log(profiledata);
    var profileNodes = (
        <Prodata fname={profiledata.fname} 
		lname={profiledata.lname} key={profiledata.id} avatar={profiledata.avatar} full_name={profiledata.full_name}>
          {profiledata.full_name}
        </Prodata>
      );
   
    return (
      <div className="currentprofile">
        {profileNodes}
      </div>
    );
  }
});

var Prodata = React.createClass({
  
 render: function() {
    return (
      <div className="">
        <label className="">
          {this.props.full_name}
        </label>
       
      </div>
    );
  }
});
$(document).ready(function(){
ReactDOM.render(
  <AccountBox url="/acct?profile" pollInterval={2000} />,
  document.getElementById('profile')
);
}); 
