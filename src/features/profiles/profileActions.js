import { LISTEN_TO_CURRENT_USER_PROFILE } from "./profileContants";

export function listenToCurrentUserProfile(profile){
	return {
		type:LISTEN_TO_CURRENT_USER_PROFILE,
		payload:profile
	}
}