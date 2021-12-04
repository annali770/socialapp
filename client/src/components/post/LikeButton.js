import React, { Component } from 'react';
import MyButton from '../../util/MyButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// Icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
// REdux
import { connect } from 'react-redux';
import { likePost } from '../../redux/actions/dataActions';

export class LikeButton extends Component {
  likedPost = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        (like) => like.postId === this.props.postId
      )
    )
      return true;
    else return false;
  };
  likePost = () => {
    this.props.likePost(this.props.postId);
  };
  render() {
    const { authenticated } = this.props.user;
    const likeButton = !authenticated ? (
      <Link to="/login">
        <MyButton tip="Like">
          <FavoriteBorder color="primary" />
        </MyButton>
      </Link>
    ) : (
      <MyButton tip="Like" onClick={this.likePost}>
        <FavoriteBorder color="primary" />
      </MyButton>
    );
    return likeButton;
  }
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  likePost: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user
});

const mapActionsToProps = {
  likePost
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(LikeButton);