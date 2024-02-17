import { UnauthenticatedError } from '../errors/index.js';

const checkPermissions = (user, createdBy) => {
  // if(user.role === 'admin') return

  if (user.userId === createdBy.toString()) {
    return;
  }
  throw new UnauthenticatedError('you are not authorised to edit this job');
};

export default checkPermissions;
