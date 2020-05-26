import tw from 'tailwind.macro'
import styled from '@emotion/styled'

export const FormCardContainer = styled.div`
   ${tw`text-black shadow text-lg h-64 bg-white w-56 m-6 rounded`}
`

export const NameContainer = styled.div`
   ${tw`flex justify-center items-center h-56 w-full`}
`
export const FormName = styled.p``

export const FooterContainer = styled.div`
   ${tw`w-100 flex justify-between items-center px-2 h-8 border`}
`
export const ResponseButton = styled.button`
   ${tw`text-gray-500 text-center text-sm p-1`}
`
