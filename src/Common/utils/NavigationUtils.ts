import { LOGIN_PATH } from '../../Authentication/constants/Paths'
import { paths } from '../constants/Paths'

export const goToAdminDashboard = history => {
   history.replace(paths.dashboard)
}

export const goToUserDashboard = history => {
   history.replace(paths.userDashboard)
}

export const goToLoginForm = history => {
   history.replace(LOGIN_PATH)
}

export const goToSelectedForm = (history, formId) => {
   history.push(`/form/${formId}`)
}

export const goBack = history => {
   history.goBack()
}

export const goToSelectedFormResponse = (history, formId) => {
   history.push(`/form/${formId}/response`)
}
