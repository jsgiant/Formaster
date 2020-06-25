import React from 'react'
import { observer } from 'mobx-react'

import {
   API_FETCHING,
   API_SUCCESS,
   API_FAILED,
   APIStatus
} from '@ib/api-constants'

import { getFormattedErrorDescription } from '../../utils/APIUtils'

import LoadingView from './LoadingView'
import FailureView from './FailureView'

type LoadingWrapperWithFailureProps = {
   apiStatus: APIStatus
   renderSuccessUI: any
   onRetryClick: () => void
   apiError: string | Error | null
}

@observer
class LoadingWrapperWithFailure extends React.Component<
   LoadingWrapperWithFailureProps
> {
   render() {
      const {
         apiStatus,
         renderSuccessUI: RenderSuccessUI,
         onRetryClick,
         apiError
      } = this.props
      const errorMessage = getFormattedErrorDescription(apiError)

      switch (apiStatus) {
         case API_FETCHING:
            return <LoadingView />
         case API_SUCCESS:
            return <RenderSuccessUI />
         case API_FAILED:
            return (
               <FailureView
                  onRetryClick={onRetryClick}
                  errorMessage={errorMessage}
               />
            )
         default:
            return null
      }
   }
}

export default LoadingWrapperWithFailure
