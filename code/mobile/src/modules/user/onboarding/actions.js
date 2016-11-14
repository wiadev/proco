export const USER_ONBOARDING_RESULTED = 'Proco/User/Onboarding/Resulted';
export const USER_ONBOARDING_COMPLETED = 'Proco/User/Onboarding/Completed';
export const USER_ONBOARDING_STARTED = 'Proco/User/Onboarding/Started';
export const USER_ONBOARDING_STEP_DECIDED = 'Proco/User/Onboarding/StepDecided';
export const USER_ONBOARDING_RESET_ERROR = 'Proco/User/Onboarding/ResetError';
export const USER_ONBOARDING_NETWORK_EMAIL_POSTED = 'Proco/User/Onboarding/NetworkEmail/Posted';
export const USER_ONBOARDING_NETWORK_EMAIL_RESULTED = 'Proco/User/Onboarding/NetworkEmail/Resulted';
export const USER_ONBOARDING_MISSING_INFORMATION_POSTED = 'Proco/User/Onboarding/MissingInformation/Posted';
export const USER_ONBOARDING_MISSING_INFORMATION_RESULTED = 'Proco/User/Onboarding/MissingInformation/Resulted';

export const userOnboardingDecideStep = data => {
  const {
    network_email_missing,
    network_email_verified,
    birthday_missing,
    gender_missing,
    error,
  } = data;

  let payload = {
    show: 'loading',
    step: null,
  };

  if (network_email_missing || !network_email_verified) {
    payload.show = 'network_verification';
    payload.step = network_email_missing ? 'form' : 'result';
  } else if (birthday_missing || gender_missing) {
    payload.show = 'missing_information';
    payload.step = 'form';
  }

  if (error) payload.step = 'error';

  return {
    type: USER_ONBOARDING_STEP_DECIDED,
    payload: {
      ...payload,
      ...data,
    },
  };
};

export const userOnboardingPostNetworkEmail = network_email => ({
  type: USER_ONBOARDING_NETWORK_EMAIL_POSTED,
  payload: {
    network_email,
  },
});

export const userOnboardingNetworkEmailResulted = (error = false) => ({
  type: USER_ONBOARDING_NETWORK_EMAIL_RESULTED,
  payload: {
    error,
  },
});

export const userOnboardingPostMissingInformation = info => ({
  type: USER_ONBOARDING_MISSING_INFORMATION_POSTED,
  payload: {
    ...info
  },
});

export const userOnboardingMissingInformationResulted = (error = false) => ({
  type: USER_ONBOARDING_MISSING_INFORMATION_RESULTED,
  payload: {
    error,
  },
});

export const userOnboardingCompleted = () => ({
  type: USER_ONBOARDING_COMPLETED,
});

export const userOnboardingResulted = (is_success, error) => ({
  type: USER_ONBOARDING_RESULTED,
});

export const userOnboardingStarted = () => ({
  type: USER_ONBOARDING_STARTED,
});

export const userOnboardingResetError = () => ({
  type: USER_ONBOARDING_RESET_ERROR,
});
