import tw from 'tailwind.macro'
import styled from '@emotion/styled'

export const FormPreviewContainer = styled.div`
   ${tw`relative min-h-screen flex flex-wrap justify-center items-center w-full `}
`

export const FieldWrapper = styled.div`
   ${tw`h-56 flex justify-center items-center flex-wrap overflow-y-visible w-full p-5`}
`

export const Field = styled.div`
   ${tw`w-full`} animation: field-animate 1s ease-in;
   transition: opacity 1s ease;
   @keyframes field-animate {
      from {
         opacity: 0;
      }
      to {
         opacity: 1;
      }
   }
`
export const FieldTitle = styled.div`
   ${tw`h-10 focus:outline-none items-center text-gray-700 flex`}width: 100%;
   font-weight: unset;
   font-size: 24px;
`
export const FieldDescription = styled.div`
   ${tw` focus:outline-none text-lg mb-auto ml-2 overflow-x-visible  text-gray-600 flex flex-wrap`}width: 90%;
   font-weight: unset;
`
export const EndCardPreviewWrapper = styled.div`
   animation: field-animate 1s ease-in;
   transition: opacity 1s ease;
   @keyframes field-animate {
      from {
         opacity: 0;
      }
      to {
         opacity: 1;
      }
   }
`
export const EndCardText = styled.div`
   ${tw` focus:outline-none text-3xl  text-gray-700 mb-4`}width: 100%;
   font-weight: unset;
`
export const FieldNumber = styled.span`
   ${tw`mr-3 text-lg text-teal-500`}
`

export const FieldResponse = styled.input`
   ${tw`h-16 text-2xl ml-4 focus:outline-none mb-5 text-teal-400`} width:90%;
   line-height: unset;
   border-bottom: 1px solid #4fd1c5;
   focus: border-bottom: 3px solid #4fd1c5;
`

export const LongFieldResponse = styled.textarea`
   ${tw`h-16 text-2xl ml-4 focus:outline-none mt-2 mb-5 text-teal-400`} width:90%;
   line-height: unset;
   border-bottom: 1px solid #4fd1c5;
   focus: border-bottom: 3px solid #4fd1c5;
`
export const ButtonContainer = styled.div`
   ${tw` focus:outline-none`}
`

export const Btn = styled.button`
   ${tw`px-5 py-1 focus:outline-none bg-teal-400 text-white text-2xl rounded font-bold ml-4`}
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
