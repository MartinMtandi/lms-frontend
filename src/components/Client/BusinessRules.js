import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import { connect } from "react-redux";
import * as actions from '../../store/actions';
import PropTypes from 'prop-types';
import PageLoader from '../common/PageLoader';
import ListBusinessRules from './ListBusinessRules';
import EditBusinessRules from './EditBusinessRules';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '500px',
      padding: theme.spacing(6, 6, 9, 6)
    },
}));

function BusinessRules(props) {
    const classes = useStyles();
    const [isEdit, setIsEdit] = React.useState(false);
    const {handleClose, id, getClientBusinessRules, clearUpdateBusinessRules} = props;
    const {business_rules, business_rules_loading} = props.clientBusinessRulesReducer;

    React.useEffect(() => {
        getClientBusinessRules(id);
    }, []);

    const handleDialogClose = () => {
        clearUpdateBusinessRules();
        handleClose();
    }

    let content = (!isEdit && business_rules) ? <ListBusinessRules business_rules={business_rules} isEdit={isEdit} /> : <EditBusinessRules business_rules={business_rules} />

  return (
    <div>
        {business_rules_loading ? 
        <div className={classes.root}>
            <PageLoader />
        </div> : (business_rules) &&
        <React.Fragment>
            <DialogContent>
                {content}
            </DialogContent>
            <DialogActions>
            {isEdit ?
            <Button variant="contained" color="secondary" onClick={() => setIsEdit(false)}>
                Back
            </Button>
            : <Button variant="contained" color="primary" onClick={() => setIsEdit(true)}>
                Edit
            </Button>}
            <Button onClick={handleDialogClose} color="primary">
                Close
            </Button>
            </DialogActions>
        </React.Fragment>}
    </div>
  )
}

BusinessRules.propTypes = {
    getClientBusinessRules: PropTypes.func.isRequired,
    clientBusinessRulesReducer: PropTypes.object.isRequired,
    clearUpdateBusinessRules: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    clientBusinessRulesReducer: state.clientBusinessRulesReducer
})

export default connect(mapStateToProps, actions)(BusinessRules);