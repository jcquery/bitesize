
import Divider from 'material-ui/Divider';
import ActionHome from 'material-ui/svg-icons/action/home';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import React from 'react';
import { withRouter } from 'react-router';




const Results = React.createClass({
  handleTouchTap() {
    this.props.nextRestaurants();
  },

  handleRowTouch(restaurant) {
    this.props.setModal(restaurant);
  },

  render() {

    const styles = {
      largeIcon: {
        width: 100,
        height: 100,
      },
      large: {
        width: 100,
        height: 100,
        padding: 0,
        paddingRight: 5,
      },
    };

    const { restaurants, position } = this.props;
    const restaurantsView = restaurants.slice(position.start, position.end);

    if (!restaurantsView.length) {
      restaurantsView.push(
        {
          name: 'Nothing Found.',
          rating: ':(',
          categoryList: ['Sorry!']
        }
      )
    };

    return <div>
      <img className="results" src="./images/results.jpg"></img>
      {restaurantsView.map((restaurant, index) => {
        const categories = restaurant.categoryList.join(', ');
        let burger;
        let burgerSize;
        let num;

        switch (index) {
          case 0:
            burger = './images/cheeseburger2.png';
            num = 1;
            break;
          case 1:
            burger = './images/cheeseburger3.png';
            num = 2;
            break;
          case 2:
            burger = './images/cheeseburger4.png';
            num = 3;
            break;
          case 3:
            burger = './images/cheeseburger5.png';
            num = 4;
            break;
          default:
        };

        return <div
          style={{marginBottom: '10px', marginTop: '10px', width: '375px'}}
          key={index}
          >
          <div className="flexContainer">
            <Paper circle={true} zDepth={2}>

              <IconButton
                iconStyle={styles.largeIcon}
                style={styles.large}
                onTouchTap={() => this.handleRowTouch(restaurant)}
              >
                <img src={burger} />
              </IconButton>
            </Paper>
            <div className="flexItems">
              <p style={{marginBottom: '5px', marginTop: '0px', fontSize: '20px', fontWeight: 'bold'}}>#{num} {restaurant.name}</p>
              <p style={{marginBottom: '5px', marginTop: '0px', fontSize: '15px'}}>{restaurant.categoryList}</p>
              <p style={{marginBottom: '0px', marginTop: '0px', fontStyle: 'italic', fontSize: '13px'}}>{restaurant.snippetText}</p>
            </div>
          </div>
          <Divider />
        </div>
        })}
    </div>;
  }
});

export default withRouter(Results);
