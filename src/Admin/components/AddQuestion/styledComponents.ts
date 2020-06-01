import tw from 'tailwind.macro'
import styled from '@emotion/styled'

export const AddQuestionWrapper = styled.span`
   ${tw`flex mt-5 cursor-pointer items-center focus:outline-none`}
`
export const AddQuestionButton = styled.span`
   ${tw`text-lg  bg-black mr-1 leading-relaxed text-white font-bold focus:outline-none rounded-full hover:shadow-md`}
   height: 32px;
   width: 32px;
`
export const AddLabel = styled.span`
   ${tw`cursor-pointer`}
`
