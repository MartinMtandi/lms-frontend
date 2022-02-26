import React, { useRef } from 'react'
import { connect } from 'react-redux'
import * as actions from '../store/actions'
import PropTypes from 'prop-types'
import { useHistory } from "react-router-dom"
import IdleTimer from 'react-idle-timer'

function IdleTimerCounter(props) {
    const history = useHistory();
    const {logout} = props;
    const idleTimerRef = useRef(null);
    
    const onIdle = () => {
        logout();
        history.push('/');
      }
    return (
        <div>
             <IdleTimer ref={idleTimerRef} timeout={15 * 60 * 1000} onIdle={onIdle}></IdleTimer>
        </div>
    )
}

IdleTimerCounter.propTypes = {
    logout: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, actions)(IdleTimerCounter)
