import styled from '@emotion/styled'
import tw from 'tailwind.macro'

export const LoginContainer = styled.div`
   width: 100%;
   height: 100vh;
   font-family: sans-serif;
   display: flex;
   justify-content: center;
   align-items: center;
   background-color: #f1f7ff;
`

export const LoginFormWrapper = styled.div`
   ${tw`flex flex-col items-center justify-center flex-wrap bg-white`}
   width: 500px;
   height: 600px;
   border-radius: 8px;
   background-color: white;
`

export const Logo = styled.img`
   width: 90px;
   height: 90px;
   object-fit: contain;
`

export const Heading = styled.p`
   height: 80px;
   font-size: 32px;
   font-weight: normal;
   font-stretch: normal;
   font-style: normal;
   line-height: 1.25;
   letter-spacing: normal;
   color: #171f46;
`

export const Label = styled.label`
   align-self: start;
   margin-top: 12px;
   margin-bottom: 10px;
   margin-left: 92px;
   height: 16px;
   font-size: 12px;
   font-weight: 600;
   font-stretch: normal;
   font-style: normal;
   line-height: 1.33;
   letter-spacing: 0.12px;
   color: #7e858e;
`

export const UserInput = styled.input`
   width: 320px;
   height: 40px;
   font-size: 14px;
   font-weight: normal;
   font-stretch: normal;
   font-style: normal;
   line-height: 1.71;
   letter-spacing: normal;
   margin-left: 0px;
   padding-left: 10px;
   margin-bottom: 12px;
   border-radius: 2px;
   border: solid 1px #7e858e;
   background-color: white;
`

export const LoginButton = styled.button`
   ${tw`text-white focus:outline-none`}
   width: 320px;
   height: 40px;
   border-radius: 4px;
   margin-top: 20px;
   margin-bottom: 20px;
   background-color: #0b69ff;
`
export const ValidationError = styled.span`
   ${tw`text-center text-sm`}align-self: start;
   margin-left: 92px;
   color: #ff0b37;
`
