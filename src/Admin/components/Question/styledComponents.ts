import tw from 'tailwind.macro'
import styled from '@emotion/styled'

export const QuestionWrapper = styled.div`
   ${tw` p-3 flex flex-wrap items-center border hover:shadow-md w-full`};
`

export const Required = styled.span`
   ${tw`text-sm text-red-600`}
`
export const QuestionTextInput = styled.input`
   ${tw`h-10 focus:outline-none `}width: 80%
`
export const DescriptionText = styled.input`
   ${tw`h-12 focus:outline-none ml-12`} width:80%
`
export const IconContainer = styled.span`
   ${tw`cursor-pointer rounded hover:bg-gray-200 p-2`}
`
export const WelcomeIcon = styled.span`
   ${tw`bg-green-300 h-6 text-lg text-white p-1 mt-1 w-10 rounded mr-2`}
`

export const ThankyouIcon = styled.span`
   ${tw`bg-teal-300 h-6 text-lg text-white p-1 mt-1 w-10 rounded mr-2`}
`
export const ShortTextIcon = styled.span`
   ${tw`bg-yellow-500 h-6 text-lg text-white p-1 mt-1 w-10 rounded mr-2`}
`
export const LargeTextIcon = styled.span`
   ${tw`bg-red-500 h-6 text-lg text-white p-1 mt-1 w-10 rounded mr-2`}
`
export const McqIcon = styled.span`
   ${tw`bg-blue-400 h-6 text-lg text-white p-1 mt-1 w-10 rounded mr-2`}
`
export const ChoiceContainer = styled.div`
   width: 80%;
   ${tw`ml-12 text-center flex items-center `}
`
export const Choice = styled.input`
   ${tw`h-12 w-full ml-1 focus:outline-none`}
`
export const Toolbar = styled.div`
   ${tw`w-full flex justify-end items-center`}
`
export const RequiredToggler = styled.input`
   ${tw`mr-2`}
`
