import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styles from './MemberInfoRow.module.css';
import { Button } from '../../../components/Buttons/Button/Button';
import { BUTTON_COLORS, BUTTON_VALUES } from '../../../constants/libraries';
import { getFullName } from '../../../scripts/helpers';

export function MemberInfoRow({
  id,
  number,
  name,
  surname,
  direction,
  education,
  startDate,
  age,
  openDeleteModal,
  openEditModal,
  openReadModal,
}) {
  return (
    <tr>
      <td>{number}</td>
      <td>
        <button type='button' className={styles.userName} onClick={openReadModal}>
          {getFullName(name, surname)}
        </button>
      </td>
      <td>{direction}</td>
      <td>{education}</td>
      <td>{startDate}</td>
      <td>{age}</td>
      <td>
        <div className={styles.buttonGroup}>
          <NavLink to={`/tasks/${id}`}>
            <Button color={BUTTON_COLORS.blue}>{BUTTON_VALUES.tasks}</Button>
          </NavLink>
          <NavLink to={`/progress/${id}`}>
            <Button color={BUTTON_COLORS.blue}>{BUTTON_VALUES.progress}</Button>
          </NavLink>
          <Button color={BUTTON_COLORS.orange} onClick={openEditModal}>
            {BUTTON_VALUES.edit}
          </Button>
          <Button color={BUTTON_COLORS.red} onClick={openDeleteModal}>
            {BUTTON_VALUES.delete}
          </Button>
        </div>
      </td>
    </tr>
  );
}

MemberInfoRow.propTypes = {
  number: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
  direction: PropTypes.string.isRequired,
  education: PropTypes.string,
  startDate: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  openDeleteModal: PropTypes.func.isRequired,
  openEditModal: PropTypes.func.isRequired,
  openReadModal: PropTypes.func.isRequired,
};
MemberInfoRow.defaultProps = {
  education: 'None',
};
