import styled from '@emotion/styled'
import tw from 'tailwind.macro'

export const HeaderDiv = styled.div`
   ${tw`flex justify-between pl-3 items-center px-3 shadow-lg text-lg lg:text-2xl h-20`}
`

export const TitleDiv = styled.div`
   ${tw`ml-2`}
`

export const HeaderLeftSection = styled.div`
   ${tw`flex items-center bg-green focus:outline-none text-lg`}
`

export const LogoutButton = styled.button`
   ${tw`focus:outline-none`}
`
