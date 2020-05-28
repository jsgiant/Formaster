import tw from 'tailwind.macro'
import styled from '@emotion/styled'

export const FormCardContainer = styled.div`
   ${tw`text-black shadow cursor-pointer m-auto mt-6 text-lg h-64 bg-white w-56 sm:mt-0 sm:m-6 rounded`}
`

export const NameContainer = styled.div`
   ${tw`flex justify-center items-center h-48 w-full`}
`
export const FormName = styled.p``

export const FooterContainer = styled.div`
   ${tw`w-100 flex justify-between relative overflow-visible items-center px-2 h-16 border`}
`
export const ResponseButton = styled.button`
   ${tw`text-gray-500 text-center text-sm p-1`}
`
export const IconContainer = styled.span`
   ${tw`cursor-pointer`}
`
export const OptionsList = styled.div`
   ${tw`left-auto bg-white absolute w-24 inline-block text-base shadow`}
   z-index:1500;
   top: 20px;
   right: -60px;
`

export const OptionItem = styled.div`
   ${tw`p-2 cursor-pointer hover:bg-gray-200`}
`
export const DeleteOption = styled.div`
   ${tw`p-2 cursor-pointer text-red-600 hover:bg-gray-200`}
`
