import tw from 'tailwind.macro'
import styled from '@emotion/styled'

export const HeaderContainer = styled.div`
   ${tw`flex justify-between pl-2 items-center px-2 shadow lg:text-lg h-16`}
`

export const HeaderLeftSection = styled.div`
   ${tw`flex `}
`
export const GoBack = styled.button`
   ${tw`focus:outline-none`}
`
export const FormTitle = styled.div`
   ${tw`ml-2`}
`

export const HeaderRightSection = styled.div`
   ${tw`flex items-center bg-green focus:outline-none text-lg`}
`

export const LogoutButton = styled.button`
   ${tw`focus:outline-none border rounded border-black py-1 px-2`}
`
