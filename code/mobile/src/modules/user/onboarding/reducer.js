import { Record } from "immutable";
import {
  USER_ONBOARDING_STEP_DECIDED,
  USER_ONBOARDING_COMPLETED,
  USER_ONBOARDING_NETWORK_EMAIL_POSTED,
  USER_ONBOARDING_NETWORK_EMAIL_RESULTED,
  USER_ONBOARDING_MISSING_INFORMATION_POSTED,
  USER_ONBOARDING_MISSING_INFORMATION_RESULTED
} from "./actions";
import { SIGN_OUT_FULFILLED } from "../../../core/auth/actions";

const UserOnboardingState = new Record({
  network_email_missing: false,
  network_email_verified: false,
  birthday_missing: false,
  gender_missing: false,
  show: 'loading',
  step: null,
  in_progress: false,
  error: null,
});

export default function userOnboardingReducer(state = new UserOnboardingState(), {payload, type}) {
  switch (type) {
    case USER_ONBOARDING_STEP_DECIDED:
      return state.set('show', payload.show)
        .set('step', payload.step)
        .set('network_email_missing', payload.network_email_missing)
        .set('network_email_verified', payload.network_email_verified)
        .set('birthday_missing', payload.birthday_missing)
        .set('gender_missing', payload.gender_missing);
    case USER_ONBOARDING_NETWORK_EMAIL_POSTED:
    case USER_ONBOARDING_MISSING_INFORMATION_POSTED:
      return state.set('in_progress', true).set('error', null);
    case USER_ONBOARDING_NETWORK_EMAIL_RESULTED:
    case USER_ONBOARDING_MISSING_INFORMATION_RESULTED:
      return state.set('in_progress', !!payload.error).set('error', payload.error);
    case USER_ONBOARDING_COMPLETED:
      return state.set('in_progress', false).set('error', null);
    case SIGN_OUT_FULFILLED:
      return new UserOnboardingState();
    default:
      return state;
  }
}
