import tw from 'tailwind.macro'
import styled from '@emotion/styled'

export const FormPreviewContainer = styled.div`
   ${tw`relative min-h-screen flex flex-wrap justify-center items-center w-full `}
`

export const FieldWrapper = styled.div`
   ${tw`min-h-56 flex justify-center items-center flex-wrap shadow w-full p-5`}
`
export const FieldTitle = styled.div`
   ${tw`h-10 focus:outline-none text-gray-700 flex`}width: 100%;
   font-weight: unset;
   font-size: 24px;
   line-height: 32px;
`
export const FieldDescription = styled.div`
   ${tw`h-10 focus:outline-none text-lg ml-2 text-gray-500 flex`}width: 90%;
   font-weight: unset;
   line-height: 32px;
`
export const ScreenText = styled.div`
   ${tw`h-10 focus:outline-none text-3xl text-gray-700 justify-center items-center flex`}width: 100%;
   font-weight: unset;

   line-height: 32px;
`
export const FieldNumber = styled.span`
   ${tw`mr-3 text-lg text-teal-400`}
`

export const FieldResponse = styled.input`
   ${tw`h-16 text-2xl ml-2 focus:outline-none mb-5 text-teal-400`} width:90%;
   line-height: unset;
   border-bottom: 1px solid #4fd1c5;
   focus: border-bottom: 3px solid #4fd1c5;
`

export const LongFieldResponse = styled.textarea`
   ${tw`h-16 text-2xl ml-8 focus:outline-none mt-2 mb-5 text-teal-400`} width:90%;
   line-height: unset;
   border-bottom: 1px solid #4fd1c5;
   focus: border-bottom: 3px solid #4fd1c5;
`
export const PaginationContainer = styled.div`
   ${tw`flex w-full justify-end`}
`

export const PaginationButtons = styled.span`
   ${tw`w-20 bg-teal-400  flex justify-between text-white  rounded mt-4 `}
`

export const NavigationButton = styled.span`
   ${tw` rounded h-full px-3 py-2 cursor-pointer`}
   border-right:1px solid white;
`

export const ChoicesList = styled.form`
   ${tw`flex-col w-full justify-start ml-5`}
`

export const ChoiceContainer = styled.div`
   ${tw`text-lg p-3 flex items-center`}
`

export const ChoiceOption = styled.input``

export const ChoiceLabel = styled.label`
   ${tw`text-center mb-1 ml-2`}
`
