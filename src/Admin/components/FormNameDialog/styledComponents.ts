import tw from 'tailwind.macro'
import styled from '@emotion/styled'

type ButtonProps = {
   isDisabled: boolean
}

export const FormNamePopupWrapper = styled.div`
   ${tw`fixed w-full h-full inset-0 m-auto text-center`}background-color: rgba(
      0,
      0,
      0,
      0.5
   );
   z-index: 3000;
`
export const FormNamePopupContainer = styled.div`
   ${tw`absolute p-0 m-auto rounded bg-white sm:p-8 `}left: 35%;
   right: 35%;
   top: 25%;
   bottom: 45%;
`

export const Caption = styled.h1`
   ${tw`sm:text-xl font-semibold  leading-loose`}
`

export const NameInput = styled.input`
   ${tw`w-full mt-5 pl-3 h-12 rounded`}border: solid 1px #7e858e;
`
export const ContinueButton = styled.button`
   ${(props: ButtonProps) =>
      !props.isDisabled
         ? tw`items-center px-3 mt-5 h-10 rounded bg-gray-900 text-white focus:outline-none`
         : tw`items-center px-3 mt-5 h-10 rounded bg-gray-900 text-white opacity-50 focus:outline-none cursor-not-allowed`}
`

export const CancelButton = styled.button`
   ${tw`bg-red-500 items-center px-3 mt-5 h-10 rounded ml-5 text-white focus:outline-none`}
`
