
import Help from 'material-ui/svg-icons/action/help';
import IconButton from 'material-ui/IconButton';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import LocalDining from 'material-ui/svg-icons/maps/restaurant';
import Paper from 'material-ui/Paper';
import Person from 'material-ui/svg-icons/action/account-circle';
import PersonAdd from 'material-ui/svg-icons/content/add-circle';
import React from 'react';
import { fullWhite, red700, green600, yellow600, brown700 }
  from 'material-ui/styles/colors';
import { withRouter } from 'react-router';


const Landing = React.createClass({

  render() {
    const styleIcon = {
      largeIcon: {
        width: 150,
        height: 150,
      },
      large: {
        width: 180,
        height: 180,
      },
    };


    return <div>
      <img className="logo" src="./images/logo.jpg" />
      <div>
        <IconButton
          tooltip="New User"
          touch={true}
          tooltipPosition="bottom-right"
          iconStyle={styleIcon.largeIcon}
          style={styleIcon.large}
        >
          <PersonAdd color={red700} />
        </IconButton>

        <IconButton
          tooltip="Login"
          touch={true}
          tooltipPosition="bottom-right"
          iconStyle={styleIcon.largeIcon}
          style={styleIcon.large}
        >
          <Person color={green600} />
        </IconButton>
      </div>

      <div>
        <IconButton
          tooltip="What We Do"
          touch={true}
          tooltipPosition="bottom-right"
          iconStyle={styleIcon.largeIcon}
          style={styleIcon.large}
        >
          <Help color={yellow600} />
        </IconButton>

        <IconButton
          tooltip="Lets Go!"
          touch={true}
          tooltipPosition="bottom-right"
          iconStyle={styleIcon.largeIcon}
          style={styleIcon.large}
        >
          <LocalDining color={brown700} />
        </IconButton>
      </div>
    </div>;
  }
});

export default withRouter(Landing);
