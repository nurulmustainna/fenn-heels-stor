function isValidTransition(currentStatus, targetStatus) {
  const allowedTransitions = {
    DRAFT: ['CONFIRMED', 'CANCELLED'],
    CONFIRMED: ['PROCESSING', 'COMPLETED', 'CANCELLED'],
    PROCESSING: ['COMPLETED', 'CANCELLED'],
    COMPLETED: [],
    CANCELLED: []
  };

  const validNextStatuses = allowedTransitions[currentStatus] || [];
  return validNextStatuses.includes(targetStatus);
}

module.exports = isValidTransition;