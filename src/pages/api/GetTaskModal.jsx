import PropTypes from 'prop-types';
import { useState } from 'react';
import { withModalFade } from '../../HOCs/withModalFade';
import { Modal } from '../../components/Modal/Modal';
import { Input } from '../modals/form/ModalFields/Input/Input';
import { FormSubmit } from '../modals/form/formSubmit/FormSubmit';
import { BUTTON_COLORS } from '../../constants/libraries';

const GetTaskModal = ({ active, onClose, getTask, setFade }) => {
  const [taskId, setTaskId] = useState('');

  const onSubmit = () => {
    getTask(taskId);
    setFade();
  };

  const onInputChange = (name, value) => {
    setTaskId(value);
  };

  return (
    <Modal active={active} onClose={onClose}>
      <div>
        <Input value={taskId} title='Task Id' onChange={onInputChange} autoComplete='off' placeholder='Type task id' />
      </div>
      <FormSubmit
        onClose={onClose}
        onSubmit={onSubmit}
        submitButtonColor={BUTTON_COLORS.blue}
        submitButtonValue='Get task'
        backButtonValue='Go back'
      />
    </Modal>
  );
};

GetTaskModal.propTypes = {
  active: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  setFade: PropTypes.func.isRequired,
  getTask: PropTypes.func.isRequired,
};

export default withModalFade(GetTaskModal);
