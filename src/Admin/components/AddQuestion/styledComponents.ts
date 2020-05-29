import tw from 'tailwind.macro'
import styled from '@emotion/styled'

export const AddQuestionWrapper = styled.span`
   ${tw`flex mt-5 items-center focus:outline-none`}
`
export const AddQuestionButton = styled.button`
   ${tw`text-lg  bg-black mr-1 leading-relaxed text-white font-bold focus:outline-none rounded-full hover:shadow-md`}
   height: 32px;
   width: 32px;
`
export const AddLabel = styled.span`
   ${tw`cursor-pointer`}
`
