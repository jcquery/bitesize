import AppBar from 'material-ui/AppBar';
import axios from 'axios';
import { BottomNavigation, BottomNavigationItem }
  from 'material-ui/BottomNavigation';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import React from 'react';
import { browserHistory, withRouter } from 'react-router';
import LocalDining from 'material-ui/svg-icons/maps/restaurant';
import Help from 'material-ui/svg-icons/action/help';
import Person from 'material-ui/svg-icons/action/account-circle';
import PersonAdd from 'material-ui/svg-icons/content/add-circle';
import ResultModal from 'components/ResultModal';

const App = React.createClass({
  getInitialState() {
    return {
      restaurants: [],
      position: {
        start: 0,
        end: 4
      },
      modal: {
        open: false,
        restaurant: {}
      }
    }
  },

  setModal(restaurant) {
    const newModal = Object.assign({}, this.state.modal, { open: true, restaurant: restaurant });

    this.setState({ modal: newModal });
  },

  closeModal() {
    const newModal = Object.assign({}, this.state.modal, { open: false, restaurant: {} });

    this.setState({ modal: newModal });
  },

  searchRestaurants(location, term, displayNumber) {
    const search = { location, term, displayNumber };

    axios.get('/api/search', {params: search})
    .then((res) => {
      this.setState({ restaurants: res.data.restaurants })
      browserHistory.push('/results');
    })
    .catch((err) => {
      console.error(err);
    })
  },

  nextRestaurants() {
    let newStart = this.state.position.start;
    let newEnd = this.state.position.end;
    const resArr = this.state.restaurants;
    if (newEnd > resArr.length - 1) {
      newStart = 0;
      newEnd = 4;
    }
    else if (newEnd + 4 > resArr.length - 1) {
      newEnd = resArr.length;
      newStart += 4;
    }
    else {
      newStart += 4;
      newEnd += 4;
    }

    const newPostion = Object.assign({}, this.state.position, { start: newStart, end: newEnd });

    this.setState({ position: newPostion });
  },

  render() {
    const styleFlatButton = {
      height: '64px',
      lineHeight: '64px'
    };

    const styleTitle = {
      cursor: 'pointer'
    };

    const styleBottomNav = {
      backgroundColor: '#f2df8f',
      position: 'fixed',
      bottom: 0,
    };

    const styleAddBarr = {
      backgroundColor: '#f2df8f',
    };

    const styleBottonIcon = {
      marginLeft: '25px'
    };

    return <div>
      <AppBar
        className="appBarBun"
        style={styleAddBarr}
        titleStyle={styleTitle}
        showMenuIconButton={false}
      >
        {/* <FlatButton
          style={styleFlatButton}
          onTouchTap={this.handleTouchTap}
          label="btn"
        /> */}
      </AppBar>

      <Paper zDepth={2}>
        <BottomNavigation style={styleBottomNav} className="bottomNav">
          <BottomNavigationItem
            label="New User"
            icon={<PersonAdd style={styleBottonIcon}/>}
            onTouchTap={() => {browserHistory.push('/registration')}}
          />
          <BottomNavigationItem
            label="Login"
            icon={<Person style={styleBottonIcon}/>}
            onTouchTap={() => {browserHistory.push('/login')}}
          />
          <BottomNavigationItem
            label="About"
            icon={<Help style={styleBottonIcon}/>}
            onTouchTap={() => {browserHistory.push('/about')}}
          />
          <BottomNavigationItem
            label="Hungry!"
            icon={<LocalDining style={styleBottonIcon}/>}
            onTouchTap={() => {browserHistory.push('/search')}}
          />
        </BottomNavigation>
      </Paper>

      {React.cloneElement(this.props.children, {
        searchRestaurants: this.searchRestaurants,
        restaurants: this.state.restaurants,
        nextRestaurants: this.nextRestaurants,
        setModal: this.setModal,
        position: this.state.position
      })}
      <ResultModal
        modalData = {this.state.modal}
        closeModal = {this.closeModal}
      />
    </div>;
  }
});

export default withRouter(App);