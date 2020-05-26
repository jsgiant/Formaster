import tw from 'tailwind.macro'
import styled from '@emotion/styled'

export const CreateCard = styled.div`
   ${tw`text-white text-lg flex flex-wrap  items-center  h-64 bg-teal-400 w-56 rounded m-6`}
`
export const Title = styled.div`
   ${tw`font-semibold w-full text-center mt-auto`}
`
export const ButtonContainer = styled.div`
   ${tw`flex justify-center items-center w-full mb-auto`}
`

export const AddButton = styled.button`
   ${tw`text-2xl rounded-full py-1 px-3 font-bold  shadow-md`}
`
