import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CreateFieldAgent from '../components/FieldAgents/CreateFieldAgent';
import DisplayFieldAgents from '../components/FieldAgents/DisplayFieldAgents';
import * as actions from '../store/actions';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

function FieldAgent(props) {
    const [open, setOpen] = React.useState(false);
    const [agentStore, SetAgentStore] = React.useState({});
    const {field_agent} = props.createFieldAgentReducer;
    const {get_field_agents} = props.getFieldAgentsReducer;
    const {update_field_agent} = props.updateFieldAgentReducer;

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleUpdateFieldAgent = (agent_id) => {
        setOpen(true);
        const agent = get_field_agents.agents.find(el => el.id === agent_id);
        SetAgentStore(agent);
    }

    return (
        <div>
             <Box display="flex" style={{marginBottom: '15px'}}>
                <Box flexGrow={1}>
                    <Button variant="contained" color="primary" onClick={handleClickOpen}>Add Field Agent</Button>
                </Box>
            </Box>
            <DisplayFieldAgents update_field_agent={update_field_agent} field_agent={field_agent} handleUpdateFieldAgent={handleUpdateFieldAgent} />
            <Dialog
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Add Field Agent</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <CreateFieldAgent SetAgentStore={SetAgentStore} agentStore={agentStore} setOpen={setOpen} createFieldAgentReducer={props.createFieldAgentReducer} />
                    </DialogContentText>
                </DialogContent>
            </Dialog>  
        </div>
    )
}

FieldAgent.propTypes = {
  createFieldAgentReducer: PropTypes.object.isRequired,
  getFieldAgentsReducer: PropTypes.object.isRequired,
  updateFieldAgentReducer: PropTypes.object.isRequired,
}


const mapStateToProps = (state) => ({
    createFieldAgentReducer: state.createFieldAgentReducer,
    getFieldAgentsReducer: state.getFieldAgentsReducer,
    updateFieldAgentReducer: state.updateFieldAgentReducer,
})


export default connect(mapStateToProps, actions)(FieldAgent);
