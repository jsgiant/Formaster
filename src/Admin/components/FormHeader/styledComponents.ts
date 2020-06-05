import tw from 'tailwind.macro'
import styled from '@emotion/styled'

type buttonProps = {
   isDisabled: boolean
}

export const HeaderContainer = styled.div`
   ${tw`flex justify-between w-full pl-2 sticky items-center px-2 shadow lg:text-lg h-16 `}
`

export const HeaderLeftSection = styled.div`
   ${tw`flex `}
`
export const GoBack = styled.button`
   ${tw`ml-2 focus:outline-none`}
`
export const FormTitle = styled.div`
   ${tw`ml-2`}
`

export const HeaderRightSection = styled.div`
   ${tw`flex items-center bg-green w-1/2 justify-between focus:outline-none text-lg`}
`

export const PublishButton = styled.button`
   ${(props: buttonProps) =>
      props.isDisabled
         ? tw`bg-black text-white opacity-50 cursor-not-allowed rounded py-1 px-2 focus:outline-none`
         : tw`bg-black text-white rounded py-1 px-2 focus:outline-none`}
`

export const LogoutButton = styled.button`
   ${tw`focus:outline-none border rounded border-black py-1 px-2`}
`
