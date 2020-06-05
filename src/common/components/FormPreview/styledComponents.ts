import tw from 'tailwind.macro'
import styled from '@emotion/styled'

type ButtonProps = {
   isDisabled: boolean
}

export const FormPreviewContainer = styled.div`
   ${tw`relative min-h-screen flex flex-wrap justify-center items-center w-full `}
`

export const FieldWrapper = styled.div`
   ${tw` flex justify-center items-center flex-wrap overflow-y-visible w-full p-5`}
`

export const Field = styled.div`
   ${tw`w-full`} animation: field-animate 0.2s ease-in;
   transition: all 0.2s ease-in;
   @keyframes field-animate {
      from {
         opacity: 0;
         transform: translateX(20px);
      }
      to {
         opacity: 1;
         transform: translateX(0px);
      }
   }
`
export const FieldTitle = styled.div`
   ${tw`items-center text-gray-700 flex max-h-screen`}max-width: 90%;
   font-weight: unset;
   font-size: 24px;
`
export const FieldDescription = styled.div`
   ${tw` text-lg mb-5 ml-6 px-2 overflow-x-hidden  text-gray-600 `}width: 90%;
   font-weight: unset;
`
export const EndCardDescription = styled.div`
   ${tw` text-lg mb-5 text-center overflow-x-hidden text-gray-600 `}width: 90%;
   font-weight: unset;
`
export const EndCardPreviewWrapper = styled.div`
   ${tw`flex flex-wrap justify-center`}
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
   ${tw` text-3xl  text-gray-700 mb-4 text-center`} width:100%;
   font-weight: unset;
`
export const FieldNumber = styled.span`
   ${tw`mr-2  text-teal-500 `}
`

export const FieldResponse = styled.input`
   ${tw`h-16 text-2xl ml-6 focus:outline-none mb-5 text-teal-400`} width:90%;
   line-height: unset;
   border-bottom: 1px solid #4fd1c5;
`

export const LongFieldResponse = styled.textarea`
   ${tw`h-16 text-2xl ml-6 focus:outline-none mt-2 mb-5 text-teal-400`} width:90%;
   line-height: unset;
   border-bottom: 1px solid #4fd1c5;
   focus: border-bottom: 3px solid #4fd1c5;
`
export const ButtonContainer = styled.div`
   ${tw` focus:outline-none`}
   animation: button-animate 0.2s ease-in;
   transition: all 0.2s ease-in;
   @keyframes button-animate {
      from {
         opacity: 0;
         transform: translateY(20px);
      }
      to {
         opacity: 1;
         transform: translateY(0px);
      }
   }
`

export const Btn = styled.button`
   ${tw`px-5 py-1 focus:outline-none bg-teal-400 text-white text-2xl rounded font-bold ml-4`}
`
export const PaginationContainer = styled.div`
   ${tw`flex w-full items-center justify-end mr-4 mb-5`}
`

export const PaginationButtons = styled.span`
   ${tw`w-20 bg-teal-400  flex justify-between text-white  rounded mt-4 `}
`

export const NavigationButton = styled.button`
   ${(props: ButtonProps) =>
      !props.isDisabled
         ? tw` rounded h-full px-3 py-2 cursor-pointer focus:outline-none`
         : tw` rounded h-full px-3 py-2 cursor-not-allowed opacity-50 focus:outline-none`}
   border-right:1px solid white;
`

export const ChoicesList = styled.form`
   ${tw`flex-col w-full justify-start ml-5`}
`

export const ChoiceContainer = styled.div`
   ${tw`text-lg p-3 flex items-center`}
`

export const ProgressBar = styled.div`
   ${tw`w-56 mr-5`}
`

export const ChoiceOption = styled.input``

export const ChoiceLabel = styled.label`
   ${tw`text-center mb-1 ml-2`}
`
