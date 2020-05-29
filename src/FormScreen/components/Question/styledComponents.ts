import tw from 'tailwind.macro'
import styled from '@emotion/styled'

export const QuestionWrapper = styled.div`
   ${tw` p-3 border hover:shadow-md w-full`};
`

export const Required = styled.span`
   ${tw`text-sm text-red-600`}
`
export const QuestionNumber = styled.span`
   ${tw`mr-3`}
`
export const QuestionTextInput = styled.input`
   ${tw`h-10 focus:outline-none`}width: 90%
`
export const DescriptionText = styled.input`
   ${tw`h-12 focus:outline-none ml-5`} width:90%
`
export const IconContainer = styled.span`
   ${tw`cursor-pointer rounded hover:bg-gray-200 p-2`}
`

export const Toolbar = styled.div`
   ${tw`w-full flex justify-end`}
`
