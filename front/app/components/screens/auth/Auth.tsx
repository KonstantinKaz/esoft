import Button from '@/components/ui/button/Button'
import DismissKeyboard from '@/components/ui/form/field/DismissKeyboard'
import Loader from '@/components/ui/Loader'
import { IAuthFormData } from '@/shared/types/auth.interface'
import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Pressable, Text, View } from 'react-native'
import AuthFields from './AuthFields'
import { useAuthMutations } from './useAuthMutations'

const Auth: FC = () => {
	const [isReg, setIsReg] = useState(false)

	const { handleSubmit, reset, control } = useForm<IAuthFormData>({
		mode: 'onChange'
	})

	const { loginSync, registerSync, isLoading } = useAuthMutations(reset)

	const onSubmit: SubmitHandler<IAuthFormData> = data => {
		if (isReg) registerSync(data)
		else loginSync(data)
	}

	return (
		<DismissKeyboard>
			<View className='mx-2 items-center justify-center h-full'>
				<View className='w-9/12'>
					<Text className='text-center text-white text-4xl font-bold mb-2.5'>
						{isReg ? 'Register' : 'Login'}
					</Text>
					{isLoading ? (
						<Loader />
					) : (
						<>
							<AuthFields control={control} isPassRequired />
							<Button onPress={handleSubmit(onSubmit)} icon={'home'}>
								Go to Watch
							</Button>
							<Pressable onPress={() => setIsReg(!isReg)}>
								<Text className='text-white opacity-30 text-right text-base mt-3'>
									{isReg ? 'Login' : 'Register'}
								</Text>
							</Pressable>
						</>
					)}
				</View>
			</View>
		</DismissKeyboard>
	)
}

export default Auth
