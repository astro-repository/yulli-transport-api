
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';
import { FormattedMessage } from 'react-intl';
import s from './NotFound.css';
import messages from '../../locale/messages';
import noFound from '../../../public/static/Noresultfound.svg';
import cx from 'classnames';

class NotFound extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div className={s.root}>
        <div className={cx(s.container, s.textAlignCenter)}>
        <img src={noFound} className={s.imgWidth}/>
          <h1>{this.props.title}</h1>
          <p><FormattedMessage {...messages.notFound} /></p>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(NotFound);